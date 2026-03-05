import React, { useState } from "react";
import { TerminalComponent } from "./components/Terminal";
import { FileExplorer } from "./components/FileExplorer";
import {
  BookOpen,
  CheckCircle,
  Terminal as TermIcon,
  Zap,
  Sparkles,
  Menu,
  X
} from "lucide-react";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [vfsRefreshTrigger, setVfsRefreshTrigger] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#141414] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden p-1 -ml-1 text-gray-400 hover:text-white"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TermIcon className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold tracking-tight text-white">
              HintShell Learn
            </h1>
            <p className="hidden md:block text-xs text-gray-400 font-medium">
              Next-Gen AI-Ready CLI Training
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <a
            href="https://github.com/philau2512/hintshell"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Zap size={16} className="mr-1.5 text-yellow-500" />
            Powered by HintShell Concept
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Lessons */}
        <aside className={`
          absolute md:relative z-40 h-full w-[280px] md:w-80 
          border-r border-white/10 bg-[#111111] flex flex-col
          transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center">
              <BookOpen size={16} className="mr-2" />
              Learning Path
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Lesson 1 */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 transition-all hover:border-indigo-500/30">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">1. Điều hướng & Khám phá</h3>
                <div className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wide">Bắt đầu</div>
              </div>
              <p className="text-sm text-gray-400 mb-3">Làm quen với không gian làm việc của bạn bằng các lệnh cơ bản nhất.</p>
              <div className="space-y-3">
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">1. Xem thư mục hiện tại:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">pwd</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">2. Liệt kê các tệp tin:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">ls</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">3. Di chuyển về thư mục gốc:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">cd /</code>
                </div>
              </div>
            </div>

            {/* Lesson 2 */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 transition-all hover:border-indigo-500/30">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">2. Quản lý Tệp & Thư mục</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Tạo và tổ chức không gian làm việc của bạn.</p>
              <div className="space-y-3">
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">1. Tạo thư mục mới:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">mkdir workspace</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">2. Đi vào thư mục vừa tạo:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">cd workspace</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">3. Tạo một tệp tin trống:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">touch notes.txt</code>
                </div>
              </div>
            </div>

            {/* Lesson 3 */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 transition-all hover:border-indigo-500/30">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">3. Xem & Xóa Dữ liệu</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Thao tác trực tiếp với nội dung của tệp tin.</p>
              <div className="space-y-3">
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">1. Xem nội dung tệp (quay lại home trước):</div>
                  <div className="flex flex-col space-y-1">
                    <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono w-fit">cd /home/user</code>
                    <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono w-fit">cat readme.txt</code>
                  </div>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">2. Xóa tệp tin đã tạo:</div>
                  <div className="flex flex-col space-y-1">
                    <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono w-fit">cd workspace</code>
                    <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono w-fit">rm notes.txt</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson 4 */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 transition-all hover:border-indigo-500/30">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">4. Tiện ích Hệ thống</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Các lệnh hữu ích trong quá trình làm việc.</p>
              <div className="space-y-3">
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">1. In một chuỗi ra màn hình:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">echo "Hello CLI"</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">2. Xem tên người dùng hiện tại:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">whoami</code>
                </div>
                <div className="bg-[#111] p-2 rounded border border-white/5">
                  <div className="text-xs text-gray-300 mb-1 font-medium">3. Xóa sạch màn hình terminal:</div>
                  <code className="text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded text-xs font-mono">clear</code>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 flex items-start">
              <Sparkles
                className="text-indigo-400 shrink-0 mt-0.5 mr-2"
                size={16}
              />
              <p className="text-xs text-indigo-200 leading-relaxed">
                <strong>HintShell (Simulated)</strong> is active. Start typing a command
                and it will suggest the right completions based on predefined rules!
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div 
            className="absolute inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Terminal Area */}
        <section className="flex-1 p-2 md:p-6 bg-[#050505] flex flex-col w-full">
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-h-0">
              <TerminalComponent onCommandExecuted={() => setVfsRefreshTrigger(prev => prev + 1)} />
            </div>
            <div className="w-full lg:w-72 h-64 lg:h-full shrink-0">
              <FileExplorer refreshTrigger={vfsRefreshTrigger} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
