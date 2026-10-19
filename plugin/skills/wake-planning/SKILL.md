---
name: wake-planning
description: Plan this repository's Wake roadmap as milestones in openspec/milestones.yaml and OpenSpec changes. Use when the user asks for a roadmap, a new feature or change, or when a milestone's tasks are all done.
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Planning with Wake

The plan lives in the repository: each OpenSpec change is a phase (its `tasks.md` holds the
tasks), and `openspec/milestones.yaml` groups changes into milestones. Wake only reads these
files: `wake sync` sends them one way and the web app never edits milestones. To change the
plan, edit the files and run `wake sync`.

## The milestones file

```yaml
milestones:
  - id: mvp            # a-z, 0-9, - and _; up to 64 characters
    name: MVP          # up to 200 characters
    goal: One person plans and tracks a project end to end.  # one line, up to 500
    version: v1.0.0    # optional target version tag
    changes:           # optional change names
      - repo-sync
      - web-gantt
  - id: teams
    name: Teams
    goal: Several people share a workspace.
```

- List milestones in delivery order, at most 100. Every key is one of `id`, `name`, `goal`,
  `version` and `changes`.
- An archived change keeps its name: `repo-sync` still names
  `archive/2026-10-17-repo-sync`; the dated name works too.
- A change listed in no milestone is Unplanned. Leave it out of the file; it needs nothing else.

## Creating a roadmap

1. For a single feature or a first slice, ask nothing: write the OpenSpec change and skip the
   milestones file.
2. When the scope goes beyond a first slice ("an MVP, and later..."), propose milestones (id,
   name, a one-line `goal`, an optional target `version`, `changes`) and confirm them with the
   user before you write `openspec/milestones.yaml`.
3. Detail only the current milestone into OpenSpec changes. Later milestones hold only their
   `goal`; never invent changes for them.
4. `mcp__wake__plan_roadmap` proposes provisional phases and tasks for your branch; it never
   sets milestones. Membership comes only from `openspec/milestones.yaml`.

## Adding a change

- Put a new change in the open milestone (the first one not finished) when it fits that
  milestone's `goal`, without asking.
- Ask the user only when it does not fit that goal or would delay that milestone; offer a
  later milestone or Unplanned.
- Create the change directory before you list it under `changes` (one without `tasks.md` yet
  is fine).
- Milestone definitions reach Wake only from the default branch. On a feature branch, list
  your change under an existing milestone and it shows there at once; a milestone defined on
  the branch shows after the merge and the default branch's next `wake sync`.

## When a milestone is done

1. When every task of the open milestone is done, suggest tagging its target `version`
   (`git tag -a v1.0.0 -m "v1.0.0"`, then `wake sync`); with the tag, Wake shows the
   milestone delivered.
2. Move to the next milestone and detail it into OpenSpec changes now, not before.

## When `wake sync` refuses the file

Errors read `openspec/milestones.yaml:<line>: <message>`: a change with no directory under
`openspec/changes/` or its `archive/`, a milestone id or change listed twice, an invalid
`version` (`v<major>.<minor>.<patch>`, optional `-prerelease`), an unknown key, a missing or
too long field, or a goal with a line break. Nothing is sent until the file is valid: fix the
named line and run `wake sync` again.
