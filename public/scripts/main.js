(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};

app.columns = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [], // h, i, and j are extra columns used solely for checkWin functions.
  i: [],
  j: []
};
app.nextTurn = ['red'];
app.chaosColors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

app.addPiece = function () {
  $('.column').on('click', function () {
    var index = $(this).data("column");
    var selectedColumn = app.columns["" + index];
    if (selectedColumn.length === 6) {
      swal({
        title: 'Invalid move! 🙅🏻‍♂️'
      });
    } else if (selectedColumn.length < 6) {
      var color = app.nextTurn[app.nextTurn.length - 1];
      var cellNum = selectedColumn.length + 1;
      var i = Object.values(app.columns);
      var x = $(this).data("array");
      var y = cellNum - 1;
      app.placeMarker(index, cellNum, color, selectedColumn);
      app.changeTurn();
      app.checkForWin(i, x, y, color);
    }
  });
};

app.placeMarker = function (index, cellNum, color, selectedColumn) {
  app.randomColor = app.chaosColors[Math.floor(Math.random() * app.chaosColors.length) + 1];
  if (app.chaosMode === true) {
    $(".column-" + index + " .cell-" + cellNum).append("<div class=\"piece animated jello\"></div>").css('background-color', "" + app.randomColor);
  } else {
    $(".column-" + index + " .cell-" + cellNum).append("<div class=\"piece " + color + " animated fadeInDownBig faster\"></div>");
  }
  selectedColumn.push("" + color);
};

app.changeTurn = function () {
  var currentColor = app.nextTurn[app.nextTurn.length - 1];
  if (currentColor === 'red') {
    app.nextTurn.push('yellow');
    $('.turn-indicator').text("Yellow");
  } else if (currentColor === 'yellow') {
    app.nextTurn.push('red');
    $('.turn-indicator').text("Red");
  }
};

app.checkForWin = function (i, x, y, color) {
  app.checkForVerticalWin(i, x, y, color);
  app.checkForHorizontalWin(i, x, y, color);
  app.checkForDiagonalWin(i, x, y, color);
  app.checkForOtherWins(i, x, y, color);
  app.tieGame(i, x);
};

app.checkForVerticalWin = function (i, x, y, color) {
  if (i[x][y] === i[x][y - 1] && i[x][y] === i[x][y - 2] && i[x][y] === i[x][y - 3]) {
    app.alertWin(color);
  }
};

app.checkForDiagonalWin = function (i, x, y, color) {
  if (
  // DIAGONAL WINS (TOP-LEFT TO BOTTOM-RIGHT = TL-BR, BOTTOM-LEFT TO TOP-RIGHT = BL-TR) (POS */4 = LEFT-TO-RIGHT)
  i[x][y] === i[x + 3][y - 3] && i[x][y] === i[x + 2][y - 2] && i[x][y] === i[x + 1][y - 1] || // TL-BR POS 1/4
  i[x][y] === i[x + 2][y - 2] && i[x][y] === i[x + 1][y - 1] && i[x][y] === i[x - 1][y + 1] || // TL-BR POS 2/4
  i[x][y] === i[x + 1][y - 1] && i[x][y] === i[x - 1][y + 1] && i[x][y] === i[x - 2][y + 2] || // TL-BR POS 3/4
  i[x][y] === i[x + 3][y + 3] && i[x][y] === i[x + 2][y + 2] && i[x][y] === i[x + 1][y + 1] || // BL-TR POS 1/4
  i[x][y] === i[x + 2][y + 2] && i[x][y] === i[x + 1][y + 1] && i[x][y] === i[x - 1][y - 1] || // BL-TR POS 2/4
  i[x][y] === i[x + 1][y + 1] && i[x][y] === i[x - 1][y - 1] && i[x][y] === i[x - 2][y - 2] // BL-TR POS 3/4
  ) {
      app.alertWin(color);
    }
};

app.checkForHorizontalWin = function (i, x, y, color) {
  if (i[x][y] === i[x + 3][y] && i[x][y] === i[x + 2][y] && i[x][y] === i[x + 1][y] || i[x][y] === i[x + 2][y] && i[x][y] === i[x + 1][y] && i[x][y] === i[x - 1][y] || i[x][y] === i[x + 1][y] && i[x][y] === i[x - 1][y] && i[x][y] === i[x - 2][y]) {
    app.alertWin(color);
  }
};

