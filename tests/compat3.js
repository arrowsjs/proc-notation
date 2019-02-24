function proc(f) { return f.toString(); }
let p = proc(proc x -> arr(x => x) -< x);

