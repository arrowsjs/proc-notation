proc x -> do {
  y <- add1 -< x;
  returnA -< y;
};

