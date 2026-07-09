import json
import re
import urllib.request
from pathlib import Path

API = "https://www.elekhlekha.xyz/api/v3/loadPageChunk"
PAGE_ID = "3310d375-7a4a-4387-adcb-d60c5f83750a"
OUT = Path("scripts/.tmp-elekhlekha-api.json")

payload = {
    "page": {"id": PAGE_ID},
    "limit": 100,
    "cursor": {"stack": []},
    "chunkNumber": 0,
    "verticalColumns": False,
}

req = urllib.request.Request(
    API,
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
)
with urllib.request.urlopen(req, timeout=30) as resp:
    data = json.loads(resp.read().decode("utf-8"))

OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print("saved", OUT)

record_map = data.get("recordMap", {})
blocks = record_map.get("block", {})
texts = []
image_urls = []

for block_id, block_entry in blocks.items():
    value = block_entry.get("value", {})
    props = value.get("properties", {})
    title = props.get("title")
    if title:
        plain = "".join(part[0] for part in title if part)
        if plain.strip():
            texts.append(plain.strip())

    for key in ("source", "link"):
        src = value.get(key)
        if isinstance(src, str) and src.startswith("http"):
            image_urls.append(src)

    format_data = value.get("format")
    if isinstance(format_data, dict):
        display = format_data.get("display_source") or format_data.get("page_cover")
        if isinstance(display, str) and display.startswith("http"):
            image_urls.append(display)

signed = record_map.get("signed_urls") or data.get("signedUrls") or {}
if isinstance(signed, dict):
    image_urls.extend(signed.values())

print("\nTEXT BLOCKS:")
for text in texts:
    print("-", text[:500])

print("\nIMAGES:")
for url in dict.fromkeys(image_urls):
    print(url)

geoff = [u for u in image_urls if "geoff" in u.lower()]
print("\nGEOFF", geoff)

# Search entire JSON string for attachment URLs
raw = json.dumps(data, ensure_ascii=False)
for match in re.finditer(r"https://[^\"\\]+", raw):
    url = match.group(0)
    if any(token in url for token in ("amazonaws.com", "notion-static", "elekhlekha", "attachment")):
        print("raw url", url[:250])
