import Phaser from 'phaser';

import { CharacterConfig, ELEMENTALIST_WIND } from '@/lib/characters';
import { InputControls } from '@/lib/dungeon';

export default class ElementalistWind extends Phaser.Physics.Arcade.Sprite {
  constructor(
    config: CharacterConfig,
    inputs?: InputControls,
    eventBus?: Phaser.Events.EventEmitter,
  ) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setCircle(15, 95, 80);
  }
  update() {
    this.anims.play(`${ELEMENTALIST_WIND}_idle`, true);
  }
}
