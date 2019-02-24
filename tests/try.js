proc x ->
  try
    returnA -< x
  catch (e)
    returnA -< x
