import Phaser from 'phaser';
import { SCENE_DUNGEON } from '@/lib/constants/scenes';
import {
  DungeonConfig,
  generateDungeon,
  LEVEL_1,
  TILE_SET_1,
  setCamera,
  setControls,
} from '@/lib/dungeon';
import { ELEMENTALIST_WIND } from '@/lib/characters';
import Wind from '@/game/characters/wind';

export default class DungeonScene extends Phaser.Scene {
  player: Wind;
  constructor() {
    super({
      key: SCENE_DUNGEON,
    });
  }
  create() {
    const evenBus = new Phaser.Events.EventEmitter();
    const dungeonConfig: DungeonConfig = {
      level: 1,
      name: LEVEL_1,
      tileSet: TILE_SET_1,
    };
    const map = generateDungeon(this, dungeonConfig);
    const playerConfig = {
      scene: this,
      x: 100,
      y: 100,
      key: ELEMENTALIST_WIND,
    };
    const inputs = setControls(this.input);
    this.player = new Wind(playerConfig, inputs, evenBus);
    this.anims.create({
      key: `${ELEMENTALIST_WIND}_idle`,
      frames: this.anims.generateFrameNumbers(ELEMENTALIST_WIND, { start: 1, end: 4 }),
      frameRate: 10,
    });
    setCamera(this, this.player, map);
    this.physics.add.collider(this.player, map.ground);
  }
  update() {
    this.player.update();
  }
}
