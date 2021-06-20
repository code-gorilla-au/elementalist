import Phaser from 'phaser';
import {
  BRINGER_OF_DEATH,
  BRINGER_OF_DEATH_HURT,
  BRINGER_OF_DEATH_IDLE,
  BRINGER_OF_DEATH_RUN,
  Character,
  Enemy,
} from '@/lib/characters';
import { GRAVITY } from '@/lib/game';

export default class BringerOfDeath extends Phaser.Physics.Arcade.Sprite {
  hurt: boolean;
  attacking: boolean;
  speed: number;
  strikeDistance: number;
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
    this.attacking = false;
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
  update(character: Character): void {
    followCharacter(character, this);
  }
}

export class BringerOfDeathAttack extends Phaser.Physics.Arcade.Image {
  enemy: BringerOfDeath;
  constructor(scene: Phaser.Scene, enemy: BringerOfDeath) {
    super(scene, enemy.x, enemy.y, 'hitBox');
    this.enemy = enemy;
    this.setAlpha(0);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setCircle(5);
    this.setGravityY(-GRAVITY);
    this.disableBody();
  }
  update(...args: any[]) {}
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

function followCharacter(character: Character, enemy: BringerOfDeath) {
  const distanceBetween = Phaser.Math.Distance.Between(character.x, character.y, enemy.x, enemy.y);
  if (enemy.hurt || enemy.attacking) {
    return;
  }
  if (distanceBetween <= enemy.strikeDistance) {
    enemy.play(BRINGER_OF_DEATH_IDLE, true);
    enemy.setVelocityX(0);
    return;
  }
  enemy.play(BRINGER_OF_DEATH_RUN, true);
  enemy.scene.physics.moveTo(enemy, character.x, enemy.y, enemy.speed);
}
