# Contribution

## Get started

- clone project
- install dependencies ```npm i```
- install portable kanban plugin for vscode. Run in command palete
```bash
ext install portable-kanban
```

## Development

- Run dev server with watch mode

```bash
npm run dev
```

- Run unit test with watch mode

```bash
npm run test:watch
```

- Run linter

```bash
npm run lint
```

## Publishing plugin

0. Config GITHUB_TOKEN in .env

see [release-it doc](https://github.com/release-it/release-it#github-releases)

1. Run automated release

```bash
npm run release
```

2. Publish plugin with figma

see [figma doc](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community)

## Environment

- NodeJS minimal version 21.6.2
