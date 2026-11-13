"""Make a shareable copy of the site for a private preview link.

Usage: python3 make_preview.py <site folder> <output folder> [preview name]

Copies the site's pages, styles, fonts and images into the output folder and
rewrites links that start with "/" so they work without a web server
("/styles.css" becomes "../styles.css", "/how/" becomes "../how/index.html").
The site's own files are not changed. Prints a JSON map of the files to
publish next to the main page (index.html).
"""

import json
import os
import posixpath
import re
import shutil
import sys

SKIP_DIRS = {".git", ".claude", ".vercel", "node_modules"}
KEEP_EXT = {".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg",
            ".gif", ".ico", ".woff2", ".woff", ".mp4", ".webm"}

HTML_LINK = re.compile(r'(\b(?:href|src|poster)=")(/[^"]*)(")')
CSS_URL = re.compile(r'(url\(\s*["\']?)(/[^"\')]*)(["\']?\s*\))')


def relative(target, from_file):
    """Turn a root link like "/how/#privacy" into one relative to from_file."""
    if target.startswith("//"):
        return target  # protocol-relative external link, leave it alone
    path, sep, frag = target.partition("#")
    path, qsep, query = path.partition("?")
    if path.endswith("/"):
        path += "index.html"
    rel = posixpath.relpath(path.lstrip("/") or "index.html",
                            posixpath.dirname(from_file) or ".")
    return rel + (qsep + query if qsep else "") + (sep + frag if sep else "")


def main():
    site, out = sys.argv[1], sys.argv[2]
    if os.path.exists(out):
        shutil.rmtree(out)
    files = []
    for root, dirs, names in os.walk(site):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for name in names:
            if os.path.splitext(name)[1].lower() not in KEEP_EXT:
                continue
            src = os.path.join(root, name)
            rel = os.path.relpath(src, site).replace(os.sep, "/")
            dst = os.path.join(out, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if rel.endswith(".html"):
                text = open(src, encoding="utf-8").read()
                text = HTML_LINK.sub(lambda m: m[1] + relative(m[2], rel) + m[3], text)
                open(dst, "w", encoding="utf-8").write(text)
            elif rel.endswith(".css"):
                text = open(src, encoding="utf-8").read()
                text = CSS_URL.sub(lambda m: m[1] + relative(m[2], rel) + m[3], text)
                open(dst, "w", encoding="utf-8").write(text)
            else:
                shutil.copy2(src, dst)
            files.append(rel)
    if "index.html" not in files:
        sys.exit("No index.html found in " + site)
    if len(sys.argv) > 3:
        # Give the preview its own name, so the one preview link is easy to
        # find in the list of published links.
        home = os.path.join(out, "index.html")
        text = open(home, encoding="utf-8").read()
        text = re.sub(r"<title>.*?</title>", "<title>" + sys.argv[3] + "</title>", text, count=1)
        open(home, "w", encoding="utf-8").write(text)
    supporting = {f: os.path.join(out, f) for f in sorted(files) if f != "index.html"}
    print(json.dumps({"page": os.path.join(out, "index.html"), "files": supporting}, indent=2))


if __name__ == "__main__":
    main()
