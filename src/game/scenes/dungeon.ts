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
import { ELEMENTALIST_WIND, CharacterSkill } from '@/lib/characters';
import ElementalistWind, {
  elementalistWindAnimations,
  ElementalistWindAttack,
  ElementalistWindDefence,
} from '@/game/characters/ElementalistWind';

export default class DungeonScene extends Phaser.Scene {
  character: Phaser.Physics.Arcade.Sprite;
  characterSkillGroup: Phaser.GameObjects.Group;
  constructor() {
    super({
      key: SCENE_DUNGEON,
    });
    this.characterSkillGroup = new Phaser.GameObjects.Group(this);
  }
  create() {
    const eventBus = new Phaser.Events.EventEmitter();
    const dungeonConfig: DungeonConfig = {
      level: 1,
      name: LEVEL_1,
      tileSet: TILE_SET_1,
    };
    const map = generateDungeon(this, dungeonConfig);
    const inputs = setControls(this.input);
    const playerConfig = {
      scene: this,
      x: 100,
      y: 300,
      key: ELEMENTALIST_WIND,
    };

    this.character = new ElementalistWind(playerConfig, inputs, eventBus);
    const defence = new ElementalistWindDefence(this.character, this, eventBus);
    const attack = new ElementalistWindAttack(this.character, this, eventBus);
    this.characterSkillGroup.add(defence);
    this.characterSkillGroup.add(attack);
    elementalistWindAnimations(this);

    setCamera(this, this.character, map);
    this.physics.add.collider(this.character, map.ground);
  }
  update() {
    this.character.update();
    this.characterSkillGroup.getChildren().forEach((skill: CharacterSkill) => {
      skill.update();
    });
  }
}
