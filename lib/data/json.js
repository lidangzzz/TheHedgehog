"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json2mat = json2mat;
exports.mat2json = mat2json;

var _matrix = require("../matrix/matrix");

function mat2json(A) {
  return JSON.stringify(A);
}

function json2mat(json_str) {
  var A = new _matrix.mat();
  var obj = JSON.parse(json_str);
  A.init(obj.val);

  if (function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("==")]) return _left[Symbol.for("==")](_right);else return _left == _right;
  }(A.rows, obj.rows) && function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("==")]) return _left2[Symbol.for("==")](_right2);else return _left2 == _right2;
  }(A.cols, obj.cols)) {
    return A;
  }

  throw new Error("Fail to read matrix from json");
}