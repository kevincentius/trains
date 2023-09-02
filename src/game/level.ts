
import { Char } from './char';
import { links, nodes } from './hardcoded-level';
import { Link, Node } from './level-data';

export class Level {
  gridSize = 120;
  
  nodes: Node[] = nodes.map(node => {
    return {
      ...node,
      x: this.gridSize * node.tx,
      y: this.gridSize * node.ty,
    };
  });
  
  nodeMap = new Map<number, Node>(
    this.nodes.map(node => [ node.id, node ])
  );

  links: Link[] = links.map(link => {
    const from = this.nodeMap.get(link.from)!;
    const to = this.nodeMap.get(link.to)!;
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    return {
      ...link,
      x: from.x,
      y: from.y,
      length: Math.sqrt(dx * dx + dy * dy),
      radians: Math.atan2(dy, dx),
    }
  });

  linkMap = new Map<number, Link[]>();

  chars: Char[] = [];

  constructor() {
    this.links.forEach(link => {
      this.linkMap.set(link.from, this.linkMap.get(link.from) ?? []);
      this.linkMap.get(link.from)!.push(link);
    });

    this.nodes.forEach(node => {
      const outLinks = this.linkMap.get(node.id) ?? [];
      if (outLinks.length >= 1) {
        node.direction = outLinks[0].direction;
      }
    });
  }

  getNextNode(fromId: number) {
    const node = this.nodeMap.get(fromId)!;
    const links = this.linkMap.get(fromId)!;

    if (!links) {
      return undefined;
    } else if (links.length == 0) {
      return undefined;
    } else if (links.length == 1) {
      return links[0].to;
    } else {
      console.log(node.direction, node.id, links.find(link => link.direction === node.direction));
      return links.find(link => link.direction == node.direction)!.to;
    }
  }

  tick() {
    this.chars.forEach(char => {
      char.update(250);
    });
  }

  spawnChar() {
    this.chars.push(new Char(this, 0, this.getNextNode(0)));
  }
  
  calcCharPos(char: Char) {
    const from = this.nodeMap.get(char.fromNode)!;
    const to = char.toNode == undefined ? from : this.nodeMap.get(char.toNode)!;
    return [
      (char.p / 1000) * to.x + (1 - char.p / 1000) * from.x,
      (char.p / 1000) * to.y + (1 - char.p / 1000) * from.y,
    ];
  }
}
