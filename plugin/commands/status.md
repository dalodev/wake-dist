---
description: Show the Wake tasks held, free and left in the open milestone
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Wake status

Show where this repository's Wake work stands. Change nothing:
do not claim, release or complete any task, and do not report progress.

1. Call `mcp__wake__get_project` with `workspaceId` and `projectId` from `.wake/config.json` for the
   milestones, phases and tasks.
2. Call `mcp__wake__list_available_tasks` for the tasks free now.
3. Answer in a few lines:
   - the tasks this session holds, by your session id;
   - the tasks other sessions hold;
   - the open milestone: tasks done out of its total, and the phases left.

Suggest `/wake:next` to pick a task, or `/wake:done` when this session holds one that
is finished.
