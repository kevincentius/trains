import { Level } from "./level";

export class Char {
  
  p = 0;
  x = 0;
  y = 0;

  speed = 1;

  constructor(
    public level: Level,
    public fromNode: number,
    public toNode: number | undefined,
    public targetStation: number,
  ) {
    this.updatePos();
  }

  update(dt: number) {
    this.p += (this.speed * dt);
    if (this.p >= 1000) {
      if (this.toNode != undefined) {
        this.p -= 1000;
        this.fromNode = this.toNode;
        this.toNode = this.level.getNextNode(this.toNode);
      } else {
        this.p = 1;
      }
    }

    this.updatePos();
  }

  private updatePos() {
    [this.x, this.y] = this.level.calcCharPos(this);
  }
}
