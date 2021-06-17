import Phaser from 'phaser';

import {
  CharacterConfig,
  ELEMENTALIST_WIND,
  ELEMENTALIST_IDLE,
  ELEMENTALIST_RUN,
  ELEMENTALIST_ATTACK,
  ELEMENTALIST_DEFENCE,
  ELEMENTALIST_FALL,
  movement,
  combat,
  ELEMENTALIST_JUMP,
  handleAnimationComplete,
  ELEMENTALIST_UTILITY,
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
    // this.enableBody(false, this.x, this.y, true, true);

    // attributes
    this.attacking = false;
    this.speed = 200;
    this.eventBus = eventBus;
    this.inputs = inputs;
    // events
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, handleAnimationComplete(this));
  }
  update() {
    movement(this, this.inputs);
    combat(this, this.inputs);
  }
}

export class ElementalistWindDefence extends Phaser.Physics.Arcade.Image {
  evenBus: Phaser.Events.EventEmitter;
  character: Phaser.Physics.Arcade.Sprite;
  constructor(
    character: Phaser.Physics.Arcade.Sprite,
    scene: Phaser.Scene,
    eventBus: Phaser.Events.EventEmitter,
  ) {
    super(scene, character.x, character.y, ELEMENTALIST_DEFENCE);
    this.evenBus = eventBus;
    this.character = character;
  }
  create() {
    this.evenBus.on(ELEMENTALIST_DEFENCE, () => {
      if (this.character.flipX) {
        this.character.setVelocityX(-200);
      } else {
        this.character.setVelocityX(200);
      }
    });
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
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 120, end: 125 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: ELEMENTALIST_UTILITY,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 180, end: 196 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: ELEMENTALIST_JUMP,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 60, end: 62 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ELEMENTALIST_FALL,
    frames: scene.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 90, end: 92 }),
    frameRate: 10,
    repeat: -1,
  });
}
