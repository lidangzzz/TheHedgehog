"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = read;

var _app = require("../app");

function read(input) {
  try {
    var arrayOfValues = [];
    var inputLines = input.split(/\r?\n/);

    for (var i = 0; function (_left, _right) {
      if (_left !== null && _left !== undefined && _left[Symbol.for("<")]) return _left[Symbol.for("<")](_right);else return _left < _right;
    }(i, inputLines.length); i++) {
      var currentRow = [];
      var currentLine = inputLines[i];
      var currentTextValues = currentLine.split(/[ ,]+/);
      currentTextValues.forEach(function (textValue) {
        if (function (_left2, _right2) {
          if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for(">")]) return _left2[Symbol.for(">")](_right2);else return _left2 > _right2;
        }(textValue.length, 0)) {
          currentRow.push(Number(textValue));
        }
      });
      if (function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("==")]) return _left3[Symbol.for("==")](_right3);else return _left3 == _right3;
      }(currentRow.length, 0)) continue;
      arrayOfValues.push(currentRow);
    }

    var ret = new _app.mat(arrayOfValues);
    return ret;
  } catch (err) {
    throw new Error(function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("+")]) return _left4[Symbol.for("+")](_right4);else return _left4 + _right4;
    }("Error while parsing text: ", err));
  }
}