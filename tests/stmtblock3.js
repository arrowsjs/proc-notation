proc x -> do {
  y <- returnA -< x
  { var w = x;
    return y;
  };
}
