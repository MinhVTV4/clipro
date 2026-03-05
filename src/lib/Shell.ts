import { VFSCommands } from "../vfs/commands";

export class Shell {
  vfs: VFSCommands;
  env: Record<string, string>;
  isReady: boolean = false;

  constructor() {
    this.vfs = new VFSCommands();
    this.env = {
      USER: "user",
      HOME: "/home/user",
    };
  }

  async init() {
    await this.vfs.init();
    this.isReady = true;
  }

  async execute(commandLine: string): Promise<string> {
    if (!this.isReady) await this.init();
    
    let cmdLine = commandLine.trim();
    let redirectTarget: string | null = null;
    let append = false;

    // Parse redirection
    const appendMatch = cmdLine.match(/(.*)>>\s*(\S+)$/);
    if (appendMatch) {
      cmdLine = appendMatch[1].trim();
      redirectTarget = appendMatch[2];
      append = true;
    } else {
      const writeMatch = cmdLine.match(/(.*)>\s*(\S+)$/);
      if (writeMatch) {
        cmdLine = writeMatch[1].trim();
        redirectTarget = writeMatch[2];
      }
    }

    const args = cmdLine.split(/\s+/);
    if (args.length === 0 || args[0] === "") return "";

    const cmd = args[0];
    let output = "";

    try {
      switch (cmd) {
        case "ls":
          const items = await this.vfs.ls(args[1]);
          output = items.join("  ");
          break;
        case "cd":
          await this.vfs.cd(args[1] || this.env.HOME);
          break;
        case "pwd":
          output = await this.vfs.pwd();
          break;
        case "mkdir":
          if (!args[1]) throw new Error("missing operand");
          await this.vfs.mkdir(args[1]);
          break;
        case "touch":
          if (!args[1]) throw new Error("missing operand");
          await this.vfs.touch(args[1]);
          break;
        case "rm":
          if (!args[1]) throw new Error("missing operand");
          await this.vfs.rm(args[1]);
          break;
        case "cp":
          if (!args[1] || !args[2]) throw new Error("missing file operand");
          await this.vfs.cp(args[1], args[2]);
          break;
        case "mv":
          if (!args[1] || !args[2]) throw new Error("missing file operand");
          await this.vfs.mv(args[1], args[2]);
          break;
        case "cat":
          if (!args[1]) throw new Error("missing operand");
          output = await this.vfs.cat(args[1]);
          break;
        case "echo":
          let echoStr = args.slice(1).join(" ");
          // Remove surrounding quotes if present
          if ((echoStr.startsWith('"') && echoStr.endsWith('"')) || (echoStr.startsWith("'") && echoStr.endsWith("'"))) {
            echoStr = echoStr.slice(1, -1);
          }
          output = echoStr;
          break;
        case "whoami":
          output = this.env.USER;
          break;
        case "help":
          output = "Available commands: ls, cd, pwd, mkdir, touch, rm, cp, mv, cat, echo, whoami, clear, help\nRedirection: > (write), >> (append)";
          break;
        default:
          output = `command not found: ${cmd}`;
      }

      if (redirectTarget) {
        if (append) {
          await this.vfs.appendFile(redirectTarget, output + "\n");
        } else {
          await this.vfs.writeFile(redirectTarget, output + "\n");
        }
        return "";
      }

      return output;
    } catch (e: any) {
      return `${cmd}: ${e.message}`;
    }
  }

  async getPrompt(): Promise<string> {
    if (!this.isReady) await this.init();
    const cwd = await this.vfs.pwd();
    const displayCwd = cwd.replace(this.env.HOME, "~");
    return `\x1b[1;32m${this.env.USER}@learn-cli\x1b[0m:\x1b[1;34m${displayCwd}\x1b[0m$ `;
  }
}
