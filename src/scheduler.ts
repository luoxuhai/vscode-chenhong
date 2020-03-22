import * as vscode from 'vscode';
import ReminderView from './reminderView';
import Config from './config';

export default class Scheduler {
  context: vscode.ExtensionContext;
  interval: any;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  start() {
    vscode.workspace.onDidChangeConfiguration(e => {
      if (
        e.affectsConfiguration('ch.reminderViewIntervalInMinutes') ||
        e.affectsConfiguration('ch.customImages') ||
        e.affectsConfiguration('ch.reminderViewIntervalInMinutes')
      ) {
        ReminderView.hide();
        this.change();
      }
    });

    this.change();
  }

  change() {
    const config = new Config(this.context);

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      ReminderView.show(this.context);
    }, 1000 * 60 * config.getReminderViewIntervalInMinutes());
  }

  dispose() {
    ReminderView.hide();
    clearInterval(this.interval);
  }
}
