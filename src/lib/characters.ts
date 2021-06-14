export const ELEMENTALIST_WIND: Character = 'ELEMENTALIST_WIND';

export type Character = string;

export interface CharacterConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: Character;
}
