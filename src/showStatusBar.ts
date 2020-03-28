import * as vscode from 'vscode';

export default () => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
  statusBarItem.text = '❤ 召唤鼓励师';
  statusBarItem.tooltip = '召唤陈红鼓励师';
  statusBarItem.command = 'ch.showReminderView';
  statusBarItem.show();
};
