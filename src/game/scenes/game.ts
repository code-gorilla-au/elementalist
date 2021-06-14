import Phaser from 'phaser';
import Title from '@/game/scenes/title';

const config: Phaser.Types.Core.GameConfig = {};
config.scene = [Title];

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}
