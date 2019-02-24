// _benchmarkStart(true);
//_setTypecheck(false);

function initSort() {
    /* @arrow :: _ ~> (Number, Bool, Number) */
    return [NUM_ITEMS, false, 0];
}

function shuffle(i) {
    /* @arrow :: Number ~> <loop: Number, halt: _> */
    let j = Math.floor(Math.random() * (i + 1));

    $('#sort-div').children().eq(NUM_ITEMS - i - 1).addClass('swapping');
    $('#sort-div').children().eq(NUM_ITEMS - j - 1).addClass('swapping');

    return i > 1 ? Arrow.loop(i - 1) : Arrow.halt();
}

function sort(i, hasInversion, numSorted) {
    /* @arrow :: (Number, Bool, Number) ~> <loop: (Number, Bool, Number), halt: _> */
    let n1 = $('#sort-div').children().eq(NUM_ITEMS - i);
    let n2 = $('#sort-div').children().eq(NUM_ITEMS - i + 1);
    var inverted = false;

    if (parseInt(n1.css('width')) > parseInt(n2.css('width'))) {
        inverted = true;
        n1.addClass('swapping');
        n2.addClass('swapping');
    } else {
        n1.addClass('looking')
        n2.addClass('looking')
    }

    if (i - 1 > numSorted + 1) {
        return Arrow.loop([i - 1, hasInversion || inverted, numSorted]);
    } else {
        return hasInversion || inverted ? Arrow.loop([NUM_ITEMS, false, numSorted + 1]) : Arrow.halt();
    }
}


function animate(init, main) {
  return init.seq((proc c -> do {
    clear.lift() -< c
    m <- main -< c
    Arrow.id().wait(ANIMATION) -< m
    indent.lift() -< m
    Arrow.id().wait(ANIMATION) -< m
    swap.lift() -< m
    Arrow.id().wait(ANIMATION) -< m
    dedent.lift() -< m
    Arrow.id().wait(ANIMATION) -< m
  }).repeat().seq(clear.lift()));
}


function startWhenPressed(elem, arrow) {
    return new ElemArrow(elem).on('click', Arrow.seq([
        setEnabled(false),
        arrow,
        setEnabled(true)
    ])).forever();
}

const doSort = animate(initSort.lift(), sort.lift());
const doShuffle = animate((NUM_ITEMS - 1).lift(), shuffle.lift());

_benchmarkResultsOrRun(startWhenPressed('#sort', doSort), startWhenPressed('#shuffle', doShuffle));
