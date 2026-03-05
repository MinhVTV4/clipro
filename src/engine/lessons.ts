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
    description: 'Học cách sao chép (cp), di chuyển/đổi tên (mv), nối thêm dữ liệu (>>) và quản lý cấu trúc thư mục.',
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
        id: 'mkdir-config',
        description: 'Tạo một thư mục tên là "project_config".',
        commandHint: 'mkdir project_config',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return items.includes('project_config');
          } catch { return false; }
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
        id: 'append-config',
        description: 'Nối thêm dòng "ENV=production" vào cuối tệp config.txt.',
        commandHint: 'echo "ENV=production" >> config.txt',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('config.txt');
            return content.includes('PORT=8080') && content.includes('ENV=production');
          } catch { return false; }
        }
      },
      {
        id: 'cat-config',
        description: 'Kiểm tra lại nội dung của tệp config.txt.',
        commandHint: 'cat config.txt',
        verify: async (vfs, cmd) => cmd.trim().startsWith('cat config.txt')
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
        id: 'mv-config-rename',
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
        id: 'mv-config-move',
        description: 'Di chuyển tệp config.txt vào trong thư mục project_config.',
        commandHint: 'mv config.txt project_config',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('project_config');
            return items.includes('config.txt');
          } catch { return false; }
        }
      },
      {
        id: 'ls-config',
        description: 'Liệt kê nội dung bên trong thư mục project_config để kiểm tra.',
        commandHint: 'ls project_config',
        verify: async (vfs, cmd) => cmd.trim() === 'ls project_config' || cmd.trim() === 'ls project_config/'
      },
      {
        id: 'rm-backup',
        description: 'Xóa tệp backup.txt vì không còn cần thiết.',
        commandHint: 'rm backup.txt',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return !items.includes('backup.txt');
          } catch { return false; }
        }
      }
    ]
  },
  {
    id: 'advanced-training',
    title: 'Thao Tác Nâng Cao',
    description: 'Xây dựng cấu trúc dự án phức tạp, thao tác với đường dẫn tương đối và quản lý tệp tin hàng loạt.',
    tasks: [
      {
        id: 'cd-home-adv',
        description: 'Đảm bảo bạn đang ở thư mục /home/user.',
        commandHint: 'cd /home/user',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd === '/home/user';
        }
      },
      {
        id: 'mkdir-app',
        description: 'Tạo thư mục "app_build".',
        commandHint: 'mkdir app_build',
        verify: async (vfs, cmd) => {
          try {
            const items = await vfs.ls('.');
            return items.includes('app_build');
          } catch { return false; }
        }
      },
      {
        id: 'cd-app',
        description: 'Di chuyển vào thư mục "app_build".',
        commandHint: 'cd app_build',
        verify: async (vfs, cmd) => {
          const pwd = await vfs.pwd();
          return pwd.endsWith('/app_build');
        }
      },
      {
        id: 'mkdir-src-dist',
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
        id: 'touch-main',
        description: 'Tạo tệp main.js trong thư mục src với nội dung "console.log(\'main\')".',
        commandHint: 'echo "console.log(\'main\')" > src/main.js',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('src/main.js');
            return content.includes('main');
          } catch { return false; }
        }
      },
      {
        id: 'touch-utils',
        description: 'Tạo tệp utils.js trong thư mục src với nội dung "console.log(\'utils\')".',
        commandHint: 'echo "console.log(\'utils\')" > src/utils.js',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('src/utils.js');
            return content.includes('utils');
          } catch { return false; }
        }
      },
      {
        id: 'cp-main-dist',
        description: 'Sao chép tệp main.js từ src sang dist.',
        commandHint: 'cp src/main.js dist/',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('dist/main.js');
            return content.includes('main');
          } catch { return false; }
        }
      },
      {
        id: 'mv-utils-dist',
        description: 'Di chuyển và đổi tên tệp utils.js từ src sang dist thành helper.js.',
        commandHint: 'mv src/utils.js dist/helper.js',
        verify: async (vfs, cmd) => {
          try {
            const content = await vfs.cat('dist/helper.js');
            return content.includes('utils');
          } catch { return false; }
        }
      },
      {
        id: 'rm-src',
        description: 'Xóa toàn bộ thư mục src (lệnh rm của chúng ta hỗ trợ xóa đệ quy thư mục).',
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

