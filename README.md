# Wake releases

Published builds of [Wake](https://github.com/dalodev/wake-dist/releases), the AI-first project
management platform that stays connected to your coding agent. This repository holds release
files only; it is written by Wake's release pipeline and accepts no contributions.

## Install

The self-hosted server (Docker with Compose v2):

```sh
curl -fsSL https://github.com/dalodev/wake-dist/releases/latest/download/install.sh | sh
```

The `wake` CLI (Node.js 24 or newer):

```sh
npm install --global https://github.com/dalodev/wake-dist/releases/latest/download/wake-cli.tgz
```

The Claude Code plugin comes from this repository's `marketplace` branch; `wake connect
claude-code` sets it up.
