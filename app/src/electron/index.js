import { app } from 'electron';
import Window from './services/Window';

const isDevelopment = process.env.NODE_ENV !== 'production';

const locked = app.requestSingleInstanceLock();
if (locked === false) app.quit();
const window = new Window();
app.on('second-instance', () => window.show());
app.on('ready', () => window.show());
app.on('open-url', (event) => event.preventDefault());
app.on('activate', () => window.show());
app.on('before-quit', () => app.exit());
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
