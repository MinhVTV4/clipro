import { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 'basics-1',
    title: '1. Điều hướng & Khám phá',
    description: 'Làm quen với không gian làm việc của bạn bằng các lệnh cơ bản nhất.',
    tasks: [
      {
        id: 'pwd-1',
        description: 'Xem thư mục hiện tại của bạn',
        commandHint: 'pwd',
        verify: async (vfs, cmd) => cmd.trim() === 'pwd'
      },
      {
        id: 'ls-1',
        description: 'Liệt kê các tệp tin trong thư mục',
        commandHint: 'ls',
        verify: async (vfs, cmd) => cmd.trim().startsWith('ls')
      },
      {
        id: 'cd-1',
        description: 'Di chuyển về thư mục gốc',
        commandHint: 'cd /',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd === '/';
        }
      }
    ]
  },
  {
    id: 'files-1',
    title: '2. Quản lý Tệp & Thư mục',
    description: 'Tạo và tổ chức không gian làm việc của bạn.',
    tasks: [
      {
        id: 'mkdir-1',
        description: 'Tạo thư mục tên là "workspace"',
        commandHint: 'mkdir workspace',
        verify: async (vfs, cmd) => {
          try {
            const pwd = await vfs.pwd();
            const items = await vfs.ls(pwd);
            return items.includes('workspace');
          } catch { return false; }
        }
      },
      {
        id: 'cd-2',
        description: 'Đi vào thư mục "workspace"',
        commandHint: 'cd workspace',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd.endsWith('/workspace');
        }
      },
      {
        id: 'touch-1',
        description: 'Tạo một tệp tin trống tên "notes.txt"',
        commandHint: 'touch notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const pwd = await vfs.pwd();
            const items = await vfs.ls(pwd);
            return items.includes('notes.txt');
          } catch { return false; }
        }
      }
    ]
  },
  {
    id: 'files-2',
    title: '3. Thao tác Dữ liệu',
    description: 'Ghi và đọc dữ liệu từ tệp tin.',
    tasks: [
      {
        id: 'echo-1',
        description: 'Ghi chữ "Hello" vào tệp notes.txt',
        commandHint: 'echo "Hello" > notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('notes.txt');
            return content.includes('Hello');
          } catch { return false; }
        }
      },
      {
        id: 'cat-1',
        description: 'Đọc nội dung tệp notes.txt',
        commandHint: 'cat notes.txt',
        verify: async (vfs, cmd) => cmd.trim().startsWith('cat notes.txt')
      },
      {
        id: 'rm-1',
        description: 'Xóa tệp notes.txt',
        commandHint: 'rm notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const pwd = await vfs.pwd();
            const items = await vfs.ls(pwd);
            return !items.includes('notes.txt');
          } catch { return false; }
        }
      }
    ]
  }
];
