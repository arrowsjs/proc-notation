proc x -> do {
  x <- returnA -< x
  returnA -< x
}
