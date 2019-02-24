proc ([[x,y],w]) ->
  if (x === 1)
    if (y > 3) returnA -< y
    else returnA -< x
  else
    returnA -< w
