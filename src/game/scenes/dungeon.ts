import Phaser from 'phaser';
import { SCENE_DUNGEON } from '@/lib/constants/scenes';
import { DungeonConfig, generateDungeon, LEVEL_1, TILE_SET_1 } from '@/lib/dungeon';

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_DUNGEON,
    });
  }
  create() {
    const dungeonConfig: DungeonConfig = {
      level: 1,
      name: LEVEL_1,
      tileSet: TILE_SET_1,
    };
    const map = generateDungeon(this, dungeonConfig);
  }
}
