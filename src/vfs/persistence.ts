import Dexie, { Table } from 'dexie';
import { VFSNode } from './types';

export class VFSDatabase extends Dexie {
  nodes!: Table<VFSNode, string>;

  constructor() {
    super('cli-vfs-db');
    this.version(1).stores({
      nodes: 'id, parentId, [parentId+name], type',
    });
  }
}

export const db = new VFSDatabase();

export async function initRoot(): Promise<void> {
  const root = await db.nodes.get('root');
  if (!root) {
    await db.nodes.add({
      id: 'root',
      name: '/',
      type: 'directory',
      parentId: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Create home/user directory for default workspace
    const homeId = crypto.randomUUID();
    await db.nodes.add({
      id: homeId,
      name: 'home',
      type: 'directory',
      parentId: 'root',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    const userId = crypto.randomUUID();
    await db.nodes.add({
      id: userId,
      name: 'user',
      type: 'directory',
      parentId: homeId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await db.nodes.add({
      id: crypto.randomUUID(),
      name: 'readme.txt',
      type: 'file',
      parentId: userId,
      content: 'Welcome to the CLI Learning App!\nThis file system is persisted in your browser using IndexedDB.',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
}
