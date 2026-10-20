---
description: Propose the next Wake task and claim it once you confirm
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Next Wake task

Pick the task this session works on next, following the `wake` skill.

1. Call `mcp__wake__list_available_tasks` with `workspaceId` and `projectId` from
   `.wake/config.json`. It lists only the tasks free now. Never propose a task that
   another session holds, even when the user asks for it.
2. Propose one task: prefer the open milestone (`openspec/milestones.yaml`), and among its
   tasks the ones whose dependencies are done, in plan order. Say in one or two lines why it
   comes next, and name one alternative when there is one.
3. Ask the user to confirm it. Only after they confirm, call `mcp__wake__claim_task` with your
   session id. On `task_already_claimed`, say so and propose another task.
4. When no task is available, say so, name the tasks other sessions hold, and suggest planning
   new work with `/wake:plan`.
