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
    const config = new Config(this.context);

    vscode.window.onDidChangeWindowState(state => {
      if (state.focused) {
        this.interval = setInterval(() => {
          ReminderView.show(this.context);
        }, 1000 * 60 * config.getReminderViewIntervalInMinutes());
      } else {
        ReminderView.hide();
        clearInterval(this.interval);
      }
    });
  }
}
