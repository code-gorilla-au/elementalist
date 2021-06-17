import Phaser from 'phaser';
import { InputControls } from '@/lib/game';
export interface DungeonConfig {
  level: number;
  name: DungeonLevel;
  tileSet: DungeonTileSet;
}

export interface Dungeon {
  width: number;
  height: number;
  ground: Phaser.Tilemaps.TilemapLayer;
  background: Phaser.Tilemaps.TilemapLayer;
}

export const LEVEL_1: DungeonLevel = 'LEVEL_1';
export const LEVEL_2: DungeonLevel = 'LEVEL_2';
export const TILE_SET_1: DungeonTileSet = 'TILE_SET_1';
export const TILE_SET_2: DungeonTileSet = 'TILE_SET_2';
export type DungeonLevel = string;
export type DungeonTileSet = string;

const layerGround = 'ground';
const layerBackground = 'background';
const tileSetLabel = 'dungeon_tileset';

export function generateDungeon(scene: Phaser.Scene, dungeonConfig: DungeonConfig): Dungeon {
  const map = scene.make.tilemap({ key: dungeonConfig.name });
  const tileSet = map.addTilesetImage(tileSetLabel, dungeonConfig.tileSet);
  const ground = map.createLayer(layerGround, tileSet, 0, 0);
  const background = map.createLayer(layerBackground, tileSet, 0, 0);
  ground.setCollisionByExclusion([-1], true);
  scene.physics.world.setBounds(0, 0, ground.width, ground.height);
  return {
    width: map.widthInPixels,
    height: map.heightInPixels,
    ground,
    background,
  };
}

export function setCamera(
  scene: Phaser.Scene,
  player: Phaser.GameObjects.GameObject,
  dungeon: Dungeon,
) {
  scene.cameras.main.setBounds(0, 0, dungeon.width, dungeon.height);
  scene.cameras.main.zoomTo(2, 1000);
  scene.cameras.main.startFollow(player);
}

const { UP, LEFT, RIGHT, DOWN, X, Z, C, V } = Phaser.Input.Keyboard.KeyCodes;

export function setControls(input: Phaser.Input.InputPlugin): InputControls {
  return {
    left: input.keyboard.addKey(LEFT),
    right: input.keyboard.addKey(RIGHT),
    up: input.keyboard.addKey(UP),
    down: input.keyboard.addKey(DOWN),
    attack: input.keyboard.addKey(Z),
    defence: input.keyboard.addKey(X),
    utility: input.keyboard.addKey(C),
    ultimate: input.keyboard.addKey(V),
    justDown: Phaser.Input.Keyboard.JustDown,
    justUp: Phaser.Input.Keyboard.JustUp,
  };
}
