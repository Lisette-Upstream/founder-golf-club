# Instructions for AI agents

This is the website for Founder Golf Club (foundergolfclub.nl). The people working on it are mostly not developers. Follow these rules on every task.

## Talk to the person clearly

- Use plain language. Avoid jargon. If you must use a technical term, explain it in one short sentence.
- Before you change anything, say in a few words what you will change.
- When you finish, say what changed, how to view it, and what is not done yet.
- If a request is unclear, ask one short question before you start.

## Never work on `main`

`main` is the live website. Anything that lands on `main` is published to foundergolfclub.nl within about a minute.

1. Before you start, get the latest version: `git switch main` and `git pull`.
2. Make a new branch for each task, with a short descriptive name, for example `copy/update-who-page` or `design/new-hero`.
3. Commit your work on that branch, with a clear message that describes the change.
4. Let the person check the change in the local preview (see below).
5. Only when the person explicitly asks you to publish: switch to `main`, run `git pull`, merge the branch into `main`, and push `main`. Then tell them the change will be live in about a minute.

This project does not use pull requests. Do not open one.

To share changes for feedback before they go live, publish a private preview link (in Claude: `/preview`). Never push or merge to make a preview.

Never force-push, delete branches, or rewrite history unless the person asks for it and understands what it does.

## How the site works

- Plain HTML and CSS. There is no build step and nothing to install. See `README.md` for which file holds which page.
- To preview locally, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.
- Before you say a change is done, view it in the browser at desktop width and at phone width.

## Keep the site consistent

- Write in British English (behaviour, organisers, colour), in the same friendly but professional tone as the existing pages.
- Use the colours and fonts already defined in `styles.css`. Do not load fonts or scripts from other websites. The site promises visitors' browsers don't contact Google Fonts.
- Give every image a short description in its `alt` text. Keep image files small (use `.webp` or compressed `.jpg`).

## Ask before you change these

- The sign-up form link on the Apply buttons.
- The contact email and the privacy text.
- The house rules.
- Deleting or renaming any file or page.
