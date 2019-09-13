"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.det = det;

var mathjs = _interopRequireWildcard(require("mathjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function det(x) {
  return mathjs.det(x.val);
}