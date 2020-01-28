const vscode = require('vscode');
const Config = require('./config');
const pack = require('../package.json');

class ReminderView {
  #webviewPanel = null;

  static show(context) {
    const config = new Config(context);

    const imagePath = config.getImage();
    const title = config.getTitle();

    if (this.webviewPanel) {
      this.webviewPanel.webview.html = this.generateHtml(imagePath, title);
      this.webviewPanel.reveal();
    } else {
      this.webviewPanel = vscode.window.createWebviewPanel('ch', pack.displayName, vscode.ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });
      this.webviewPanel.webview.html = this.generateHtml(imagePath, title);
      this.webviewPanel.onDidDispose(() => {
        this.webviewPanel = null;
      });
    }
  }

  static generateHtml(imagePath, title) {
    return `<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pack.displayName}</title>
    </head>
    <body>
        <div><h1>${title}</h1></div>
        <div><img src="${imagePath}"></div>
    </body>
    </html>`;
  }
}

module.exports = ReminderView;
