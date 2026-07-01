from PIL import Image
import os

b = r"C:\Users\maddo\Desktop\work\stack-website\public\assets\SPONSOR LOGO"
im = Image.open(os.path.join(b, "PNTRSW_Sponsor 1.png")).convert("RGBA")
w, h = im.size

for start in [1030, 1050, 1100, 1150, 1160, 1163]:
    im.crop((start, 0, w, h)).save(os.path.join(b, f"test-right-{start}.png"))

left = im.crop((0, 0, 480, h))
right = im.crop((1163, 0, w, h))
out = Image.new("RGBA", (left.size[0] + 48 + right.size[0], h), (0, 0, 0, 0))
out.paste(left, (0, 0), left)
out.paste(right, (left.size[0] + 48, 0), right)
out.save(os.path.join(b, "PNTRSW_Sponsor 1 no-stack.png"))
print("s1", out.size)

# Sponsor 2 same layout
im2 = Image.open(os.path.join(b, "PNTRSW_Sponsor 2.png")).convert("RGBA")
left2 = im2.crop((0, 0, 480, im2.size[1]))
right2 = im2.crop((1163, 0, im2.size[0], im2.size[1]))
out2 = Image.new("RGBA", (left2.size[0] + 48 + right2.size[0], im2.size[1]), (0, 0, 0, 0))
out2.paste(left2, (0, 0), left2)
out2.paste(right2, (left2.size[0] + 48, 0), right2)
out2.save(os.path.join(b, "PNTRSW_Sponsor 2 no-stack.png"))
print("s2", out2.size)

# Sponsor 4: remove segment 1169-1386 (index 5 in logos list) - that's STACK between Goethe and Stimulant
s4 = Image.open(os.path.join(b, "PNTRSW_Sponsor 4.png")).convert("RGBA")


def stitch_ranges(im, ranges, pad=14):
    h = im.size[1]
    parts = [im.crop((a, 0, b, h)) for a, b in ranges]
    ow = sum(p.size[0] for p in parts) + pad * (len(parts) - 1)
    out = Image.new("RGBA", (ow, h), (0, 0, 0, 0))
    x = 0
    for i, p in enumerate(parts):
        out.paste(p, (x, 0), p)
        x += p.size[0] + (pad if i < len(parts) - 1 else 0)
    return out


# Manual logo ranges from inspection
s4_ranges = [
    (0, 72),
    (111, 547),
    (605, 826),
    (867, 1112),
    (1443, 1647),
    (1709, 1799),
]
s4_out = stitch_ranges(s4, s4_ranges)
s4_out.save(os.path.join(b, "PNTRSW_Sponsor 4 no-stack.png"))
print("s4", s4_out.size)
