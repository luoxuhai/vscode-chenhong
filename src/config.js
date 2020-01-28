const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const getConfiguration = () => vscode.workspace.getConfiguration('ch');

class Config {
  constructor(context) {
    this.context = context;
  }

  getImage() {
    let images = [];

    if (this.getType() === 'custom') images = this.getCustomImages();
    else images = this.getDefaultImages();

    return this.getRandomOne(images);
  }

  getTitle() {
    return getConfiguration().get('title', '');
  }

  getReminderViewIntervalInMinutes() {
    return getConfiguration().get('reminderViewIntervalInMinutes', 60);
  }

  getType() {
    return getConfiguration().get('type', 'default');
  }

  getDefaultImages() {
    return this.readPathImage(path.join(this.context.extensionPath, 'public/images'));
  }

  getCustomImages() {
    return getConfiguration().get('customImages', []);
  }

  readPathImage(dirPath) {
    const files = [];
    const result = fs.readdirSync(dirPath);
    result.forEach((item, index) => {
      const stat = fs.lstatSync(path.join(dirPath, item));
      if (stat.isFile()) files.push(vscode.Uri.file(path.join(dirPath, item)).with({ scheme: 'vscode-resource' }));
    });
    return files;
  }

  getRandomOne(images) {
    const n = Math.floor(Math.random() * images.length + 1) - 1;
    return images[n];
  }
}

module.exports = Config;
