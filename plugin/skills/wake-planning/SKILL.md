---
name: wake-planning
description: Plan this repository's Wake roadmap as milestones and phases with its planning method (OpenSpec, Spec Kit or ODD). Use when the user asks for a roadmap, a new feature or change, or when a milestone's tasks are all done.
---
<!-- Managed by wake connect: `wake connect claude-code` updates this file, `wake disconnect claude-code` removes it. -->

# Planning with Wake

The plan lives in the repository, written with its planning method: each phase holds tasks,
and an optional milestones file groups phases into milestones. Wake only reads these files:
`wake sync` sends them one way and the web app never edits milestones. To change the plan,
edit the files and run `wake sync`.

## The repository's planning method

Read the method from `plan` in `.wake/config.json` (no `plan` means OpenSpec), or from the
`Plan method:` line of `wake doctor`. Then use its files:

| Method | A phase | Its tasks | The milestones file | Plan a new phase |
|--------|---------|-----------|---------------------|------------------|
| OpenSpec (`openspec`) | a change | `openspec/changes/<change>/tasks.md` | `openspec/milestones.yaml` | `/opsx:propose` (`/opsx-propose` in OpenCode and Pi) |
| Spec Kit (`spec-kit`) | a feature | `specs/<feature>/tasks.md` | `specs/milestones.yaml` | `/speckit.specify`, then `/speckit.plan`, then `/speckit.tasks` |
| ODD (`odd`) | a feature document | the `## Tasks` section of `odd/tasks/<feature>.md` | `odd/milestones.yaml` | a new `odd/tasks/<feature>.md` with `## Specs`, `## Tasks` and `## Log` |

Wake writes `wake:` ids only into OpenSpec `tasks.md` files; it never writes into Spec Kit
or ODD files.

## The milestones file

```yaml
milestones:
  - id: mvp            # a-z, 0-9, - and _; up to 64 characters
    name: MVP          # up to 200 characters
    goal: One person plans and tracks a project end to end.  # one line, up to 500
    version: v1.0.0    # optional target version tag
    changes:           # optional phase names
      - repo-sync
      - web-gantt
  - id: teams
    name: Teams
    goal: Several people share a workspace.
```

- List milestones in delivery order, at most 100. Every key is one of `id`, `name`, `goal`,
  `version` and `changes`.
- `changes` lists phase names whatever the method: OpenSpec change directories, Spec Kit
  feature directories (`001-user-auth`) or ODD document names without `.md` (`login`).
- An archived OpenSpec change keeps its name: `repo-sync` still names
  `archive/2026-10-17-repo-sync`; the dated name works too.
- A phase listed in no milestone is Unplanned. Leave it out of the file; it needs nothing else.

## Creating a roadmap

1. For a single feature or a first slice, ask nothing: plan the phase with the method and
   skip the milestones file.
2. When the scope goes beyond a first slice ("an MVP, and later..."), propose milestones (id,
   name, a one-line `goal`, an optional target `version`, `changes`) and confirm them with the
   user before you write the milestones file.
3. Detail only the current milestone into phases. Later milestones hold only their `goal`;
   never invent phases for them.
4. `mcp__wake__plan_roadmap` proposes provisional phases and tasks for your branch; it never
   sets milestones. Membership comes only from the milestones file.

## Adding a phase

- Put a new phase in the open milestone (the first one not finished) when it fits that
  milestone's `goal`, without asking.
- Ask the user only when it does not fit that goal or would delay that milestone; offer a
  later milestone or Unplanned.
- Create the phase before you list it under `changes`: its change directory, feature
  directory or document (one without tasks yet is fine).
- Milestone definitions reach Wake only from the default branch. On a feature branch, list
  your phase under an existing milestone and it shows there at once; a milestone defined on
  the branch shows after the merge and the default branch's next `wake sync`.

## When a milestone is done

1. When every task of the open milestone is done, suggest tagging its target `version`
   (`git tag -a v1.0.0 -m "v1.0.0"`, then `wake sync`); with the tag, Wake shows the
   milestone delivered.
2. Move to the next milestone and detail it into phases now, not before.

## When `wake sync` refuses the file

Errors read `<milestones file>:<line>: <message>`, such as
`openspec/milestones.yaml:4: <message>`: a listed phase that does not exist (no directory
under `openspec/changes/` or its `archive/`, no feature directory under `specs/`, no document
under `odd/tasks/`), a milestone id or phase listed twice, an invalid `version`
(`v<major>.<minor>.<patch>`, optional `-prerelease`), an unknown key, a missing or too long
field, or a goal with a line break. Nothing is sent until the file is valid: fix the named
line and run `wake sync` again.
