const figma: Pick<PluginAPI,
  "apiVersion" | "command" | "closePlugin" | "showUI" | "hasMissingFont"
  > = {
  apiVersion: '1.0.0',
  command: '',
  closePlugin: () => {},
  showUI: () => {}, 
  hasMissingFont: false,
  // viewport: ViewportAPI
  // notify(message: string, options?: NotificationOptions): NotificationHandler
  // ui: UIAPI
  // clientStorage: ClientStorageAPI
  // getNodeById(id: string): BaseNode | null
  // getStyleById(id: string): BaseStyle | null
  // root: DocumentNode
  // currentPage: PageNode
  // on(type: "selectionchange" | "currentpagechange" | "close", callback: () => void): void
  // once(type: "selectionchange" | "currentpagechange" | "close", callback: () => void): void
  // off(type: "selectionchange" | "currentpagechange" | "close", callback: () => void): void
  // mixed: unique symbol
  // createRectangle(): RectangleNode
  // createLine(): LineNode
  // createEllipse(): EllipseNode
  // createPolygon(): PolygonNode
  // createStar(): StarNode
  // createVector(): VectorNode
  // createText(): TextNode
  // createFrame(): FrameNode
  // createComponent(): ComponentNode
  // createPage(): PageNode
  // createSlice(): SliceNode
  // createBooleanOperation(): BooleanOperationNode
  // createPaintStyle(): PaintStyle
  // createTextStyle(): TextStyle
  // createEffectStyle(): EffectStyle
  // createGridStyle(): GridStyle
  // getLocalPaintStyles(): PaintStyle[]
  // getLocalTextStyles(): TextStyle[]
  // getLocalEffectStyles(): EffectStyle[]
  // getLocalGridStyles(): GridStyle[]
  // importComponentByKeyAsync(key: string): Promise<ComponentNode>
  // importStyleByKeyAsync(key: string): Promise<BaseStyle>
  // listAvailableFontsAsync(): Promise<Font[]>
  // loadFontAsync(fontName: FontName): Promise<void>
  // createNodeFromSvg(svg: string): FrameNode
  // createImage(data: Uint8Array): Image
  // getImageByHash(hash: string): Image
  // group(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): GroupNode
  // flatten(nodes: ReadonlyArray<BaseNode>, parent?: BaseNode & ChildrenMixin, index?: number): VectorNode
  // union(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode
  // subtract(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode
  // intersect(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode
  // exclude(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode
}
Object.seal(figma);
export default figma;