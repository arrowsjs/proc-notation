proc x ->
  try do {
    y <- arr(x => x * 2) -< x
    if (y > 4)
      throwA("bad") -< undefined
    else
      returnA -< y
  } catch (e) do {
    arr(e => console.log("exception", e)) -< e
    returnA -< x
  }

