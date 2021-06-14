import Phaser from 'phaser';
import { SCENE_BOOT } from '@/lib/constants/scenes';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_BOOT,
    });
  }

  preload() {
    const progress = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(centerX / 2, centerY, 320, 50);
    // Fill progress bar as assets are loaded
    this.load.on('progress', (value: number) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(centerX, centerY, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progress.destroy();
      progressBox.destroy();
      this.scene.start(SCENE_TITLE);
    });
  }
}
