import { vfsCore } from './core';
import { resolvePath, getAbsolutePath } from './pathResolver';

export class VFSCommands {
  cwdId: string = 'root';

  async init() {
    await vfsCore.init();
    // Try to set cwd to /home/user
    const homeUser = await resolvePath('/home/user', 'root');
    if (homeUser && homeUser.type === 'directory') {
      this.cwdId = homeUser.id;
    }
  }

  async pwd(): Promise<string> {
    return await getAbsolutePath(this.cwdId);
  }

  async ls(path: string = '.'): Promise<string[]> {
    const target = await resolvePath(path, this.cwdId);
    if (!target) throw new Error('No such file or directory');
    if (target.type === 'file') return [target.name];
    
    const children = await vfsCore.getChildren(target.id);
    return children.map(c => c.name).sort();
  }

  async cd(path: string): Promise<void> {
    const target = await resolvePath(path, this.cwdId);
    if (!target) throw new Error('No such file or directory');
    if (target.type !== 'directory') throw new Error('Not a directory');
    this.cwdId = target.id;
  }

  async mkdir(path: string): Promise<void> {
    const parts = path.split('/');
    const name = parts.pop()!;
    const parentPath = parts.join('/') || (path.startsWith('/') ? '/' : '.');
    
    const parent = await resolvePath(parentPath, this.cwdId);
    if (!parent || parent.type !== 'directory') throw new Error('No such file or directory');
    
    const existing = await vfsCore.getChildByName(parent.id, name);
    if (existing) throw new Error('File exists');
    
    await vfsCore.createNode({
      name,
      type: 'directory',
      parentId: parent.id,
    });
  }

  async touch(path: string): Promise<void> {
    const parts = path.split('/');
    const name = parts.pop()!;
    const parentPath = parts.join('/') || (path.startsWith('/') ? '/' : '.');
    
    const parent = await resolvePath(parentPath, this.cwdId);
    if (!parent || parent.type !== 'directory') throw new Error('No such file or directory');
    
    const existing = await vfsCore.getChildByName(parent.id, name);
    if (!existing) {
      await vfsCore.createNode({
        name,
        type: 'file',
        parentId: parent.id,
        content: '',
      });
    }
  }

  async rm(path: string): Promise<void> {
    const target = await resolvePath(path, this.cwdId);
    if (!target) throw new Error('No such file or directory');
    if (target.id === 'root') throw new Error('Cannot remove root');
    
    await vfsCore.deleteNode(target.id);
  }

  async cat(path: string): Promise<string> {
    const target = await resolvePath(path, this.cwdId);
    if (!target) throw new Error('No such file or directory');
    if (target.type !== 'file') throw new Error('Is a directory');
    
    return target.content || '';
  }

  async cp(srcPath: string, destPath: string): Promise<void> {
    const srcNode = await resolvePath(srcPath, this.cwdId);
    if (!srcNode) throw new Error(`cp: cannot stat '${srcPath}': No such file or directory`);
    
    if (srcNode.type === 'directory') throw new Error(`cp: -r not specified; omitting directory '${srcPath}'`);

    const destParts = destPath.split('/');
    const destName = destParts.pop()!;
    const destParentPath = destParts.join('/') || (destPath.startsWith('/') ? '/' : '.');
    
    let destParent = await resolvePath(destParentPath, this.cwdId);
    if (!destParent) throw new Error(`cp: cannot create regular file '${destPath}': No such file or directory`);
    
    let finalDestParentId = destParent.id;
    let finalDestName = destName;

    const existingDest = await resolvePath(destPath, this.cwdId);
    if (existingDest && existingDest.type === 'directory') {
      finalDestParentId = existingDest.id;
      finalDestName = srcNode.name;
    }

    const existingFile = await vfsCore.getChildByName(finalDestParentId, finalDestName);
    if (existingFile) {
      if (existingFile.type === 'directory') throw new Error(`cp: cannot overwrite directory '${finalDestName}' with non-directory`);
      await vfsCore.updateNode(existingFile.id, { content: srcNode.content });
    } else {
      await vfsCore.createNode({
        name: finalDestName,
        type: 'file',
        parentId: finalDestParentId,
        content: srcNode.content,
      });
    }
  }

  async mv(srcPath: string, destPath: string): Promise<void> {
    const srcNode = await resolvePath(srcPath, this.cwdId);
    if (!srcNode) throw new Error(`mv: cannot stat '${srcPath}': No such file or directory`);
    if (srcNode.id === 'root') throw new Error(`mv: cannot move root`);

    const destParts = destPath.split('/');
    const destName = destParts.pop()!;
    const destParentPath = destParts.join('/') || (destPath.startsWith('/') ? '/' : '.');
    
    let destParent = await resolvePath(destParentPath, this.cwdId);
    if (!destParent) throw new Error(`mv: cannot move to '${destPath}': No such file or directory`);

    let finalDestParentId = destParent.id;
    let finalDestName = destName;

    const existingDest = await resolvePath(destPath, this.cwdId);
    if (existingDest && existingDest.type === 'directory') {
      finalDestParentId = existingDest.id;
      finalDestName = srcNode.name;
    }

    const existingFile = await vfsCore.getChildByName(finalDestParentId, finalDestName);
    if (existingFile) {
      if (existingFile.id === srcNode.id) return;
      if (existingFile.type === 'directory' && srcNode.type !== 'directory') throw new Error(`mv: cannot overwrite directory '${finalDestName}' with non-directory`);
      if (existingFile.type !== 'directory' && srcNode.type === 'directory') throw new Error(`mv: cannot overwrite non-directory '${finalDestName}' with directory`);
      
      await vfsCore.deleteNode(existingFile.id);
    }

    await vfsCore.updateNode(srcNode.id, { name: finalDestName, parentId: finalDestParentId });
  }

  async writeFile(path: string, content: string): Promise<void> {
    const parts = path.split('/');
    const name = parts.pop()!;
    const parentPath = parts.join('/') || (path.startsWith('/') ? '/' : '.');
    
    const parent = await resolvePath(parentPath, this.cwdId);
    if (!parent || parent.type !== 'directory') throw new Error('No such file or directory');
    
    const existing = await vfsCore.getChildByName(parent.id, name);
    if (existing) {
      if (existing.type !== 'file') throw new Error('Is a directory');
      await vfsCore.updateNode(existing.id, { content });
    } else {
      await vfsCore.createNode({
        name,
        type: 'file',
        parentId: parent.id,
        content,
      });
    }
  }

  async appendFile(path: string, content: string): Promise<void> {
    const parts = path.split('/');
    const name = parts.pop()!;
    const parentPath = parts.join('/') || (path.startsWith('/') ? '/' : '.');
    
    const parent = await resolvePath(parentPath, this.cwdId);
    if (!parent || parent.type !== 'directory') throw new Error('No such file or directory');
    
    const existing = await vfsCore.getChildByName(parent.id, name);
    if (existing) {
      if (existing.type !== 'file') throw new Error('Is a directory');
      await vfsCore.updateNode(existing.id, { content: (existing.content || '') + content });
    } else {
      await vfsCore.createNode({
        name,
        type: 'file',
        parentId: parent.id,
        content,
      });
    }
  }
}
