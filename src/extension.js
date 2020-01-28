const vscode = require('vscode');
const ReminderView = require('./reminderView');
const Scheduler = require('./Scheduler');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const scheduler = new Scheduler(context);
  scheduler.start();

  const disposable = vscode.commands.registerCommand('ch.showReminderView', () => {
    ReminderView.show(context);
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
