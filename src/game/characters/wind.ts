import Phaser from 'phaser';

import { CharacterConfig } from '@/lib/characters';
import { InputControls } from '@/lib/dungeon';

export default class Wind extends Phaser.GameObjects.Sprite {
  constructor(
    config: CharacterConfig,
    inputs: InputControls,
    eventBus: Phaser.Events.EventEmitter,
  ) {
    super(config.scene, config.x, config.y, config.key);
  }
}
