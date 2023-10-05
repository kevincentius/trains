import { Direction, LinkData, NodeData } from "./level-data";

export class LevelGen {

  nodeByPos = new Map<number, Map<number, NodeData>>();
  nodes: NodeData[] = [];

  links: LinkData[] = [];
  nextStation = 0;

  constructor() {
    this.addNode(0, 2);
    for (let i = 1; i < 3; i++) {
      this.addNodeFrom(i - 1, 1, 0);
    }

    // this.addNodeFrom(2, 0.5, 0, true);
    this.addNodeFrom(2, 0, -1);
    this.addNodeFrom(3, 1, 0);
    this.addNodeFrom(4, 1, 0);
    this.addNodeFrom(5, 1, 0);
    this.addNodeFrom(6, 0, 1);
    this.addNodeFrom(7, 1, 0);
    this.addNodeFrom(5, 0, 1);
    this.addNodeFrom(2, 0, 1);
    this.addNodeFrom(10, 1, 0);
    this.addNodeFrom(11, 1, 0);
    this.addNodeFrom(12, 0, 1);
    this.addNodeFrom(13, 1, 0);
    this.addNodeFrom(14, 1, 0);
    this.addNodeFrom(10, 0, 1);

    this.addNodeFrom(4, 0, -0.5, true);
    this.addNodeFrom(11, 0, -0.5, true);
    this.addNodeFrom(16, 0.5, 0, true);
    this.addNodeFrom(9, 0.5, 0, true);
    this.addNodeFrom(13, -0.5, 0, true);
    this.addNodeFrom(6, 0, -0.5, true);
    this.addNodeFrom(14, 0, -0.5, true);
    this.addNodeFrom(6, 0.5, 0, true);
    this.addNodeFrom(15, 0.5, 0, true);
    this.addNodeFrom(8, 0, 0.5, true);
  }

  private addNodeFrom(from: number, dx: number, dy: number, station?: boolean) {
    const f = this.nodes[from];
    this.addNode(f.tx + dx, f.ty + dy, from, station);
  }

  private addNode(tx: number, ty: number, linkFromNode?: number, station?: boolean) {
    const nodeId = this.nodes.length;
    const node: NodeData = {
      id: nodeId,
      tx,
      ty,
      station: station ? this.nextStation++ : undefined,
    };

    this.nodeByPos.set(tx, this.nodeByPos.get(tx) ?? new Map());
    this.nodeByPos.get(tx)!.set(ty, this.nodeByPos.get(tx)!.get(ty) ?? node);
    this.nodes.push(node);

    if (linkFromNode != undefined) {
      this.addLink(linkFromNode, nodeId);
    }
  }

  private addLink(from: number, to: number) {
    let direction: Direction;
    const dx = this.nodes[to].tx - this.nodes[from].tx;
    const dy = this.nodes[to].ty - this.nodes[from].ty;
    if (Math.abs(dx) >= Math.abs(dy)) {
      direction = dx > 0 ? Direction.RIGHT : Direction.LEFT;
    } else {
      direction = dy > 0 ? Direction.DOWN : Direction.UP;
    }

    this.links.push({
      from,
      to,
      direction: direction,
    });
  }

}
