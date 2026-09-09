#!/usr/bin/env python3
import hashlib, pathlib, sys
root=pathlib.Path("data/embed_chunks/_parts")
out=pathlib.Path("data/embed_chunks")
ok,bad=[],[]
for man in sorted(root.glob("*.manifest")):
    name=man.name.replace(".manifest","")
    lines=man.read_text().splitlines()
    final=[l for l in lines if l.startswith("FINAL:")][0]
    _,exp,elen=final.split(":")
    elen=int(elen)
    parts=[]
    for l in lines:
        if l.startswith("FINAL:"): continue
        i,h,ln=l.split(":")
        p=(root/f"{name}.{int(i):02d}").read_text()
        assert len(p)==int(ln), (name,i,len(p),ln)
        assert hashlib.sha256(p.encode()).hexdigest()==h
        parts.append(p)
    content="".join(parts)
    assert len(content)==elen
    blob=hashlib.sha1(b"blob %d\0"%len(content.encode())+content.encode()).hexdigest()
    if blob!=exp:
        bad.append((name,blob,exp)); continue
    (out/name).write_text(content)
    ok.append(name)
    print("OK", name, blob)
print("OK_COUNT", len(ok))
print("BAD", bad)
sys.exit(1 if bad else 0)
