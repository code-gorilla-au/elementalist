import { InputControls } from '@/lib/dungeon';
export type CharacterName = string;
export const ELEMENTALIST_WIND: CharacterName = 'ELEMENTALIST_WIND';

export type CharacterAction = string;
export const ELEMENTALIST_IDLE: CharacterAction = 'ELEMENTALIST_IDLE';
export const ELEMENTALIST_RUN: CharacterAction = 'ELEMENTALIST_RUN';
export const ELEMENTALIST_JUMP: CharacterAction = 'ELEMENTALIST_JUMP';
export const ELEMENTALIST_FALL: CharacterAction = 'ELEMENTALIST_FALL';
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

const attackingAnimations = [
  ELEMENTALIST_ATTACK,
  ELEMENTALIST_DEFENCE,
  ELEMENTALIST_UTILITY,
  ELEMENTALIST_ULTIMATE,
];

export function handleAnimationComplete(character: Character) {
  return function events(event: any) {
    if (attackingAnimations.includes(event.key)) {
      character.attacking = false;
    }
  };
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
  body: Body;
}

export interface Body {
  deltaY(): number;
  deltaX(): number;
  velocity: {
    x: number;
    y: number;
  };
}

export function combat(character: Character, inputs: InputControls) {
  if (inputs.attack.isDown && isNotAttacking(character)) {
    character.attacking = true;
    character.play(ELEMENTALIST_ATTACK);
    character.setVelocity(0, 0);
  } else if (inputs.justUp(inputs.utility) && isNotAttacking(character)) {
    character.attacking = true;
    character.play(ELEMENTALIST_UTILITY);
    character.eventBus.emit(ELEMENTALIST_UTILITY, character);
    character.setVelocity(0, 0);
  } else if (inputs.justUp(inputs.defence) && isNotAttacking(character)) {
    character.attacking = true;
    character.play(ELEMENTALIST_DEFENCE);
    character.eventBus.emit(ELEMENTALIST_DEFENCE), character;
  } else if (inputs.justUp(inputs.ultimate) && isNotAttacking(character)) {
    character.attacking = true;
    character.play(ELEMENTALIST_ULTIMATE);
    character.eventBus.emit(ELEMENTALIST_ULTIMATE), character;
  }
}

export function movement(character: Character, inputs: InputControls) {
  const isFalling = character.body.velocity.y > 0;
  const isJumping = character.body.velocity.y < 0;
  if (isFalling) {
    character.play(ELEMENTALIST_FALL, true);
  } else if (isJumping) {
    character.play(ELEMENTALIST_JUMP, true);
  }

  if (inputs.up.isDown && isNotAttacking(character)) {
    character.setVelocityY(-character.speed);
  }

  if (inputs.left.isDown && isNotAttacking(character)) {
    character.setFlipX(true);
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityX(-character.speed);
  } else if (inputs.right.isDown && isNotAttacking(character)) {
    character.setFlipX(false);
    character.play(ELEMENTALIST_RUN, true);
    character.setVelocityX(character.speed);
  } else if (isNotAttacking(character)) {
    character.play(ELEMENTALIST_IDLE, true);
    character.setVelocityX(0);
  }
}

function isTouchingGround(body: Body): boolean {
  const isOnGround = body.velocity.y === 0;
  const isPrevOnGround = body.deltaY() < 1 && body.deltaY() > 0;
  return isOnGround && isPrevOnGround;
}

function isNotAttacking(character: Character): boolean {
  return !character.attacking && isTouchingGround(character.body);
}
