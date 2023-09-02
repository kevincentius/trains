import { Level } from "./level";

export class Char {
  
  p = 0;
  x = 0;
  y = 0;

  speed = 0.5;

  constructor(
    public level: Level,
    public fromNode: number,
    public toNode: number | undefined,
    public targetStation: number,
  ) {
    this.updatePos();
  }

  // returns false if the char should be deleted
  update(dt: number): boolean {
    this.p += (this.speed * dt);
    if (this.p >= 1000) {
      if (this.toNode != undefined) {
        this.p -= 1000;
        this.fromNode = this.toNode;
        this.toNode = this.level.getNextNode(this.toNode);

        if (!this.toNode) {
          this.level.acceptStation(this.targetStation, this.fromNode);
          return false;
        }
      } else {
        this.p = 1;
      }
    }

    this.updatePos();

    return true;
  }

  private updatePos() {
    [this.x, this.y] = this.level.calcCharPos(this);
  }
}
