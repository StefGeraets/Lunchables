---
title: Tips & tricks
type: 'content'
order: 50
---

- `/compact` — summarizes the conversation history to free up context window space. Use it when a long session starts to slow down or drift.
- `/btw` — pass Claude a side note without triggering it to act. Useful for adding context mid-task: `/btw the staging db is read-only`
- `claude --resume` — pick up a previous conversation exactly where you left it. Claude restores the full context, including files read and decisions made.
- Just ask — Claude can rebase, commit, and push for you. No need to leave the conversation.
- `Ctrl+E` — before submitting a prompt, checks the risk level of the operation Claude is about to perform. Useful for catching destructive actions before they run.
- `!ls` — Bang operators run commands and return the output to Claude.
- Plugins — Claude can be extended with plugins. A notable one is "Learning mode": transform your Claude Code sessions into interactive learning experiences
- Other options exist — Claude Code is the official CLI, opencode is a community TUI alternative, Cursor is an AI first IDE. Since they all pick up `AGENTS.md`, switching between them is zero effort. Try to find out what you like!
