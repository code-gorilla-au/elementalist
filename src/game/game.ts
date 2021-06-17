import Phaser from 'phaser';
import { gameConfig } from '@/lib/game';
import Title from '@/game/scenes/title';
import Boot from '@/game/scenes/boot';
import Dungeon from '@/game/scenes/dungeon';

gameConfig.scene = [Boot, Title, Dungeon];

export default class Game extends Phaser.Game {
  constructor(containerId: string) {
    gameConfig.parent = containerId;
    super(gameConfig);
  }
}
