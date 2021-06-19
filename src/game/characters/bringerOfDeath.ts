import Phaser from 'phaser';
import {
  BRINGER_OF_DEATH,
  BRINGER_OF_DEATH_HURT,
  BRINGER_OF_DEATH_IDLE,
  BRINGER_OF_DEATH_RUN,
  Character,
  Enemy,
} from '@/lib/characters';

export default class BringerOfDeath extends Phaser.Physics.Arcade.Sprite {
  private speed: number;
  private hurt: boolean;
  private strikeDistance: number;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, BRINGER_OF_DEATH);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setSize(40, 53);
    this.setOffset(85, 40);
    this.speed = 50;
    this.hurt = false;
    this.strikeDistance = 50;
    this.on(BRINGER_OF_DEATH_HURT, () => {
      this.hurt = true;
      this.setVelocity(60, -50);
      this.play(BRINGER_OF_DEATH_HURT, true);
      setTimeout(() => {
        this.hurt = false;
        this.setVelocityX(0);
      }, 500);
    });
  }
  update(character: Character, enemy: Enemy): void {
    this.followCharacter(character);
  }
  private followCharacter(character: Character) {
    const distanceBetween = Phaser.Math.Distance.Between(character.x, character.y, this.x, this.y);
    if (this.hurt) {
      return;
    }
    if (distanceBetween <= this.strikeDistance) {
      this.play(BRINGER_OF_DEATH_IDLE, true);
      this.setVelocityX(0);
      return;
    }
    this.play(BRINGER_OF_DEATH_RUN, true);
    this.scene.physics.moveTo(this, character.x, character.y, this.speed);
  }
}

export function bringerOfDeathAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: BRINGER_OF_DEATH_IDLE,
    frames: scene.anims.generateFrameNumbers(BRINGER_OF_DEATH, { start: 0, end: 7 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: BRINGER_OF_DEATH_RUN,
    frames: scene.anims.generateFrameNumbers(BRINGER_OF_DEATH, { start: 8, end: 15 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: BRINGER_OF_DEATH_HURT,
    frames: scene.anims.generateFrameNumbers(BRINGER_OF_DEATH, { start: 27, end: 29 }),
    frameRate: 10,
  });
}
