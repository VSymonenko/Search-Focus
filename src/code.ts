/// <reference types="../node_modules/@figma/plugin-typings" />

import { bcrypt } from './share';

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

const map = new Map<string, SceneNode>();

type CreateMap = (root: readonly SceneNode[], _map: Map<string, SceneNode>) => void;

export const createMapRecursive: CreateMap = (root, _map) => {
  root.forEach((node: SceneNode) => {
    const key = bcrypt({name: node.name, id: node.id}) as string;
    _map.set(key, node);
    if ('children' in node) {
      createMapRecursive(node.children, _map);
    }
  });
};

createMapRecursive(figma.currentPage.children, map);

figma.ui.postMessage({type: 'send-list', list: Array.from(map.keys())});

figma.ui.onmessage = (message) => {
  const { type } = message;
  if (type === 'focus') {
    const item = map.get(message.data.key);
    if (item) {
      figma.viewport.scrollAndZoomIntoView([item]);
    }
  }
}