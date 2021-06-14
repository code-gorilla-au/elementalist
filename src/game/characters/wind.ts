import Phaser from 'phaser';

import { CharacterConfig, ELEMENTALIST_WIND } from '@/lib/characters';
import { InputControls } from '@/lib/dungeon';

export default class ElementalistWind extends Phaser.GameObjects.Sprite {
  constructor(
    config: CharacterConfig,
    inputs?: InputControls,
    eventBus?: Phaser.Events.EventEmitter,
  ) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
  }
  update() {
    this.anims.play(`${ELEMENTALIST_WIND}_idle`, true);
  }
}
