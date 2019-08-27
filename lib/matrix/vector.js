"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mean = mean;
exports.std = std;
exports.zScore = zScore;

//mean of vector x
function mean(x) {
  var sum = 0;
  x.forEach(function (value) {
    sum += value;
  });
  return function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("/")]) return _left[Symbol.for("/")](_right);else return _left / _right;
  }(sum, x.length);
} //standard deviation of vector x


function std(x) {
  var ret = 0;
  var meanOfX = mean(x);
  x.forEach(function (value) {
    ret += function (_left2, _right2) {
      if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("*")]) return _left2[Symbol.for("*")](_right2);else return _left2 * _right2;
    }(function (_left3, _right3) {
      if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("-")]) return _left3[Symbol.for("-")](_right3);else return _left3 - _right3;
    }(meanOfX, value), function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("-")]) return _left4[Symbol.for("-")](_right4);else return _left4 - _right4;
    }(meanOfX, value));
  });
  ret = Math.sqrt(function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("/")]) return _left5[Symbol.for("/")](_right5);else return _left5 / _right5;
  }(ret, function (_left6, _right6) {
    if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("-")]) return _left6[Symbol.for("-")](_right6);else return _left6 - _right6;
  }(x.length, 1)));
  return ret;
}

function zScore(x) {
  var meanX = mean(x);
  var stdX = std(x);
  var ret = [];
  x.forEach(function (eachX) {
    ret.push(function (_left7, _right7) {
      if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("/")]) return _left7[Symbol.for("/")](_right7);else return _left7 / _right7;
    }(function (_left8, _right8) {
      if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("-")]) return _left8[Symbol.for("-")](_right8);else return _left8 - _right8;
    }(eachX, meanX), stdX));
  });
  return ret;
}