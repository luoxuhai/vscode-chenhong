const ReminderView = require('./reminderView');
const Config = require('./config');

class Scheduler {
  constructor(context) {
    this.context = context;
  }

  start() {
    const config = new Config(this.context);

    setInterval(() => {
      ReminderView.show(this.context);
    }, 1000 * 60 * config.getReminderViewIntervalInMinutes());
  }
}

module.exports = Scheduler;
