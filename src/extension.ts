import * as vscode from 'vscode';
import ReminderView from './reminderView';
import Scheduler from './scheduler';

export function activate(context: vscode.ExtensionContext) {
  const scheduler = new Scheduler(context);
  scheduler.start();

  const disposable = vscode.commands.registerCommand('ch.showReminderView', () => {
    ReminderView.show(context);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
