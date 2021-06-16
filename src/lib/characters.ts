import { InputControls } from '@/lib/dungeon';
export type CharacterName = string;
export const ELEMENTALIST_WIND: CharacterName = 'ELEMENTALIST_WIND';

export type CharacterAction = string;
export const ELEMENTALIST_IDLE: CharacterAction = 'ELEMENTALIST_IDLE';
export const ELEMENTALIST_RUN: CharacterAction = 'ELEMENTALIST_RUN';
export const ELEMENTALIST_JUMP: CharacterAction = 'ELEMENTALIST_JUMP';
export const ELEMENTALIST_ATTACK: CharacterAction = 'ELEMENTALIST_ATTACK';
export const ELEMENTALIST_DEFENCE: CharacterAction = 'ELEMENTALIST_DEFENCE';
export const ELEMENTALIST_UTILITY: CharacterAction = 'ELEMENTALIST_UTILITY';
export const ELEMENTALIST_ULTIMATE: CharacterAction = 'ELEMENTALIST_ULTIMATE';

export interface CharacterConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: CharacterName;
}

export interface Character {
  attacking: boolean;
  speed: number;
  eventBus: Phaser.Events.EventEmitter;
  setFlipX(bool: boolean): this;
  update(): void;
  setVelocityY(y: number): this;
  setVelocityX(x: number): this;
  setVelocity(x: number, y: number): this;
  play(
    key: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig,
    ignoreIfPlaying?: boolean | undefined,
  ): this;
  body: {
    velocity: {
      x: number;
      y: number;
    };
  };
}

export function movement(character: Character, inputs: InputControls) {
  const isOnGround = character.body.velocity.y >= 0;
  if (inputs.left.isDown && !character.attacking) {
    character.setFlipX(true);
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityX(-character.speed);
  } else if (inputs.right.isDown && !character.attacking) {
    character.setFlipX(false);
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityX(character.speed);
  } else if (inputs.down.isDown && !character.attacking) {
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityX(character.speed);
  } else if (inputs.up.isDown && !character.attacking && isOnGround) {
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityY(-character.speed);
  } else if (!character.attacking) {
    character.play(ELEMENTALIST_IDLE, true);
    character.setVelocityX(0);
  }
}
