import Basic from './basic';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default class Work extends Basic {
  constructor() {
    const options = {
      width: 1100,
      height: 615,
      minWidth: 800,
      minHeight: 600,
      show: false,
      webPreferences: {
        nodeIntegration: true,
      },
    };
    super('input', 'input.html', options);
  }

  show() {
    return new Promise(async (resolve) => {
      if (this.window == null) {
        this.createWindow();
        this.window.on('ready-to-show', () => {
          this.window.show();
          if (isDevelopment) {
            this.window.webContents.openDevTools();
          }
          resolve();
        });
        return;
      }
      if (this.window.isMinimized()) {
        this.window.restore();
      } else {
        this.window.show();
      }
      resolve();
    });
  }

  close() {
    if (this.window) {
      this.window.close();
    }
  }
}
