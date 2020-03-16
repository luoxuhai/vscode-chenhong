import * as vscode from 'vscode';
import Config from './config';

const displayName: string = '陈红鼓励师';

export default class ReminderView {
  private static webviewPanel: vscode.WebviewPanel | null = null;

  static show(context: vscode.ExtensionContext) {
    const config = new Config(context);

    const imagePath = config.getImage();
    const title = config.getTitle();

    if (this.webviewPanel) {
      this.webviewPanel.webview.html = this.generateHtml(imagePath, title);
      this.webviewPanel.reveal();
    } else {
      this.webviewPanel = vscode.window.createWebviewPanel('ch', displayName, vscode.ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });
      this.webviewPanel.webview.html = this.generateHtml(imagePath, title);
      this.webviewPanel.onDidDispose(() => {
        this.webviewPanel = null;
      });
    }
  }

  static hide() {
    this.webviewPanel?.dispose();
  }

  static generateHtml(imagePath: string, title: string) {
    return `<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${displayName}</title>
    </head>
    <body>
        <div><h1>${title}</h1></div>
        <div><img src="${imagePath}"></div>
    </body>
    </html>`;
  }
}
