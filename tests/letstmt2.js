proc x -> do {
  w <- do {
    let y = x;
    returnA -< y;
  }
  returnA -< w
}

