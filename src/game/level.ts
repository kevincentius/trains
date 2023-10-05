
import { Subject } from 'rxjs';
import { Char } from './char';
import { Link, LinkData, Node, NodeData } from './level-data';
import { Spawner } from './spawner';
import { Switch } from './switch';

export class Level {
  gridSize = 120;

  gameOverSubject = new Subject<void>();
  
  nodes: Node[] = this.nodeDatas.map(node => {
    return {
      ...node,
      x: this.gridSize * node.tx,
      y: this.gridSize * node.ty,
    };
  });
  nodeMap = new Map<number, Node>(
    this.nodes.map(node => [ node.id, node ])
  );

  links: Link[] = this.linkDatas.map(link => {
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

  spawner = new Spawner(this);

  stations = this.nodes.filter(node => node.station != undefined).length;

  lives = 3;
  score = 0;

  constructor(
    private nodeDatas: NodeData[],
    private linkDatas: LinkData[],
  ) {
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
    
    this.nodes
      .filter(node => (this.linkMap.get(node.id)?.length ?? 0) > 1)
      .sort((a, b) => a.id - b.id)
      .forEach(node => node.switch = {
        nodeId: node.id,
        dirs: this.linkMap.get(node.id)!.map(link => link.direction).sort(),
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
      return links.find(link => link.direction == node.direction)!.to;
    }
  }

  tick(dt: number) {
    this.spawner.tick(dt);

    this.chars = this.chars.filter(char => char.update(dt));
  }

  spawnChar(station: number) {
    this.chars.push(new Char(this, 0, this.getNextNode(0), station));
  }
  
  calcCharPos(char: Char) {
    const from = this.nodeMap.get(char.fromNode)!;
    const to = char.toNode == undefined ? from : this.nodeMap.get(char.toNode)!;
    return [
      (char.p / 1000) * to.x + (1 - char.p / 1000) * from.x,
      (char.p / 1000) * to.y + (1 - char.p / 1000) * from.y,
    ];
  }

  acceptStation(targetStation: number, nodeId: number) {
    if (this.nodeMap.get(nodeId)!.station == targetStation) {
      this.score += 1;
    } else {
      this.lives--;

      if (this.lives <= 0) {
        this.gameOverSubject.next();
      }
    }
  }
}
