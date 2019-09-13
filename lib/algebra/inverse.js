"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inverse = inverse;

var _matrix = require("../matrix/matrix");

var mathjs = _interopRequireWildcard(require("mathjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left2, _right2) { if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("!=")]) return _left2[Symbol.for("!=")](_right2);else return _left2 != _right2; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function inverse(inmat) {
  if (function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right;
  }(inmat.rows, inmat.cols)) throw new Error("A must be a suqare matrix");
  return new _matrix.mat(mathjs.inv(inmat.val));
}