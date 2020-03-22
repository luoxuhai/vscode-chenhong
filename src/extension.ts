import * as vscode from 'vscode';
import ReminderView from './reminderView';
import Scheduler from './scheduler';
import showStatusBar from './showStatusBar';

let scheduler: Scheduler;

export function activate(context: vscode.ExtensionContext) {
  scheduler = new Scheduler(context);
  scheduler.start();

  showStatusBar();

  const disposable = vscode.commands.registerCommand('ch.showReminderView', () => {
    ReminderView.show(context);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  scheduler.dispose();
}
