---
name: wake
description: Work on this repository's Wake roadmap without colliding with other agents. Use at the start of a session and whenever you pick, continue, finish or stop working on a task.
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Working with Wake

This repository is connected to a Wake project (`.wake/config.json`). Wake records which
agent session works on which task, so two sessions never build the same thing. Use the
`wake` MCP tools (in Claude Code they appear as `mcp__wake__<tool>`). If they ask you to sign
in, tell the user to run `/mcp` and choose `wake`.

## At the start of a session

- Read the `Wake:` context the session-start hook added: the project, your session id, the
  tasks available now and the tasks other sessions hold.
- Pass that session id as `sessionId`, and `workspaceId` and `projectId` from
  `.wake/config.json`, in every Wake tool call. If the context has no session id, choose a
  short one (lowercase letters, digits, `-` and `_`) and keep it for the whole session.
- If the context says Wake is offline or you are not logged in, tell the user once and work
  normally; do not retry in a loop.

## Before working on a task

1. Pick a task from the context or from `list_available_tasks`.
2. Call `claim_task` for it. Start working only after the claim succeeds.
3. `task_already_claimed` means another session holds the task: never work on it, pick
   another one and tell the user.
4. `stale_requires_confirmation` means its holder stopped answering: ask the user, and only
   after they confirm call `claim_task` again with `confirmTakeover: true`.
5. Tasks listed as claimed by other sessions are off limits, even when the user's request
   touches them; say so and ask how to proceed.

## While working

- A claim lasts 5 minutes unless you ask for more with `leaseSeconds` (30 to 3600). Call
  `heartbeat_task` before it ends, every few minutes while you work.
- Call `report_progress` at meaningful steps with `percent`, `stage` (`working`, `blocked`
  or `verifying`) and a short `note`.
- `claim_not_held` means your lease ended or someone else holds the task: claim it again
  before you continue.

## Proof that it works

Before you call `complete_task`, attach proof that the work works and how it looks:

- For a change someone sees, take screenshots of the screen it produces, in the state the
  task creates, at desktop and at phone width (for example 1440 and 390 px wide).
- For behavior, attach the output of the tests that prove it.
- Upload each file with `wake evidence <file|-> --task <taskId> --session <sessionId>`, for
  example `wake evidence tracking-390.png --task <taskId> --session <sessionId>`, or pipe a
  log: `pnpm test 2>&1 | wake evidence - --task <taskId> --session <sessionId> --title "pnpm
  test" --kind test_report`. Screenshots (PNG, JPEG, WebP, GIF) and text (`.txt`, `.log`,
  standard input) up to 10 MiB are accepted.
- When the `wake` CLI is not available, call `request_evidence_upload` with the file's title,
  kind, content type and size, send the file with an HTTP `PUT` to the returned URL with
  exactly the returned headers, then call `confirm_evidence_upload` with the evidence id.
- Attach links and short text (a CI run, a note) with `attach_evidence`.
- `complete_task` is refused with `evidence_required` while the task has no evidence (an
  upload counts once it is confirmed). Attach the proof and call it again. Only when no
  proof is possible (for example a change with nothing to run or show), pass
  `noEvidenceReason` saying why; Wake records it with your verification.

## Finishing or stopping

- Verify the work first (tests, build, a manual check). Then call `complete_task` with a
  `verification` that says what you checked and the `commits` that hold the work.
- If you stop working on a task without finishing it, call `release_task` so another session
  can take it. When the session ends, Wake releases the claims it still holds.
- To plan new work, propose phases for your branch with `plan_roadmap`; the planning
  method's files stay the source of truth.
- To plan a roadmap, its milestones or a new phase, follow the `wake-planning` skill.
