import json
import re
import urllib.request
from pathlib import Path

URLS = [
    "https://www.elekhlekha.xyz/elekhlekha-press-kit-3310d3757a4a4387adcbd60c5f83750a",
    "https://3310d375-7a4a-4387-adcb-d60c5f83750a.notion.site/elekhlekha-press-kit-3310d3757a4a4387adcbd60c5f83750a",
    "https://www.culturehub.org/elekhlekha",
]

for url in URLS:
    print("\n===", url)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
    except Exception as exc:
        print("failed", exc)
        continue

    print("len", len(html), "geoff", "geoff" in html.lower())
    imgs = re.findall(r"https?://[^\"'\s<>]+", html)
    img_candidates = [
        i
        for i in imgs
        if any(
            token in i.lower()
            for token in [
                "geoff",
                "elekhlekha",
                "prod-files",
                "notion-static",
                "images.squarespace",
                "cloudfront",
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
            ]
        )
    ]
    for img in dict.fromkeys(img_candidates):
        print("img", img[:200])

    if "geoff" in html.lower():
        idx = html.lower().find("geoff")
        print("context", re.sub(r"\s+", " ", html[max(0, idx - 250) : idx + 350]))

# Try Notion recordMap in HTML
html_path = Path(".tmp-elekhlekha.html")
if html_path.exists():
    html = html_path.read_text(encoding="utf-8", errors="ignore")
    for pattern in [
        r"window\.__INITIAL_STATE__\s*=\s*(\{.*?\});",
        r"recordMap.*?(\{.*?\})\s*;\s*</script>",
        r"\"signedUrls\"\s*:\s*(\{.*?\})",
    ]:
        m = re.search(pattern, html, re.S)
        if m:
            print("\nfound pattern", pattern[:40], "len", len(m.group(1)))

page_id = "3310d375-7a4a-4387-adcb-d60c5f83750a"
payloads = [
    {
        "page": {"id": page_id},
        "limit": 100,
        "cursor": {"stack": []},
        "chunkNumber": 0,
        "verticalColumns": False,
    },
    {
        "pageId": page_id,
        "limit": 100,
        "cursor": {"stack": []},
        "chunkNumber": 0,
        "verticalColumns": False,
    },
]

for api in [
    "https://www.elekhlekha.xyz/api/v3/loadPageChunk",
    "https://3310d375-7a4a-4387-adcb-d60c5f83750a.notion.site/api/v3/loadPageChunk",
]:
    for payload in payloads:
        try:
            req = urllib.request.Request(
                api,
                data=json.dumps(payload).encode(),
                headers={
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "*/*",
                },
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read().decode("utf-8", errors="ignore")
            print("\napi ok", api, "payload keys", list(payload.keys()), "len", len(data))
            if "geoff" in data.lower() or "elekhlekha" in data.lower():
                Path(".tmp-elekhlekha-api.json").write_text(data, encoding="utf-8")
                print(data[:4000])
        except Exception as exc:
            print("api fail", api, list(payload.keys()), exc)
