export type VFSNodeType = 'file' | 'directory';

export interface VFSNode {
  id: string;
  name: string;
  type: VFSNodeType;
  parentId: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
}