app.checkForOtherWins = function (i, x, y, color) {
  if (i[x][y] === i[x - 1][y + 1] && i[x][y] === i[x - 2][y + 2] && i[x][y] === i[x - 3][y + 3] || // TL-BR POS 4/4
  i[x][y] === i[x - 1][y - 1] && i[x][y] === i[x - 2][y - 2] && i[x][y] === i[x - 3][y - 3] || // BL-TR POS 4/4
  i[x][y] === i[x - 1][y] && i[x][y] === i[x - 2][y] && i[x][y] === i[x - 3][y] // HORIZONTAL WIN WITH NEGATIVE X-VALUE
  ) {
      app.alertWin(color);
    }
};

app.tieGame = function (i, x) {
  if (i[x].length === 6 && i[x + 1].length === 6 && i[x + 2].length === 6 && i[x + 3].length === 6 && i[x + 4].length === 6 && i[x + 5].length === 6 && i[x + 6].length === 6) {
    console.log('tie game');
  }
};

app.alertWin = function (color) {
  color = color.charAt(0).toUpperCase() + color.slice(1);
  window.setTimeout(function () {
    swal({
      title: "Congratulations " + color + " player!",
      text: "Winner Winner Chicken Dinner \uD83C\uDF57\uD83C\uDF57\uD83C\uDF57\uD83C\uDF57"
    });
  }, 650);
};

// EVENT LISTENERS
$('.column').hover(function () {
  $(this).toggleClass('mouseover');
});

$('.instructions-images-carousel').flickity({
  cellAlign: 'center',
  contain: true,
  wrapAround: true
});

$('.instructions-button').on('click', function () {
  $('.instructions-pop-out-container').show();
  $('.instructions-images-carousel').show().flickity('resize');
});

$('.instructions-exit').on('click', function () {
  $('.instructions-pop-out-container').hide();
});

$('.play-again-button').on('click', function () {
  app.columns = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: []
  };
  $('.piece').remove();
});

// CHAOS MODE
app.allowedKeys = {
  76: 'l',
  73: 'i',
  70: 'f',
  69: 'e',
  83: 's',
  67: 'c',
  72: 'h',
  65: 'a',
  79: 'o'
};

app.konamiCode = ['l', 'i', 'f', 'e', 'i', 's', 'c', 'h', 'a', 'o', 's'];
app.konamiCodePosition = 0;
app.chaosMode = false;
document.addEventListener('keydown', function (e) {
  var key = app.allowedKeys[e.keyCode];
  var requiredKey = app.konamiCode[app.konamiCodePosition];
  if (key === requiredKey) {
    app.konamiCodePosition++;
    if (app.konamiCodePosition === app.konamiCode.length) {
      app.chaosMode = true;
      app.konamiCodePosition = 0;
      var text = 'life is chaos 😈'.toUpperCase();
      swal({
        title: text
      });
      app.chaosTitle();
    }
  } else {
    app.konamiCodePosition = 0;
  }
});
app.chaosTitle = function () {
  setInterval(function () {
    var random = app.chaosColors[Math.floor(Math.random() * app.chaosColors.length) + 1].toString();
    var text = 'life is chaos'.toUpperCase();
    $('.main-title').text("" + text);
    $('.main-title').css('color', "" + random);
  }, 75);
};

// INIT
app.init = function () {
  app.addPiece();
};

