import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export default class Config {
  context: vscode.ExtensionContext;
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  getTitle() {
    return this.getConfiguration().get('title', '');
  }

  getImage() {
    let images = [];

    if (this.getType() === 'custom') images = this.getCustomImages();
    else images = this.getDefaultImages();

    return this.getRandomOne(images);
  }

  getReminderViewIntervalInMinutes() {
    return this.getConfiguration().get('reminderViewIntervalInMinutes', 40);
  }

  private getDefaultImages() {
    return this.readPathImage(path.join(this.context.extensionPath, 'public/images'));
  }

  private getCustomImages() {
    return this.getConfiguration().get('customImages', []);
  }

  private readPathImage(dirPath: string) {
    const files: any[] = [];
    const result = fs.readdirSync(dirPath);
    result.forEach((item: string, index: number) => {
      const stat = fs.lstatSync(path.join(dirPath, item));
      if (stat.isFile())
        files.push(
          vscode.Uri.file(path.join(dirPath, item)).with({
            scheme: 'vscode-resource',
          }),
        );
    });
    return files;
  }

  private getRandomOne(images: string[]) {
    const n = Math.floor(Math.random() * images.length + 1) - 1;
    return images[n];
  }

  private getConfiguration() {
    return vscode.workspace.getConfiguration('ch');
  }

  private getType() {
    return this.getConfiguration().get('type', 'default');
  }
}
