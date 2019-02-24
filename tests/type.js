proc x -> do {
  a : ?a <- f -< x
  b : [a] <- f -< x
  c : a <- f -< x
  d : (a,b) <- f -< x
  e : {left: a} <- f -< x
  f : {left: a, right:b} <- f -< x
  g : <left: a> <- f -< x
  h : <left: a, right:b> <- f -< x
  i : int + int <- f -< x
  returnA -< h
}
