"use strict";

function _classCallCheck(instance, Constructor) { if (!function (_left3, _right3) { if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("instanceof")]) return _left3[Symbol.for("instanceof")](_right3);else return _left3 instanceof _right3; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("<")]) return _left[Symbol.for("<")](_right);else return _left < _right; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left2, _right2) { if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("in")]) return _left2[Symbol.for("in")](_right2);else return _left2 in _right2; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ndarray =
/*#__PURE__*/
function () {
  function ndarray() {
    _classCallCheck(this, ndarray);

    this.dim = [], this.val = null;
  }

  _createClass(ndarray, [{
    key: "init",
    value: function init(inputArray) {
      //this.val[0] = inputArray;
      return this;
    }
  }]);

  return ndarray;
}();