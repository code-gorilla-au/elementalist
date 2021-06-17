import Phaser from 'phaser';
import { BRINGER_OF_DEATH, BRINGER_OF_DEATH_IDLE } from '@/lib/characters';

export default class BringerOfDeath extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, BRINGER_OF_DEATH);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setSize(40, 53);
    this.setOffset(85, 40);
  }
  update() {
    this.play(BRINGER_OF_DEATH_IDLE, true);
  }
}

export function bringerOfDeathAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: BRINGER_OF_DEATH_IDLE,
    frames: scene.anims.generateFrameNumbers(BRINGER_OF_DEATH, { start: 0, end: 7 }),
    frameRate: 10,
  });
}
