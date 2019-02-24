proc x -> do {
  do {
    w <- returnA -< x
    returnA -< w
  }
  do {
    w <- returnA -< x
    returnA -< w
  }
}
