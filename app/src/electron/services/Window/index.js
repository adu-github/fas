import Main from './main';

let mainWindow = null;

export default class Window {
  show() {
    if (mainWindow == null) mainWindow = new Main();
    mainWindow.show();
  }
}
