# Founder Golf Club

The website for Founder Golf Club: plain HTML and CSS, with no build step.

## What's where

| Page | File |
| --- | --- |
| Home | `index.html` |
| What | `what/index.html` |
| Who | `who/index.html` |
| How, house rules and privacy | `how/index.html` |
| Colours, fonts and layout | `styles.css` |
| Photos | `images/` |
| Fonts | `fonts/` |

To change the text, edit the page's HTML file. To change the main colours, edit the `:root` block at the top of `styles.css`.

## Preview on your computer

From this folder, run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Links start with `/`, so opening the HTML files directly won't work.

## Publishing

Vercel publishes the site automatically from the `main` branch. On Vercel, the framework preset is "Other", with no build command.

## Fonts

Bricolage Grotesque, Instrument Sans and DM Mono are served from this repository, so visitors' browsers don't contact Google Fonts. All three are licensed under the SIL Open Font License.
