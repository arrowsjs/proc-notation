proc x -> do {
  returnA -< x
  { var w = x;
    return x;
  };
}
