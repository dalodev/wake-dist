---
description: Verify, attach evidence and complete the Wake task this session holds
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Finish the Wake task

Finish the task this session holds, following the `wake` skill.

1. Find the task you claimed in this session. If this session holds no task, say so, suggest
   `/wake:next`, and stop.
2. Call `mcp__wake__report_progress` with stage `verifying`, then run the checks this repository
   uses (its `AGENTS.md`, `README.md` or CI workflows name them: tests, lint, typecheck,
   build). If a check fails, stop: report the failure and do not complete the task.
3. Attach evidence that fits the change with `wake evidence <file|-> --task <taskId> --session
   <sessionId>`:
   - behavior: the test output;
   - anything visible: screenshots at desktop and phone width (for example 1440 and 390 px);
   - a CLI change: the command's output.
4. Call `mcp__wake__complete_task` with a `verification` that says what you checked and the
   `commits` that hold the work.
