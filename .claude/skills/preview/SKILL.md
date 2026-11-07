---
name: preview
description: Publish the site as it is on the current branch to a private preview link the person can share for feedback, without pushing or going live. Use when the person types /preview or asks for a preview link, a link to share, or to show changes to someone before publishing.
---

# Publish a private preview link

The person wants a link to show their changes to someone, without touching the live site. Do not push, merge or commit anything for this.

1. **Check the branch.** Run `git branch --show-current`. If it is `main`, say the preview will show the live version and ask whether they meant to preview a work branch.
2. **Check for unsaved work.** The preview shows the files as they are in the folder now, including changes that are not committed. Mention this in one line if `git status --short` shows changes.
3. **Make the preview copy.** Run, from the project folder:
   ```
   python3 .claude/skills/preview/make_preview.py . "<scratchpad>/fgc-preview" "Founder Golf Club preview"
   ```
   Use your scratchpad directory for `<scratchpad>`. The script copies the site, fixes the links so they work inside the preview, and prints the main page and the map of other files.
4. **Publish it to the one preview link.** There is always exactly one preview link per person, whatever the branch. Each `/preview` overwrites it.
   - Find the link: if you published the preview earlier in this conversation, use that URL. Otherwise list the person's artifacts (`action: "list"`, `limit: 200`) and look for the title "Founder Golf Club preview". If there is more than one, use the most recently updated.
   - If you found it and have not read or published it in this conversation, read it first (`action: "read"`).
   - Publish with the Artifact tool: `url` is the link you found, `file_path` is the printed `page`, `root` is the output folder, `files` is the printed `files` map with paths relative to `root`, and `description` is "Preview of the Founder Golf Club website, from the <branch> branch." Leave out `icon` when updating.
   - Only if no preview link exists yet: publish without `url`, with `icon` set to `flag`.
   - Never create a second preview link when one exists.
5. **Tell the person**, in plain language:
   - the link
   - that only they can open it until they share it from the link's **Share** menu
   - which branch it now shows, and that it is a copy for feedback: the live site has not changed
   - to ask for `/preview` again after more edits, and the same link will update
