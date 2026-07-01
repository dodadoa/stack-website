from PIL import Image
import os

b = r"C:\Users\maddo\Desktop\work\stack-website\public\assets\SPONSOR LOGO"
s4 = Image.open(os.path.join(b, "PNTRSW_Sponsor 4.png")).convert("RGBA")
for label, start, end in [("stack", 1169, 1386), ("stim", 1443, 1647), ("goethe", 867, 1112)]:
    s4.crop((start, 0, end, s4.size[1])).save(os.path.join(b, f"test-s4-{label}.png"))
