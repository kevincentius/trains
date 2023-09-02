
export enum Direction {
  UP, RIGHT, DOWN, LEFT
}

export interface NodeData {
  id: number;
  tx: number;
  ty: number;
  station?: number;
  direction?: Direction;
}

export interface Node {
  id: number;
  x: number;
  y: number;
  station?: number;
  direction?: Direction;
}

export interface LinkData {
  from: number;
  to: number;
  direction: Direction;
}

export interface Link {
  from: number;
  to: number;
  direction: Direction;
  x: number;
  y: number;
  length: number;
  radians: number;
}
