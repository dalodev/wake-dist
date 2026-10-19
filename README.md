# Wake releases

Published builds of Wake, the AI-first project management platform that stays connected to
your coding agent (Claude Code, OpenCode, Pi). This repository holds release files only: Wake's
release pipeline writes it, and it accepts no issues, pull requests or other contributions.

## Install

The self-hosted server, with Docker and the Compose v2 plugin on Linux or macOS:

```sh
curl -fsSL https://github.com/dalodev/wake-dist/releases/latest/download/install.sh | sh
```

It installs into `~/wake-server` and ends with the address to open; create the first account
there. Options: `sh -s -- --help` (`--dir`, `--port`, `--domain` for HTTPS, ...).

The `wake` CLI, with Node.js 24 or newer:

```sh
npm install --global https://github.com/dalodev/wake-dist/releases/latest/download/wake-cli.tgz
```

## Connect

In the repository you want to track, with the server's address:

```sh
wake setup --agent claude-code --server http://localhost:8080   # or opencode, or pi
```

It signs the CLI in, creates or links the project, and connects your agent; the web app's
setup wizard shows the same command for your server. Commit what it writes. Claude Code gets the `wake` plugin from this repository's `marketplace` branch, which
needs no GitHub account.

## Upgrade

Every part can update itself:

| Part | Automatic | By hand |
|------|-----------|---------|
| Server and web app | `~/wake-server/wake-server auto-upgrade on` upgrades daily (backup first, rollback if unhealthy); off by default | `~/wake-server/wake-server upgrade` |
| `wake` CLI | the next agent session upgrades it in the background when the server recommends a newer CLI; `WAKE_AUTO_UPGRADE=off` turns it off | `wake upgrade` |
| Claude Code plugin | Claude Code updates it from the marketplace after each release | `/plugin` in Claude Code |
| OpenCode and Pi files | the next session after a CLI upgrade refreshes them; commit them | `wake connect opencode` or `wake connect pi` |

Upgrade the server first, then the CLIs. `wake-server upgrade --version vX.Y.Z` and
`wake upgrade --version X.Y.Z` pin a version.

An installation made before v1.4 reads releases from a repository it can no longer reach.
Replace its manager once, then upgrade:

```sh
cd ~/wake-server
curl -fsSL https://github.com/dalodev/wake-dist/releases/latest/download/install.sh -o wake-server
chmod 700 wake-server
./wake-server upgrade
```

A CLI installed before v1.4 upgrades with the `npm install --global` command above.
