"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LU = LU;
exports.LUResult = void 0;

var _matrix = require("../matrix/matrix");

var mathjs = _interopRequireWildcard(require("mathjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left2, _right2) { if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("!=")]) return _left2[Symbol.for("!=")](_right2);else return _left2 != _right2; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("instanceof")]) return _left[Symbol.for("instanceof")](_right);else return _left instanceof _right; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//this is an implementation of LUP decomposition using CPU by Math.js (https://github.com/josdejong/mathjs)
//reference: https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/algebra/decomposition/lup.js
var LUResult = function LUResult(l, u, p_) {
  _classCallCheck(this, LUResult);

  this.L = l;
  this.U = u;
  this.p = p_;
};

exports.LUResult = LUResult;

function LU(m_) {
  var result = mathjs.lup(m_.val);
  return new LUResult(new _matrix.mat(result.L), new _matrix.mat(result.U), new _matrix.mat(result.p));
}