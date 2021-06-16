import Phaser from 'phaser';

import {
  CharacterConfig,
  ELEMENTALIST_WIND,
  ELEMENTALIST_IDLE,
  ELEMENTALIST_RUN,
  ELEMENTALIST_ATTACK,
  ELEMENTALIST_DEFENCE,
  movement,
} from '@/lib/characters';
import { InputControls } from '@/lib/dungeon';

export default class ElementalistWind extends Phaser.Physics.Arcade.Sprite {
  attacking: boolean;
  speed: number;
  eventBus: Phaser.Events.EventEmitter;
  inputs: InputControls;
  constructor(
    config: CharacterConfig,
    inputs: InputControls,
    eventBus: Phaser.Events.EventEmitter,
  ) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setCircle(15, 95, 80);

    // attributes
    this.attacking = false;
    this.speed = 200;
    this.eventBus = eventBus;
    this.inputs = inputs;
  }
  update() {
    movement(this, this.inputs);
  }
}

export function elementalistWindAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: ELEMENTALIST_IDLE,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 0, end: 7 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: ELEMENTALIST_RUN,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 30, end: 37 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: ELEMENTALIST_ATTACK,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 150, end: 157 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: ELEMENTALIST_DEFENCE,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 240, end: 246 }),
    frameRate: 10,
  });
}
