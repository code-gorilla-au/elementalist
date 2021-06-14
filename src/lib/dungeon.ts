import Phaser from 'phaser';
export interface DungeonConfig {
  level: number;
  name: DungeonLevel;
  tileSet: DungeonTileSet;
}

export const LEVEL_1: DungeonLevel = 'LEVEL_1';
export const LEVEL_2: DungeonLevel = 'LEVEL_2';
export const TILE_SET_1: DungeonTileSet = 'TILE_SET_1';
export const TILE_SET_2: DungeonTileSet = 'TILE_SET_2';
export type DungeonLevel = string;
export type DungeonTileSet = string;

export function generateDungeon(scene: Phaser.Scene, dungeonConfig: DungeonConfig) {
  const map = scene.make.tilemap({ key: dungeonConfig.name });
  const tileSet = map.addTilesetImage('dungeon_tileset', dungeonConfig.tileSet);
  const ground = map.createLayer('ground', tileSet, 0, 0);
  ground.setCollisionByProperty({ collides: true });
  return {
    ground,
  };
}
