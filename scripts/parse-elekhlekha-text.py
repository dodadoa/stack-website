import json
from pathlib import Path

data = json.loads(Path("scripts/.tmp-elekhlekha-api.json").read_text(encoding="utf-8"))
blocks = data["recordMap"]["block"]

for block_id, block_entry in blocks.items():
    value = block_entry.get("value", {})
    props = value.get("properties") or {}
    title = props.get("title")
    if not title:
        continue
    plain = "".join(part[0] for part in title if part and part[0])
    if plain.strip():
        print(f"[{value.get('type')}] {plain}")

    # Also print caption if image
    caption = props.get("caption")
    if caption:
        cap = "".join(part[0] for part in caption if part and part[0])
        print("  caption:", cap)

print("\n--- signed urls ---")
print(json.dumps(data["recordMap"].get("signed_urls", {}), indent=2, ensure_ascii=False)[:4000])
