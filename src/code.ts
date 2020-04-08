// ✅ 1. get all frame names 
// ✅ 2. build Map

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

interface FrameKey {
  name: string;
  id: string;
}

const map = new WeakMap<FrameKey, SceneNode>();

const createMapRecursive = (root: readonly SceneNode[], map: WeakMap<FrameKey, SceneNode>): void => {
  root.forEach((node: SceneNode) => {
    map.set({name: node.name, id: node.id}, node);
    if ('children' in node) {
      createMapRecursive(node.children, map);
    }
  });
};

createMapRecursive(figma.currentPage.children, map);
