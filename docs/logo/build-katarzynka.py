import math
CX, CY = 74, 51.5
RX, RY = 28, 33
XS, YS = (30, 74, 118), (35.5, 67.5)
def inside(x, y):
    if 30 <= x <= 118 and 35.5 <= y <= 67.5: return True
    return any(((x-cx)/RX)**2 + ((y-cy)/RY)**2 <= 1 for cx in XS for cy in YS)
N = 720
outer = []
for i in range(N):
    a = 2*math.pi*i/N; dx, dy = math.cos(a), math.sin(a)
    t = 0
    while inside(CX+dx*(t+0.05), CY+dy*(t+0.05)): t += 0.05
    lo, hi = t, t+0.05
    for _ in range(12):
        m=(lo+hi)/2
        if inside(CX+dx*m, CY+dy*m): lo=m
        else: hi=m
    outer.append((CX+dx*lo, CY+dy*lo))
def dist(px, py):
    return min(math.hypot(px-x, py-y) for x, y in outer)
def offset(d, n=240):
    pts=[]
    for i in range(n):
        a=2*math.pi*i/n; dx,dy=math.cos(a),math.sin(a)
        lo, hi = 0, 80
        for _ in range(22):
            m=(lo+hi)/2
            x,y=CX+dx*m,CY+dy*m
            if inside(x,y) and dist(x,y)>d: lo=m
            else: hi=m
        pts.append((CX+dx*lo, CY+dy*lo))
    return pts
def path(pts):
    return "M" + " ".join(f"{x:.1f} {y:.1f}" for x,y in pts) + "Z"
o = path(outer[::3]); ic = path(offset(5.4))
open(__import__('sys').argv[1],'w').write(f'export const OUTER = "{o}";\nexport const ICING = "{ic}";\n')
print(len(o), len(ic))
