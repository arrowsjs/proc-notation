proc x -> do {
  returnA -< 1;
  (| op ( returnA -< 1) 
    (returnB -< 2) 
    (returnC -< 3) |);
}

