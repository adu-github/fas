import path from 'path';
import invoke from '../invoke';
import electron from 'electron';
import Packet from '../../../utils/parser/packet';
import ContentsToRender from '../../../utils/ecf/contentsToRender';

export default class Basic {
  constructor(id, entrance, options) {
    this.id = id;
    this.entrance = entrance;
    this.options = options;
    if (this._checkId()) {
      throw new Error(`The window id '${id}' already exists`);
    }
    this.window = null;
  }

  static getWindow(id) {
    if (Basic.windows && Basic.windows.has(id)) {
      return Basic.windows.get(id);
    }
    return null;
  }

  static getMessager(id) {
    if (Basic.messages && Basic.messages.has(id)) {
      return Basic.messages.get(id);
    }
    return null;
  }

  _checkId() {
    const cache = Basic.windows || new Map();
    return cache.has(this.id);
  }

  createWindow() {
    this.window = new electron.BrowserWindow(this.options);
    this.window.on('closed', () => {
      if (Basic.messages && Basic.messages.has(this.id)) {
        let message = Basic.getWindow(this.id);
        message.destroy();
        message = null;
        Basic.messages.delete(this.id);
      }
      if (Basic.windows && Basic.windows.has(this.id)) {
        Basic.windows.delete(this.id);
      }
      this.window = null;
    });
    this.window.on('ready-to-show', () => {
      Basic.windows = Basic.windows || new Map();
      if (Basic.windows.has(this.id)) return;
      Basic.windows.set(this.id, this.window);
      this.window.webContents.openDevTools();
    });
    Basic.messages = Basic.messages || new Map();
    if (!Basic.messages.has(this.id)) {
      const message = new ContentsToRender(this.window.webContents);
      message.on('message', async (...args) => {
        const packet = args[0];
        if (!Packet.isPacketValid(packet)) return;
        const callback = args.pop();
        const className = packet.class.name;
        const classParams = packet.class.arguments;
        const methodName = packet.method.name;
        const methodParams = packet.method.arguments;
        const e = await invoke(
          className,
          classParams,
          methodName,
          methodParams
        );
        callback(e);
      });
      Basic.messages.set(this.id, message);
    }
    const page = process.env.WEBPACK_DEV_SERVER_URL
      ? path.join(process.env.WEBPACK_DEV_SERVER_URL, this.entrance)
      : path.join('file://', __dirname, this.entrance);
    this.window.loadURL(page);
    return this.window;
  }
}
