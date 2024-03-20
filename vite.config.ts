import * as htmlparser2 from 'htmlparser2';

import { PluginOption, build, defineConfig } from 'vite';
import { readFile, rm } from 'node:fs/promises';

import { ChildNode } from 'domhandler';
import path from 'node:path';
import process from 'node:process';
import render from 'dom-serializer';
import rollup from 'rollup';

const DEFAULT_TARGET = 'index.html';
const DEFAULT_CODE = './src/code.ts';

const isRollupChunk = (value: any): value is rollup.OutputChunk => {
  return value && value.type === 'chunk';
}

const isRollupAsset = (value: any): value is rollup.OutputAsset => {
  return value && value.type === 'asset';
}

const ERROR_MISSING_JS_IN_TEMPLATE = `No script tag found in ${DEFAULT_TARGET}`;

async function buildCode () {
  try {
    await build({
      build: {
        lib: {
          entry: path.resolve(process.cwd(), DEFAULT_CODE),
          name: 'code',
          fileName: 'code',
          formats: ['cjs'],
        },
      }
    });
  } catch (err) {
    throw err;
  }
}

function vitePlugin({ target, code }): PluginOption {
  return {
    name: 'vite-plugin',
    async generateBundle(opts, bundle) {
      const fileId = Array.from(this.getModuleIds())[0];
      if (!fileId.includes(DEFAULT_TARGET)) { return }
      try {
        const parse = htmlparser2.parseDocument;
        const _code = await readFile(fileId, 'utf-8');
        const dom = parse(_code);
        const keyCSS = Object.entries(bundle).find(([key]) => key.endsWith('.css'))?.[0];
        if (!keyCSS) {
          throw new Error(`No CSS found in the bundle`);
        }
        const css = bundle[keyCSS];
        if (isRollupAsset(css)) {
          const sourceCSS = css.source;
          const newCSS = parse(`<style>${sourceCSS}</style>`)?.firstChild;
          if (!newCSS) {
            throw new Error(`Failed to create a new style tag`);
          }
          const firstElement = dom.firstChild as ChildNode;
          htmlparser2.DomUtils.prepend(firstElement, newCSS);
        }
        const keyJS = Object.entries(bundle).find(([key]) => key.endsWith('.js'))?.[0];
        if (!keyJS) {
          throw new Error(ERROR_MISSING_JS_IN_TEMPLATE);
        }
        const js = bundle[keyJS];
        if (isRollupChunk(js)) {
          const child = dom.children.find((child) => child.type === 'script');
          if (!child) {
            throw new Error(ERROR_MISSING_JS_IN_TEMPLATE);
          }
          const newScript = parse(`<script language="javascript">${js.code}</script>`)?.firstChild;
          if (!newScript) {
            throw new Error(`Failed to create a new script tag`);
          }
          htmlparser2.DomUtils.replaceElement(child, newScript);
          const result = render(dom);
          this.emitFile({
            type: 'asset',
            fileName: DEFAULT_TARGET,
            source: result,
          })
        }
      } catch (err) {
        this.error(err);
      }
      await buildCode();
    },
    async closeBundle() {
      await rm(path.resolve(process.cwd(), 'dist/assets'), { recursive: true, force: true });
    },
    transformIndexHtml(html) {
      return html.concat(`\n<script type="module" src="./src/playground.ts"></script>`);
    },
  }
}

export default defineConfig({
  publicDir: false,
  plugins: [
    vitePlugin({
      target: DEFAULT_TARGET,
      code: DEFAULT_CODE,
    }),
  ],
});