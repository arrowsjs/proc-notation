proc x -> do {
  y <- returnA -< x;
  returnA -< 0
};
