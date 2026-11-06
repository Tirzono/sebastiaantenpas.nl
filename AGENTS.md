# Agent instructions

## Work through issues

Work on this repository may be split across people and agents: one session
plans and another builds, an agent runs out of usage and a different one picks
up, or someone else takes over a branch. The issue is the shared memory for
that work. Anyone who opens it should be able to continue without asking what
happened before, and without access to any chat or session history.

### When this applies

Use an issue for features, larger code changes, migrations, investigations
and anything likely to span more than one session. Small, self-contained
changes (a typo, a version bump, a one-line fix) can go straight to a pull
request.

### Before starting

1. Look for an existing open issue that covers the work. If there is one,
   read the body, the comments and any linked pull requests and branches
   before doing anything else.
2. If there is none, open one before writing code.
3. Say that you are picking it up: assign yourself, or leave a short comment
   naming the branch you are working on, so two sessions don't do the same
   work.

### What the issue holds

Keep the issue body as the current state of the work, and edit it as things
change rather than only appending comments. A reader should get the full
picture from the body alone. Use these sections, leaving out any that are
empty:

- **Goal**: what should be true when this is done, and why it matters.
- **Context**: background a newcomer needs, such as the relevant parts of the
  code, constraints, and links to docs or related issues.
- **Decisions**: what was decided and why, including options that were
  rejected, so they are not reopened by the next session.
- **Plan**: a task list (`- [ ]`) of the remaining steps, ticked off as they
  land.
- **Status**: where things stand right now, the branch and pull request(s),
  and the very next step.
- **Open questions**: anything waiting on a decision or on someone else.

Use comments for a dated log of notable events: a handover, a dead end and
why it failed, a change of plan. Then update the body to match.

### Keeping it current

Update the issue at every natural stopping point, not just at the end: when
a step lands, when a decision is made, and before you stop, hand over or may
run out of time. Assume every session can end without warning. If the issue
says what to do next and where the work is, nothing is lost.

Pull requests link back with `Closes #<number>` (or `Part of #<number>` when
the issue needs more than one), and are described in terms of the issue.

### What does not belong in an issue

An issue is a summary for the next reader, not a transcript. Write down
conclusions, decisions and next steps; leave out the back-and-forth, long
tool output and pasted chat.

Treat every issue as public, even in a private repository: visibility can
change later, and issues are copied into notifications, emails and other
tools. Never include:

- Secrets of any kind: passwords, tokens, API keys, private keys,
  connection strings, session cookies, or anything that would let someone
  log in. Refer to a secret by where it is stored and what it is called, not
  by its value.
- Personal information: other people's names, email addresses, phone
  numbers, home addresses, account details or anything else that identifies
  a private individual, and personal details about the maintainers beyond
  their public handle.
- Customer, user or financial data, including samples copied from a
  database or an export.
- Unredacted logs, screenshots or error output, which often carry the
  above. Trim them to the lines that matter and scrub them first.
- Details that only help an attacker, such as an unpatched weakness in a
  running system. Describe security problems in general terms, or keep them
  out of the issue tracker altogether.

When in doubt, leave it out and say where the information can be found by
someone who already has access.
