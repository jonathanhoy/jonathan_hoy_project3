const app = {};

app.columns = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: []
}
app.nextTurn = ['red'];

// CLICK ON COLUMN TO ADD PIECE
app.addPiece = function() {
  $('.column').on('click', function () {
    const index = $(this).data("column");
    const selectedColumn = app.columns[`${index}`];
    if (selectedColumn.length === 6) {
      alert('Invalid move!');
    } else if (selectedColumn.length < 6) {
      const color = app.nextTurn[app.nextTurn.length - 1];
      const cellNum = selectedColumn.length + 1;
      $(`.column-${index} .cell-${cellNum}`).addClass(`${color}`);
      selectedColumn.push(`${color}`);
      app.changeTurn();

      // app.winCondition();



      const counter = Object.values(app.columns);
      const x = $(this).data("array");
      const y = cellNum - 1;

      // VERTICAL WIN CONDITION
      if (counter[x].length > 1 && counter[x][y] === counter[x][y - 1] && counter[x][y - 1] === counter[x][y - 2] && counter[x][y - 2] === counter[x][y - 3]) {
        console.log('VERTICAL WINNER');
      }

      // HORIZONTAL WIN CONDITION
      if ((counter[x][y] === counter[x + 1][y] && counter[x + 1][y] === counter[x + 2][y] && counter[x + 2][y] === counter[x + 3][y]) || 
        (counter[x - 1][y] === counter[x][y] && counter[x][y] === counter[x + 1][y] && counter[x + 1][y] === counter[x + 2][y]) || 
        (counter[x - 2][y] === counter[x - 1][y] && counter[x - 1][y] === counter[x][y] && counter[x][y] === counter[x + 1][y]) ||
        (counter[x - 3][y] === counter[x - 2][y] && counter[x - 2][y] === counter[x - 1][y] && counter[x - 1][y] === counter[x][y])) {
        console.log('HORIZONTAL WINNER');
      }

    }
  });
}

// CHECK WHOSE TURN AND UPDATE TURN ORDER
app.changeTurn = function() {
  const currentColor = app.nextTurn[app.nextTurn.length - 1];
  if (currentColor === 'red') {
    app.nextTurn.push('yellow');
    $('.turn-indicator').text(`Yellow`);
  } else if (currentColor === 'yellow') {
    app.nextTurn.push('red');
    $('.turn-indicator').text(`Red`);
  }
};

app.winCondition = function() {
  // const counter = Object.values(app.columns);
  // let i = cellNum - 1;
  // const j = $(this).data("array");
  // if (counter[j].length > 1 && counter[j][i] === counter[j][i - 1] && counter[j][i - 1] === counter[j][i - 2] && counter[j][i - 2] === counter[j][i - 3]) {
  //   alert('winner');
  // }
}

app.init = function() {
  app.addPiece();
}

// DOCUMENT READY
$(function() {
  app.init();
})