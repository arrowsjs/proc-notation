proc x -> do {
  y <- addN(100) -< x;
  returnA -< y;
};

