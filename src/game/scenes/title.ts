import Phaser from 'phaser';
import { SCENE_TITLE } from '@/lib/constants/scenes';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_TITLE,
    });
  }
  create() {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    const text = this.add.text(width / 2, height / 2, 'flashbang');
    text.setColor('white');
    text.setOrigin(0.5, 0.5);
  }
}
