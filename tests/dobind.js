proc x -> do {
  y <- returnA -< x
  returnA -< y
}
