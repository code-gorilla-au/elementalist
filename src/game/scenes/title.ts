import Phaser from 'phaser';
import { SCENE_TITLE } from '@/lib/constants/scenes';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_TITLE,
    });
  }
  create() {
    const text = this.add.text(100, 100, '');
    text.setColor('black');
  }
}
