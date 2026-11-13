# Founder Golf Club

The website for Founder Golf Club: plain HTML and CSS, with no build step.

## What's where

| Part | File |
| --- | --- |
| Home: one page with every section (why join, who, how it works, etiquette, FAQ) | `index.html` |
| Contact page, with the email address and the organisers | `contact/index.html` |
| Privacy policy | `privacy/index.html` |
| Colours, fonts and layout | `styles.css` |
| Phone menu and menu highlighting | `script.js` |
| Photos, the hero's contour lines, and the link preview image | `images/` |
| Fonts | `fonts/` |

To change the text, edit the HTML file. Each section of the home page starts with a `<section>` line that names it, for example `id="faq"`. To change the main colours, edit the `:root` block at the top of `styles.css`.

`images/og-share.jpg` is the picture that shows when someone shares the site on WhatsApp or LinkedIn.

## Preview on your computer

From this folder, run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Links start with `/`, so opening the HTML files directly won't work.

## Publishing

Vercel publishes the site automatically from the `main` branch. On Vercel, the framework preset is "Other", with no build command.

## Fonts

Familjen Grotesk, Instrument Sans and DM Mono are served from this repository, so visitors' browsers don't contact Google Fonts. All three are licensed under the SIL Open Font License.
