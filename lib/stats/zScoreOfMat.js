"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zScoreOfMatrix = zScoreOfMatrix;

var _app = require("../app");

/*

Standardized z scores
input X: the matrix
isUsingSampleStandardDeviation == true: using Sample Standard Deviation, otherwise using population standard deviation.
isColumn== true: z-score of column
return: the z-score of X, in which each element of every column has mean of 0 and standard deviation 1

*/
function zScoreOfMatrix(x) {
  var isUsingSampleStandardDeviation = function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for(">")]) return _left[Symbol.for(">")](_right);else return _left > _right;
  }(arguments.length, 1) && function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("!==")]) return _left2[Symbol.for("!==")](_right2);else return _left2 !== _right2;
  }(arguments[1], undefined) ? arguments[1] : true;
  var isColumn = function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for(">")]) return _left3[Symbol.for(">")](_right3);else return _left3 > _right3;
  }(arguments.length, 2) && function (_left4, _right4) {
    if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("!==")]) return _left4[Symbol.for("!==")](_right4);else return _left4 !== _right4;
  }(arguments[2], undefined) ? arguments[2] : true;
  if (isUsingSampleStandardDeviation) return zScoreUsingSampleStandardDeviation(x, isColumn);else {
    throw new Error("population standard deviation is not implemented yet.");
  }
}

function zScoreUsingSampleStandardDeviation(x_) {
  var isColumn = function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for(">")]) return _left5[Symbol.for(">")](_right5);else return _left5 > _right5;
  }(arguments.length, 1) && function (_left6, _right6) {
    if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("!==")]) return _left6[Symbol.for("!==")](_right6);else return _left6 !== _right6;
  }(arguments[1], undefined) ? arguments[1] : true;
  var xT = new _app.mat();

  if (isColumn) {
    xT = x_.T();
  } else {
    xT = x_;
  }

  var return2DArray = []; //compute the mean and standard deviation of X of each column\

  for (var i = 0; function (_left7, _right7) {
    if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
  }(i, xT.val.length); i++) {
    var currentRow = xT.val[i];
    var zscoreOfCurrentRow = (0, _app.zScore)(currentRow);
    return2DArray.push(zscoreOfCurrentRow);
  }

  var returnMatrixT = new _app.mat(return2DArray);
  if (!isColumn) return returnMatrixT;
  return returnMatrixT.T();
}