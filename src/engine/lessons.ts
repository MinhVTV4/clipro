import { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 'basic-training',
    title: 'Khóa Huấn Luyện Cơ Bản',
    description: 'Bài tập tổng hợp giúp bạn làm quen với các thao tác cốt lõi nhất trong môi trường dòng lệnh (CLI). Hoàn thành tuần tự các bước dưới đây.',
    tasks: [
      {
        id: 'pwd-1',
        description: 'Kiểm tra vị trí hiện tại của bạn trong hệ thống tệp.',
        commandHint: 'pwd',
        verify: async (vfs, cmd) => cmd.trim() === 'pwd'
      },
      {
        id: 'ls-1',
        description: 'Liệt kê các tệp và thư mục đang có xung quanh bạn.',
        commandHint: 'ls',
        verify: async (vfs, cmd) => cmd.trim().startsWith('ls')
      },
      {
        id: 'mkdir-1',
        description: 'Tạo một thư mục mới có tên là "workspace" để làm việc.',
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
        id: 'cd-1',
        description: 'Di chuyển vào thư mục "workspace" vừa tạo.',
        commandHint: 'cd workspace',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd.endsWith('/workspace');
        }
      },
      {
        id: 'touch-1',
        description: 'Tạo một tệp tin văn bản trống có tên "notes.txt".',
        commandHint: 'touch notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const pwd = await vfs.pwd();
            const items = await vfs.ls(pwd);
            return items.includes('notes.txt');
          } catch { return false; }
        }
      },
      {
        id: 'echo-1',
        description: 'Ghi dòng chữ "Hello CLI" vào tệp notes.txt.',
        commandHint: 'echo "Hello CLI" > notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('notes.txt');
            return content.includes('Hello CLI');
          } catch { return false; }
        }
      },
      {
        id: 'cat-1',
        description: 'Đọc và in nội dung của tệp notes.txt ra màn hình để kiểm tra.',
        commandHint: 'cat notes.txt',
        verify: async (vfs, cmd) => cmd.trim().startsWith('cat notes.txt')
      },
      {
        id: 'rm-1',
        description: 'Dọn dẹp không gian làm việc bằng cách xóa tệp notes.txt.',
        commandHint: 'rm notes.txt',
        verify: async (vfs, cmd) => {
          try {
            const pwd = await vfs.pwd();
            const items = await vfs.ls(pwd);
            return !items.includes('notes.txt');
          } catch { return false; }
        }
      },
      {
        id: 'cd-2',
        description: 'Quay trở lại thư mục gốc (root) để hoàn thành bài tập.',
        commandHint: 'cd /',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd === '/';
        }
      }
    ]
  },
  {
    id: 'intermediate-training',
    title: 'Thao Tác Trung Bình',
    description: 'Học cách sao chép (cp), di chuyển/đổi tên (mv) và nối thêm dữ liệu (>>) vào tệp tin.',
    tasks: [
      {
        id: 'cd-home',
        description: 'Đảm bảo bạn đang ở thư mục /home/user.',
        commandHint: 'cd /home/user',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd === '/home/user';
        }
      },
      {
        id: 'echo-config',
        description: 'Tạo tệp config.txt chứa nội dung "PORT=8080".',
        commandHint: 'echo "PORT=8080" > config.txt',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('config.txt');
            return content.includes('PORT=8080');
          } catch { return false; }
        }
      },
      {
        id: 'cp-config',
        description: 'Sao chép tệp config.txt thành config.backup.',
        commandHint: 'cp config.txt config.backup',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('config.backup');
            return content.includes('PORT=8080');
          } catch { return false; }
        }
      },
      {
        id: 'mv-config',
        description: 'Đổi tên tệp config.backup thành backup.txt.',
        commandHint: 'mv config.backup backup.txt',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return items.includes('backup.txt') && !items.includes('config.backup');
          } catch { return false; }
        }
      },
      {
        id: 'append-config',
        description: 'Nối thêm dòng "ENV=production" vào cuối tệp config.txt.',
        commandHint: 'echo "ENV=production" >> config.txt',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('config.txt');
            return content.includes('PORT=8080') && content.includes('ENV=production');
          } catch { return false; }
        }
      }
    ]
  },
  {
    id: 'advanced-training',
    title: 'Thao Tác Nâng Cao',
    description: 'Xây dựng cấu trúc thư mục phức tạp và di chuyển tệp tin giữa các thư mục.',
    tasks: [
      {
        id: 'mkdir-src',
        description: 'Tạo thư mục "src".',
        commandHint: 'mkdir src',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return items.includes('src');
          } catch { return false; }
        }
      },
      {
        id: 'touch-index',
        description: 'Tạo tệp index.js bên trong thư mục src chứa nội dung "console.log(\'Hello\')".',
        commandHint: 'echo "console.log(\'Hello\')" > src/index.js',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('src/index.js');
            return content.includes('console.log');
          } catch { return false; }
        }
      },
      {
        id: 'mkdir-dist',
        description: 'Tạo thư mục "dist".',
        commandHint: 'mkdir dist',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return items.includes('dist');
          } catch { return false; }
        }
      },
      {
        id: 'cp-index',
        description: 'Sao chép tệp index.js từ thư mục src sang thư mục dist.',
        commandHint: 'cp src/index.js dist/index.js',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('dist/index.js');
            return content.includes('console.log');
          } catch { return false; }
        }
      },
      {
        id: 'rm-src',
        description: 'Xóa toàn bộ thư mục src.',
        commandHint: 'rm src',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return !items.includes('src');
          } catch { return false; }
        }
      }
    ]
  }
];

