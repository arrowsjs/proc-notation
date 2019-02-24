proc x -> do {
  y: Int <- returnA -< x
  returnA -< y
}

