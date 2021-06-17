export const GRAVITY = 300;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: '',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      debug: true,
    },
  },
};

export interface InputControls {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  attack: Phaser.Input.Keyboard.Key;
  defence: Phaser.Input.Keyboard.Key;
  utility: Phaser.Input.Keyboard.Key;
  ultimate: Phaser.Input.Keyboard.Key;
  justDown: InputUtility;
  justUp: InputUtility;
}

export type InputUtility = (key: Phaser.Input.Keyboard.Key) => boolean;
