proc x -> do {
  y <- z <- returnA -< x
  returnA -< y
}
