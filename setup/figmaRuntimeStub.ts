/// <reference types="../node_modules/@figma/plugin-typings" />

Object.defineProperties(globalThis, {
  figma: {
    value: {
      clientStorage: {
        getAsync: async () => {},
        setAsync: async () => {},
      },
      createNode: () => {},
      createRectangle: () => {},
      currentPage: {
        children: [],
      },
      showUI: () => {},
      ui: {
        onmessage: () => {},
        postMessage: () => {},
      },
    },
  },
  __html__: {
    value: '',
  },
});