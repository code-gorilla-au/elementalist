import Phaser from 'phaser';
import Title from '@/game/scenes/title';
import Boot from '@/game/scenes/boot';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: '',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};
config.scene = [Boot, Title];

export default class Game extends Phaser.Game {
  constructor(containerId: string) {
    config.parent = containerId;
    super(config);
  }
}
