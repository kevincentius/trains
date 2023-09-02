import { Direction, Link, LinkData, Node, NodeData } from "./level-data";

export const nodes: NodeData[] = [
  {
    id: 0,
    tx: 1,
    ty: 2,
  },
  {
    id: 1,
    tx: 2,
    ty: 2,
  },
  {
    id: 2,
    tx: 2,
    ty: 1,
  },
  {
    id: 3,
    tx: 3,
    ty: 1,
  },
  {
    id: 4,
    tx: 4,
    ty: 1,
  },
  {
    id: 5,
    tx: 2,
    ty: 3,
  },
  {
    id: 6,
    tx: 3,
    ty: 3,
  },
  {
    id: 7,
    tx: 3,
    ty: 4,
  },
  {
    id: 8,
    tx: 4,
    ty: 4,
  },

  // stations
  {
    id: 9,
    tx: 2.5,
    ty: 2,
    station: 0,
  },
  {
    id: 10,
    tx: 1.5,
    ty: 3,
    station: 1,
  },
  {
    id: 11,
    tx: 3,
    ty: 0.5,
    station: 2,
  },
  {
    id: 12,
    tx: 4,
    ty: 1.5,
    station: 3,
  },
  {
    id: 13,
    tx: 4,
    ty: 3.5,
    station: 4,
  },
];

const left = Direction.LEFT;
const right = Direction.RIGHT;
const down = Direction.DOWN;
const up = Direction.UP;

export const links: LinkData[] = [
  {
    from: 0,
    to: 1,
    direction: right,
  },
  {
    from: 1,
    to: 2,
    direction: up,
  },
  {
    from: 1,
    to: 9,
    direction: right,
  },
  {
    from: 1,
    to: 5,
    direction: down,
  },
  {
    from: 2,
    to: 3,
    direction: right,
  },
  {
    from: 3,
    to: 4,
    direction: right,
  },
  {
    from: 3,
    to: 11,
    direction: up,
  },
  {
    from: 4,
    to: 12,
    direction: down,
  },
  {
    from: 5,
    to: 6,
    direction: right,
  },
  {
    from: 5,
    to: 10,
    direction: left,
  },
  {
    from: 6,
    to: 7,
    direction: down,
  },
  {
    from: 7,
    to: 8,
    direction: right,
  },
  {
    from: 8,
    to: 13,
    direction: up,
  },
];
