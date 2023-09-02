import { Level } from "./level";

export class Spawner {

  spawnIntervalBase = 2000;
  spawnIntervalVaryRange = 300; // vary in both direction, so range is twice as big as this number
  spawnIntervalMin = 1000;
  spawnIntervalMultiplierPerSpawn = 0.995;
  spawnInterval = this.spawnIntervalBase

  counter = this.spawnInterval;

  constructor(
    private level: Level,
  ) {

  }

  tick(dt: number) {
    this.counter += dt;
    if (this.counter >= this.spawnInterval) {
      this.spawnIntervalBase = Math.max(this.spawnIntervalMin, this.spawnIntervalBase * this.spawnIntervalMultiplierPerSpawn);
      this.spawnInterval = this.spawnIntervalBase + (Math.random() * 2 - 1) * this.spawnIntervalVaryRange;
      this.counter -= this.spawnInterval;

      this.level.spawnChar(Math.floor(Math.random() * this.level.stations));
    }
  }
}
