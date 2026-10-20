---
description: Release the open milestone with this repository's own process
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Release the milestone

Release the open milestone with this repository's own release process. Never invent a process:
every step you run comes from the repository's files.

1. Call `mcp__wake__get_project` and check that the open milestone has no unfinished task. If it
   has any, list them and stop.
2. Find the release process. Read the workflows triggered by tags or releases in
   `.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml` and `bitbucket-pipelines.yml`;
   the package scripts (`release`, changesets, semantic-release); and the release docs:
   `RELEASING.md`, `CONTRIBUTING.md`, `README.md` and `AGENTS.md`.
3. Show the user the steps you found, quoting the file each one comes from.
   Ask before every step that pushes, tags or publishes, and run it only after they confirm.
4. If you find no release process, ask the user how they release and do nothing else.
5. Once the version tag exists, run `wake sync` so Wake's Versions view shows the release.