// DOCUMENT READY
$(function () {
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLE9BQUosR0FBYztBQUNaLEtBQUcsRUFEUztBQUVaLEtBQUcsRUFGUztBQUdaLEtBQUcsRUFIUztBQUlaLEtBQUcsRUFKUztBQUtaLEtBQUcsRUFMUztBQU1aLEtBQUcsRUFOUztBQU9aLEtBQUcsRUFQUztBQVFaLEtBQUcsRUFSUyxFQVFMO0FBQ1AsS0FBRyxFQVRTO0FBVVosS0FBRztBQVZTLENBQWQ7QUFZQSxJQUFJLFFBQUosR0FBZSxDQUFDLEtBQUQsQ0FBZjtBQUNBLElBQUksV0FBSixHQUFrQixDQUFDLFdBQUQsRUFBYyxjQUFkLEVBQThCLE1BQTlCLEVBQXNDLFlBQXRDLEVBQW9ELE9BQXBELEVBQTZELE9BQTdELEVBQXNFLFFBQXRFLEVBQWdGLE9BQWhGLEVBQXlGLGdCQUF6RixFQUEyRyxNQUEzRyxFQUFtSCxZQUFuSCxFQUFpSSxPQUFqSSxFQUEwSSxXQUExSSxFQUF1SixXQUF2SixFQUFvSyxZQUFwSyxFQUFrTCxXQUFsTCxFQUErTCxPQUEvTCxFQUF3TSxnQkFBeE0sRUFBME4sVUFBMU4sRUFBc08sU0FBdE8sRUFBaVAsTUFBalAsRUFBeVAsVUFBelAsRUFBcVEsVUFBclEsRUFBaVIsZUFBalIsRUFBa1MsVUFBbFMsRUFBOFMsVUFBOVMsRUFBMFQsV0FBMVQsRUFBdVUsV0FBdlUsRUFBb1YsYUFBcFYsRUFBbVcsZ0JBQW5XLEVBQXFYLFlBQXJYLEVBQW1ZLFlBQW5ZLEVBQWlaLFNBQWpaLEVBQTRaLFlBQTVaLEVBQTBhLGNBQTFhLEVBQTBiLGVBQTFiLEVBQTJjLGVBQTNjLEVBQTRkLGVBQTVkLEVBQTZlLGVBQTdlLEVBQThmLFlBQTlmLEVBQTRnQixVQUE1Z0IsRUFBd2hCLGFBQXhoQixFQUF1aUIsU0FBdmlCLEVBQWtq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QWxCLENBQVo7QUFDQSxNQUFNLGNBQWMsSUFBSSxVQUFKLENBQWUsSUFBSSxrQkFBbkIsQ0FBcEI7QUFDQSxNQUFJLFFBQVEsV0FBWixFQUF5QjtBQUN2QixRQUFJLGtCQUFKO0FBQ0EsUUFBSSxJQUFJLGtCQUFKLEtBQTJCLElBQUksVUFBSixDQUFlLE1BQTlDLEVBQXNEO0FBQ3BELFVBQUksU0FBSixHQUFnQixJQUFoQjtBQUNBLFVBQUksa0JBQUosR0FBeUIsQ0FBekI7QUFDQSxVQUFNLE9BQU8sbUJBQW1CLFdBQW5CLEVBQWI7QUFDQSxXQUFLO0FBQ0gsZUFBTztBQURKLE9BQUw7QUFHQSxVQUFJLFVBQUo7QUFDRDtBQUNGLEdBWEQsTUFXTztBQUNMLFFBQUksa0JBQUosR0FBeUIsQ0FBekI7QUFDRDtBQUNGLENBakJEO0FBa0JBLElBQUksVUFBSixHQUFpQixZQUFXO0FBQzFCLGNBQVksWUFBWTtBQUN0QixRQUFNLFNBQVUsSUFBSSxXQUFKLENBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixJQUFJLFdBQUosQ0FBZ0IsTUFBM0MsSUFBcUQsQ0FBckUsQ0FBRCxDQUEwRSxRQUExRSxFQUFmO0FBQ0EsUUFBTSxPQUFRLGVBQUQsQ0FBa0IsV0FBbEIsRUFBYjtBQUNBLE1BQUUsYUFBRixFQUFpQixJQUFqQixNQUF5QixJQUF6QjtBQUNBLE1BQUUsYUFBRixFQUFpQixHQUFqQixDQUFxQixPQUFyQixPQUFpQyxNQUFqQztBQUNELEdBTEQsRUFLRyxFQUxIO0FBTUQsQ0FQRDs7QUFTQTtBQUNBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDcEIsTUFBSSxRQUFKO0FBQ0QsQ0FGRDs7QUFLQTtBQUNBLEVBQUUsWUFBVztBQUNYLE1BQUksSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcHAgPSB7fTtcblxuYXBwLmNvbHVtbnMgPSB7XG4gIGE6IFtdLFxuICBiOiBbXSxcbiAgYzogW10sXG4gIGQ6IFtdLFxuICBlOiBbXSxcbiAgZjogW10sXG4gIGc6IFtdLFxuICBoOiBbXSwgLy8gaCwgaSwgYW5kIGogYXJlIGV4dHJhIGNvbHVtbnMgdXNlZCBzb2xlbHkgZm9yIGNoZWNrV2luIGZ1bmN0aW9ucy5cbiAgaTogW10sXG4gIGo6IFtdXG59XG5hcHAubmV4dFR1cm4gPSBbJ3JlZCddO1xuYXBwLmNoYW9zQ29sb3JzID0gW1wiQWxpY2VCbHVlXCIsIFwiQW50aXF1ZVdoaXRlXCIsIFwiQXF1YVwiLCBcIkFxdWFtYXJpbmVcIiwgXCJBenVyZVwiLCBcIkJlaWdlXCIsIFwiQmlzcXVlXCIsIFwiQmxhY2tcIiwgXCJCbGFuY2hlZEFsbW9uZFwiLCBcIkJsdWVcIiwgXCJCbHVlVmlvbGV0XCIsIFwiQnJvd25cIiwgXCJCdXJseVdvb2RcIiwgXCJDYWRldEJsdWVcIiwgXCJDaGFydHJldXNlXCIsIFwiQ2hvY29sYXRlXCIsIFwiQ29yYWxcIiwgXCJDb3JuZmxvd2VyQmx1ZVwiLCBcIkNvcm5zaWxrXCIsIFwiQ3JpbXNvblwiLCBcIkN5YW5cIiwgXCJEYXJrQmx1ZVwiLCBcIkRhcmtDeWFuXCIsIFwiRGFya0dvbGRlblJvZFwiLCBcIkRhcmtHcmF5XCIsIFwiRGFya0dyZXlcIiwgXCJEYXJrR3JlZW5cIiwgXCJEYXJrS2hha2lcIiwgXCJEYXJrTWFnZW50YVwiLCBcIkRhcmtPbGl2ZUdyZWVuXCIsIFwiRGFya29yYW5nZVwiLCBcIkRhcmtPcmNoaWRcIiwgXCJEYXJrUmVkXCIsIFwiRGFya1NhbG1vblwiLCBcIkRhcmtTZWFHcmVlblwiLCBcIkRhcmtTbGF0ZUJsdWVcIiwgXCJEYXJrU2xhdGVHcmF5XCIsIFwiRGFya1NsYXRlR3JleVwiLCBcIkRhcmtUdXJxdW9pc2VcIiwgXCJEYXJrVmlvbGV0XCIsIFwiRGVlcFBpbmtcIiwgXCJEZWVwU2t5Qmx1ZVwiLCBcIkRpbUdyYXlcIiwgXCJEaW1HcmV5XCIsIFwiRG9kZ2VyQmx1ZVwiLCBcIkZpcmVCcmlja1wiLCBcIkZsb3JhbFdoaXRlXCIsIFwiRm9yZXN0R3JlZW5cIiwgXCJGdWNoc2lhXCIsIFwiR2FpbnNib3JvXCIsIFwiR2hvc3RXaGl0ZVwiLCBcIkdvbGRcIiwgXCJHb2xkZW5Sb2RcIiwgXCJHcmF5XCIsIFwiR3JleVwiLCBcIkdyZWVuXCIsIFwiR3JlZW5ZZWxsb3dcIiwgXCJIb25leURld1wiLCBcIkhvdFBpbmtcIiwgXCJJbmRpYW5SZWRcIiwgXCJJbmRpZ29cIiwgXCJJdm9yeVwiLCBcIktoYWtpXCIsIFwiTGF2ZW5kZXJcIiwgXCJMYXZlbmRlckJsdXNoXCIsIFwiTGF3bkdyZWVuXCIsIFwiTGVtb25DaGlmZm9uXCIsIFwiTGlnaHRCbHVlXCIsIFwiTGlnaHRDb3JhbFwiLCBcIkxpZ2h0Q3lhblwiLCBcIkxpZ2h0R29sZGVuUm9kWWVsbG93XCIsIFwiTGlnaHRHcmF5XCIsIFwiTGlnaHRHcmV5XCIsIFwiTGlnaHRHcmVlblwiLCBcIkxpZ2h0UGlua1wiLCBcIkxpZ2h0U2FsbW9uXCIsIFwiTGlnaHRTZWFHcmVlblwiLCBcIkxpZ2h0U2t5Qmx1ZVwiLCBcIkxpZ2h0U2xhdGVHcmF5XCIsIFwiTGlnaHRTbGF0ZUdyZXlcIiwgXCJMaWdodFN0ZWVsQmx1ZVwiLCBcIkxpZ2h0WWVsbG93XCIsIFwiTGltZVwiLCBcIkxpbWVHcmVlblwiLCBcIkxpbmVuXCIsIFwiTWFnZW50YVwiLCBcIk1hcm9vblwiLCBcIk1lZGl1bUFxdWFNYXJpbmVcIiwgXCJNZWRpdW1CbHVlXCIsIFwiTWVkaXVtT3JjaGlkXCIsIFwiTWVkaXVtUHVycGxlXCIsIFwiTWVkaXVtU2VhR3JlZW5cIiwgXCJNZWRpdW1TbGF0ZUJsdWVcIiwgXCJNZWRpdW1TcHJpbmdHcmVlblwiLCBcIk1lZGl1bVR1cnF1b2lzZVwiLCBcIk1lZGl1bVZpb2xldFJlZFwiLCBcIk1pZG5pZ2h0Qmx1ZVwiLCBcIk1pbnRDcmVhbVwiLCBcIk1pc3R5Um9zZVwiLCBcIk1vY2Nhc2luXCIsIFwiTmF2YWpvV2hpdGVcIiwgXCJOYXZ5XCIsIFwiT2xkTGFjZVwiLCBcIk9saXZlXCIsIFwiT2xpdmVEcmFiXCIsIFwiT3JhbmdlXCIsIFwiT3JhbmdlUmVkXCIsIFwiT3JjaGlkXCIsIFwiUGFsZUdvbGRlblJvZFwiLCBcIlBhbGVHcmVlblwiLCBcIlBhbGVUdXJxdW9pc2VcIiwgXCJQYWxlVmlvbGV0UmVkXCIsIFwiUGFwYXlhV2hpcFwiLCBcIlBlYWNoUHVmZlwiLCBcIlBlcnVcIiwgXCJQaW5rXCIsIFwiUGx1bVwiLCBcIlBvd2RlckJsdWVcIiwgXCJQdXJwbGVcIiwgXCJSZWJlY2NhUHVycGxlXCIsIFwiUmVkXCIsIFwiUm9zeUJyb3duXCIsIFwiUm95YWxCbHVlXCIsIFwiU2FkZGxlQnJvd25cIiwgXCJTYWxtb25cIiwgXCJTYW5keUJyb3duXCIsIFwiU2VhR3JlZW5cIiwgXCJTZWFTaGVsbFwiLCBcIlNpZW5uYVwiLCBcIlNpbHZlclwiLCBcIlNreUJsdWVcIiwgXCJTbGF0ZUJsdWVcIiwgXCJTbGF0ZUdyYXlcIiwgXCJTbGF0ZUdyZXlcIiwgXCJTbm93XCIsIFwiU3ByaW5nR3JlZW5cIiwgXCJTdGVlbEJsdWVcIiwgXCJUYW5cIiwgXCJUZWFsXCIsIFwiVGhpc3RsZVwiLCBcIlRvbWF0b1wiLCBcIlR1cnF1b2lzZVwiLCBcIlZpb2xldFwiLCBcIldoZWF0XCIsIFwiV2hpdGVcIiwgXCJXaGl0ZVNtb2tlXCIsIFwiWWVsbG93XCIsIFwiWWVsbG93R3JlZW5cIl07XG5cbmFwcC5hZGRQaWVjZSA9IGZ1bmN0aW9uKCkge1xuICAkKCcuY29sdW1uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGluZGV4ID0gJCh0aGlzKS5kYXRhKFwiY29sdW1uXCIpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29sdW1uID0gYXBwLmNvbHVtbnNbYCR7aW5kZXh9YF07XG4gICAgaWYgKHNlbGVjdGVkQ29sdW1uLmxlbmd0aCA9PT0gNikge1xuICAgICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiAnSW52YWxpZCBtb3ZlISDwn5mF8J+Pu+KAjeKZgu+4jydcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRDb2x1bW4ubGVuZ3RoIDwgNikge1xuICAgICAgY29uc3QgY29sb3IgPSBhcHAubmV4dFR1cm5bYXBwLm5leHRUdXJuLmxlbmd0aCAtIDFdO1xuICAgICAgY29uc3QgY2VsbE51bSA9IHNlbGVjdGVkQ29sdW1uLmxlbmd0aCArIDE7XG4gICAgICBjb25zdCBpID0gT2JqZWN0LnZhbHVlcyhhcHAuY29sdW1ucyk7XG4gICAgICBjb25zdCB4ID0gJCh0aGlzKS5kYXRhKFwiYXJyYXlcIik7XG4gICAgICBjb25zdCB5ID0gY2VsbE51bSAtIDE7XG4gICAgICBhcHAucGxhY2VNYXJrZXIoaW5kZXgsIGNlbGxOdW0sIGNvbG9yLCBzZWxlY3RlZENvbHVtbik7XG4gICAgICBhcHAuY2hhbmdlVHVybigpO1xuICAgICAgYXBwLmNoZWNrRm9yV2luKGksIHgsIHksIGNvbG9yKTtcbiAgICB9XG4gIH0pO1xufVxuXG5hcHAucGxhY2VNYXJrZXIgPSBmdW5jdGlvbihpbmRleCwgY2VsbE51bSwgY29sb3IsIHNlbGVjdGVkQ29sdW1uKSB7XG4gIGFwcC5yYW5kb21Db2xvciA9IGFwcC5jaGFvc0NvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuY2hhb3NDb2xvcnMubGVuZ3RoKSArIDFdO1xuICBpZiAoYXBwLmNoYW9zTW9kZSA9PT0gdHJ1ZSkge1xuICAgICQoYC5jb2x1bW4tJHtpbmRleH0gLmNlbGwtJHtjZWxsTnVtfWApLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpZWNlIGFuaW1hdGVkIGplbGxvXCI+PC9kaXY+YCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgYCR7YXBwLnJhbmRvbUNvbG9yfWApO1xuICB9IGVsc2Uge1xuICAgICQoYC5jb2x1bW4tJHtpbmRleH0gLmNlbGwtJHtjZWxsTnVtfWApLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpZWNlICR7Y29sb3J9IGFuaW1hdGVkIGZhZGVJbkRvd25CaWcgZmFzdGVyXCI+PC9kaXY+YCk7XG4gIH1cbiAgc2VsZWN0ZWRDb2x1bW4ucHVzaChgJHtjb2xvcn1gKTtcbn1cblxuYXBwLmNoYW5nZVR1cm4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgY3VycmVudENvbG9yID0gYXBwLm5leHRUdXJuW2FwcC5uZXh0VHVybi5sZW5ndGggLSAxXTtcbiAgaWYgKGN1cnJlbnRDb2xvciA9PT0gJ3JlZCcpIHtcbiAgICBhcHAubmV4dFR1cm4ucHVzaCgneWVsbG93Jyk7XG4gICAgJCgnLnR1cm4taW5kaWNhdG9yJykudGV4dChgWWVsbG93YCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudENvbG9yID09PSAneWVsbG93Jykge1xuICAgIGFwcC5uZXh0VHVybi5wdXNoKCdyZWQnKTtcbiAgICAkKCcudHVybi1pbmRpY2F0b3InKS50ZXh0KGBSZWRgKTtcbiAgfVxufTtcblxuYXBwLmNoZWNrRm9yV2luID0gZnVuY3Rpb24oaSwgeCwgeSwgY29sb3IpIHtcbiAgYXBwLmNoZWNrRm9yVmVydGljYWxXaW4oaSwgeCwgeSwgY29sb3IpO1xuICBhcHAuY2hlY2tGb3JIb3Jpem9udGFsV2luKGksIHgsIHksIGNvbG9yKTtcbiAgYXBwLmNoZWNrRm9yRGlhZ29uYWxXaW4oaSwgeCwgeSwgY29sb3IpO1xuICBhcHAuY2hlY2tGb3JPdGhlcldpbnMoaSwgeCwgeSwgY29sb3IpO1xuICBhcHAudGllR2FtZShpLCB4KTtcbn1cblxuYXBwLmNoZWNrRm9yVmVydGljYWxXaW4gPSBmdW5jdGlvbihpLCB4LCB5LCBjb2xvcikge1xuICBpZiAoaVt4XVt5XSA9PT0gaVt4XVt5IC0gMV0gJiYgaVt4XVt5XSA9PT0gaVt4XVt5IC0gMl0gJiYgaVt4XVt5XSA9PT0gaVt4XVt5IC0gM10pIHtcbiAgICBhcHAuYWxlcnRXaW4oY29sb3IpO1xuICB9XG59XG5cbmFwcC5jaGVja0ZvckRpYWdvbmFsV2luID0gZnVuY3Rpb24oaSwgeCwgeSwgY29sb3IpIHtcbiAgaWYgKFxuICAgIC8vIERJQUdPTkFMIFdJTlMgKFRPUC1MRUZUIFRPIEJPVFRPTS1SSUdIVCA9IFRMLUJSLCBCT1RUT00tTEVGVCBUTyBUT1AtUklHSFQgPSBCTC1UUikgKFBPUyAqLzQgPSBMRUZULVRPLVJJR0hUKVxuICAgIChpW3hdW3ldID09PSBpW3ggKyAzXVt5IC0gM10gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMl1beSAtIDJdICYmIGlbeF1beV0gPT09IGlbeCArIDFdW3kgLSAxXSkgfHwgLy8gVEwtQlIgUE9TIDEvNFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAyXVt5IC0gMl0gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMV1beSAtIDFdICYmIGlbeF1beV0gPT09IGlbeCAtIDFdW3kgKyAxXSkgfHwgLy8gVEwtQlIgUE9TIDIvNFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAxXVt5IC0gMV0gJiYgaVt4XVt5XSA9PT0gaVt4IC0gMV1beSArIDFdICYmIGlbeF1beV0gPT09IGlbeCAtIDJdW3kgKyAyXSkgfHwgLy8gVEwtQlIgUE9TIDMvNFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAzXVt5ICsgM10gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMl1beSArIDJdICYmIGlbeF1beV0gPT09IGlbeCArIDFdW3kgKyAxXSkgfHwgLy8gQkwtVFIgUE9TIDEvNFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAyXVt5ICsgMl0gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMV1beSArIDFdICYmIGlbeF1beV0gPT09IGlbeCAtIDFdW3kgLSAxXSkgfHwgLy8gQkwtVFIgUE9TIDIvNFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAxXVt5ICsgMV0gJiYgaVt4XVt5XSA9PT0gaVt4IC0gMV1beSAtIDFdICYmIGlbeF1beV0gPT09IGlbeCAtIDJdW3kgLSAyXSkgICAgLy8gQkwtVFIgUE9TIDMvNFxuICAgICkge1xuICAgIGFwcC5hbGVydFdpbihjb2xvcik7XG4gIH1cbn1cblxuYXBwLmNoZWNrRm9ySG9yaXpvbnRhbFdpbiA9IGZ1bmN0aW9uKGksIHgsIHksIGNvbG9yKSB7XG4gIGlmIChcbiAgICAoaVt4XVt5XSA9PT0gaVt4ICsgM11beV0gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMl1beV0gJiYgaVt4XVt5XSA9PT0gaVt4ICsgMV1beV0pIHx8XG4gICAgKGlbeF1beV0gPT09IGlbeCArIDJdW3ldICYmIGlbeF1beV0gPT09IGlbeCArIDFdW3ldICYmIGlbeF1beV0gPT09IGlbeCAtIDFdW3ldKSB8fFxuICAgIChpW3hdW3ldID09PSBpW3ggKyAxXVt5XSAmJiBpW3hdW3ldID09PSBpW3ggLSAxXVt5XSAmJiBpW3hdW3ldID09PSBpW3ggLSAyXVt5XSkgXG4gICAgKSB7XG4gICAgICBhcHAuYWxlcnRXaW4oY29sb3IpO1xuICAgIH1cbiAgfVxuXG5hcHAuY2hlY2tGb3JPdGhlcldpbnMgPSBmdW5jdGlvbihpLCB4LCB5LCBjb2xvcikge1xuICBpZiAoXG4gICAgKGlbeF1beV0gPT09IGlbeCAtIDFdW3kgKyAxXSAmJiBpW3hdW3ldID09PSBpW3ggLSAyXVt5ICsgMl0gJiYgaVt4XVt5XSA9PT0gaVt4IC0gM11beSArIDNdKSB8fCAvLyBUTC1CUiBQT1MgNC80XG4gICAgKGlbeF1beV0gPT09IGlbeCAtIDFdW3kgLSAxXSAmJiBpW3hdW3ldID09PSBpW3ggLSAyXVt5IC0gMl0gJiYgaVt4XVt5XSA9PT0gaVt4IC0gM11beSAtIDNdKSB8fCAvLyBCTC1UUiBQT1MgNC80XG4gICAgKGlbeF1beV0gPT09IGlbeCAtIDFdW3ldICYmIGlbeF1beV0gPT09IGlbeCAtIDJdW3ldICYmIGlbeF1beV0gPT09IGlbeCAtIDNdW3ldKSAvLyBIT1JJWk9OVEFMIFdJTiBXSVRIIE5FR0FUSVZFIFgtVkFMVUVcbiAgICApIHtcbiAgICBhcHAuYWxlcnRXaW4oY29sb3IpO1xuICB9XG59XG5cbmFwcC50aWVHYW1lID0gZnVuY3Rpb24oaSwgeCkge1xuICBpZiAoXG4gICAgaVt4XS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyAxXS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyAyXS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyAzXS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyA0XS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyA1XS5sZW5ndGggPT09IDYgJiZcbiAgICBpW3ggKyA2XS5sZW5ndGggPT09IDZcbiAgICApIHtcbiAgICBjb25zb2xlLmxvZygndGllIGdhbWUnKVxuICB9XG59XG5cbmFwcC5hbGVydFdpbiA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gIGNvbG9yID0gY29sb3IuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjb2xvci5zbGljZSgxKTtcbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgc3dhbCh7XG4gICAgICB0aXRsZTogYENvbmdyYXR1bGF0aW9ucyAke2NvbG9yfSBwbGF5ZXIhYCxcbiAgICAgIHRleHQ6IGBXaW5uZXIgV2lubmVyIENoaWNrZW4gRGlubmVyIPCfjZfwn42X8J+Nl/CfjZdgXG4gICAgfSk7XG4gIH0sIDY1MCk7XG59XG5cblxuXG5cblxuLy8gRVZFTlQgTElTVEVORVJTXG4kKCcuY29sdW1uJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoJ21vdXNlb3ZlcicpO1xufSk7XG5cbiQoJy5pbnN0cnVjdGlvbnMtaW1hZ2VzLWNhcm91c2VsJykuZmxpY2tpdHkoe1xuICBjZWxsQWxpZ246ICdjZW50ZXInLFxuICBjb250YWluOiB0cnVlLFxuICB3cmFwQXJvdW5kOiB0cnVlXG59KTtcblxuJCgnLmluc3RydWN0aW9ucy1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgJCgnLmluc3RydWN0aW9ucy1wb3Atb3V0LWNvbnRhaW5lcicpLnNob3coKTtcbiAgJCgnLmluc3RydWN0aW9ucy1pbWFnZXMtY2Fyb3VzZWwnKS5zaG93KCkuZmxpY2tpdHkoJ3Jlc2l6ZScpO1xufSlcblxuJCgnLmluc3RydWN0aW9ucy1leGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICQoJy5pbnN0cnVjdGlvbnMtcG9wLW91dC1jb250YWluZXInKS5oaWRlKCk7XG59KVxuXG4kKCcucGxheS1hZ2Fpbi1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgYXBwLmNvbHVtbnMgPSB7XG4gICAgYTogW10sXG4gICAgYjogW10sXG4gICAgYzogW10sXG4gICAgZDogW10sXG4gICAgZTogW10sXG4gICAgZjogW10sXG4gICAgZzogW10sXG4gICAgaDogW10sXG4gICAgaTogW10sXG4gICAgajogW11cbiAgfVxuICAkKCcucGllY2UnKS5yZW1vdmUoKTtcbn0pXG5cbi8vIENIQU9TIE1PREVcbmFwcC5hbGxvd2VkS2V5cyA9IHtcbiAgNzY6ICdsJyxcbiAgNzM6ICdpJyxcbiAgNzA6ICdmJyxcbiAgNjk6ICdlJyxcbiAgODM6ICdzJyxcbiAgNjc6ICdjJyxcbiAgNzI6ICdoJyxcbiAgNjU6ICdhJyxcbiAgNzk6ICdvJ1xufTtcblxuYXBwLmtvbmFtaUNvZGUgPSBbJ2wnLCAnaScsICdmJywgJ2UnLCAnaScsICdzJywgJ2MnLCAnaCcsICdhJywgJ28nLCAncyddO1xuYXBwLmtvbmFtaUNvZGVQb3NpdGlvbiA9IDA7XG5hcHAuY2hhb3NNb2RlID0gZmFsc2U7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICBjb25zdCBrZXkgPSBhcHAuYWxsb3dlZEtleXNbZS5rZXlDb2RlXTtcbiAgY29uc3QgcmVxdWlyZWRLZXkgPSBhcHAua29uYW1pQ29kZVthcHAua29uYW1pQ29kZVBvc2l0aW9uXTtcbiAgaWYgKGtleSA9PT0gcmVxdWlyZWRLZXkpIHtcbiAgICBhcHAua29uYW1pQ29kZVBvc2l0aW9uKys7XG4gICAgaWYgKGFwcC5rb25hbWlDb2RlUG9zaXRpb24gPT09IGFwcC5rb25hbWlDb2RlLmxlbmd0aCkge1xuICAgICAgYXBwLmNoYW9zTW9kZSA9IHRydWU7XG4gICAgICBhcHAua29uYW1pQ29kZVBvc2l0aW9uID0gMDtcbiAgICAgIGNvbnN0IHRleHQgPSAnbGlmZSBpcyBjaGFvcyDwn5iIJy50b1VwcGVyQ2FzZSgpO1xuICAgICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0ZXh0LFxuICAgICAgfSk7XG4gICAgICBhcHAuY2hhb3NUaXRsZSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhcHAua29uYW1pQ29kZVBvc2l0aW9uID0gMDtcbiAgfVxufSlcbmFwcC5jaGFvc1RpdGxlID0gZnVuY3Rpb24oKSB7XG4gIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCByYW5kb20gPSAoYXBwLmNoYW9zQ29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFwcC5jaGFvc0NvbG9ycy5sZW5ndGgpICsgMV0pLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdGV4dCA9ICgnbGlmZSBpcyBjaGFvcycpLnRvVXBwZXJDYXNlKCk7XG4gICAgJCgnLm1haW4tdGl0bGUnKS50ZXh0KGAke3RleHR9YCk7XG4gICAgJCgnLm1haW4tdGl0bGUnKS5jc3MoJ2NvbG9yJywgYCR7cmFuZG9tfWApO1xuICB9LCA3NSlcbn1cblxuLy8gSU5JVFxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgYXBwLmFkZFBpZWNlKCk7XG59XG5cblxuLy8gRE9DVU1FTlQgUkVBRFlcbiQoZnVuY3Rpb24oKSB7XG4gIGFwcC5pbml0KCk7XG59KSJdfQ==
