// <reference types="../node_modules/@figma/plugin-typings" />

import { describe, expect, test } from 'vitest';

import { createMapRecursive } from '../src/code';

describe('createMapRecursive', () => {
  test('should correctly populate the map with nodes', () => {
    const map = new Map<string, SceneNode>();
    const nodes = [
      { name: 'node1', id: '1', children: [{ name: 'child1', id: '2' }] },
      { name: 'node2', id: '3' },
    ] as SceneNode[];

    createMapRecursive(nodes, map);

    expect(map.size).toBe(3);
  });

  test('should handle nodes without children', () => {
    const map = new Map<string, SceneNode>();
    const nodes: SceneNode[] = [
      { name: 'node1', id: '1' },
      { name: 'node2', id: '2' }
    ] as SceneNode[];

    createMapRecursive(nodes, map);

    expect(map.size).toBe(2);
  });
});
