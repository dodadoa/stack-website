from PIL import Image
import os

base = r"C:\Users\maddo\Desktop\work\stack-website\public\assets\SPONSOR LOGO"


def column_density(im: Image.Image, x: int) -> int:
    px = im.convert("RGBA")
    _, h = px.size
    count = 0
    for y in range(h):
        r, g, b, a = px.getpixel((x, y))
        if a > 10 and (r + g + b) > 30:
            count += 1
    return count


def content_segments(im: Image.Image, threshold_ratio: float = 0.05):
    w, h = im.size
    segments = []
    in_seg = False
    start = 0
    for x in range(w):
        dense = column_density(im, x) >= h * threshold_ratio
        if dense and not in_seg:
            start = x
            in_seg = True
        elif not dense and in_seg:
            segments.append((start, x - 1))
            in_seg = False
    if in_seg:
        segments.append((start, w - 1))
    return segments


def merge_segments(segments: list[tuple[int, int]], gap: int = 40) -> list[tuple[int, int]]:
    if not segments:
        return []
    merged = [segments[0]]
    for start, end in segments[1:]:
        prev_start, prev_end = merged[-1]
        if start - prev_end <= gap:
            merged[-1] = (prev_start, end)
        else:
            merged.append((start, end))
    return merged


def stitch(im: Image.Image, keep_ranges: list[tuple[int, int]], padding: int = 24) -> Image.Image:
    h = im.size[1]
    parts = [im.crop((a, 0, b + 1, h)) for a, b in keep_ranges]
    total_w = sum(p.size[0] for p in parts) + padding * (len(parts) - 1)
    out = Image.new("RGBA", (total_w, h), (0, 0, 0, 0))
    x = 0
    for i, part in enumerate(parts):
        out.paste(part, (x, 0), part)
        x += part.size[0] + (padding if i < len(parts) - 1 else 0)
    return out


def main_segments(im: Image.Image) -> list[tuple[int, int]]:
    raw = content_segments(im)
    merged = merge_segments(raw, gap=50)
    # keep only substantial logos (wider than 60px)
    return [seg for seg in merged if seg[1] - seg[0] + 1 >= 60]


s4 = Image.open(os.path.join(base, "PNTRSW_Sponsor 4.png")).convert("RGBA")
segs = main_segments(s4)
print("S4 main segments:")
for i, seg in enumerate(segs):
    print(f"  {i}: {seg[0]}-{seg[1]} width={seg[1]-seg[0]+1}")

# Expected order: emblem, CEA, VML, IMMERTECH, REAL BANGKOK, GOETHE, STACK, STIMULANT, THAI
# Remove index 6 (STACK)
if len(segs) >= 7:
    keep = [seg for i, seg in enumerate(segs) if i != 6]
    s4_out = stitch(s4, keep, padding=16)
    s4_out.save(os.path.join(base, "PNTRSW_Sponsor 4 no-stack.png"))
    print("S4 out:", s4_out.size)
else:
    print("Unexpected segment count")
