"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QR = QR;
exports.QRResult = void 0;

var m = _interopRequireWildcard(require("../app"));

var mathjs = _interopRequireWildcard(require("mathjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left2, _right2) { if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("!=")]) return _left2[Symbol.for("!=")](_right2);else return _left2 != _right2; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("instanceof")]) return _left[Symbol.for("instanceof")](_right);else return _left instanceof _right; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QRResult = function QRResult(q, r) {
  _classCallCheck(this, QRResult);

  this.Q = q;
  this.R = r;
}; //solving QR decomposition from mathjs.qr


exports.QRResult = QRResult;

function QR(x) {
  var result = mathjs.qr(x.val);
  return new QRResult(new m.mat(result.Q), new m.mat(result.R));
}