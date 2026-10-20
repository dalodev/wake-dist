---
description: Plan an idea as a Wake change, without writing code
argument-hint: <idea>
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Plan with Wake

Plan this idea as Wake work: $ARGUMENTS

- If the idea is empty, ask the user what to plan and stop.
- Follow the `wake-planning` skill: plan with this repository's planning method (`plan` in
  `.wake/config.json` or `wake doctor` names it) and put the phase in its milestones file.
- Write no code. This command only plans; implementing comes later, task by task.
- Show the user the planned phase (what the method writes for it, its tasks, and the milestone
  it belongs to) and revise it until they accept it.
- Only after the user accepts it, run `wake sync` so Wake shows the new tasks. Then suggest
  `/wake:next` to pick the first one.
