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
import { ELEMENTALIST_WIND, BRINGER_OF_DEATH_HURT } from '@/lib/characters';
import ElementalistWind, {
  elementalistWindAnimations,
  ElementalistWindAttack,
  ElementalistWindDefence,
} from '@/game/characters/elementalistWind';
import BringerOfDeath, { bringerOfDeathAnimations } from '@/game/characters/bringerOfDeath';

export default class DungeonScene extends Phaser.Scene {
  character: Phaser.Physics.Arcade.Sprite;
  characterSkillGroup: Phaser.GameObjects.Group;
  enemiesGroup: Phaser.GameObjects.Group;
  constructor() {
    super({
      key: SCENE_DUNGEON,
    });
    this.characterSkillGroup = new Phaser.GameObjects.Group(this);
    this.enemiesGroup = new Phaser.GameObjects.Group(this);
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
    this.enemiesGroup.add(new BringerOfDeath(this, 150, 300));
    elementalistWindAnimations(this);
    bringerOfDeathAnimations(this);
    setCamera(this, this.character, map);

    this.physics.add.collider(this.character, map.ground);
    this.physics.add.collider(this.enemiesGroup, map.ground);
    this.physics.add.collider(this.character, this.enemiesGroup);
    this.physics.add.collider(this.characterSkillGroup, this.enemiesGroup);
    this.physics.add.overlap(
      this.characterSkillGroup,
      this.enemiesGroup,
      hurtEnemy,
      undefined,
      this,
    );
  }
  update() {
    this.character.update();
    this.characterSkillGroup.getChildren().forEach((skill: Phaser.GameObjects.GameObject) => {
      skill.update();
    });
    this.enemiesGroup.getChildren().forEach((enemy) => {
      enemy.update(this.character);
    });
  }
}

function hurtEnemy(...args: any[]) {
  const [skill, enemy] = args;
  enemy.emit(BRINGER_OF_DEATH_HURT);
}
