"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogisticRegression = void 0;

var m = _interopRequireWildcard(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left20, _right20) { if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("!=")]) return _left20[Symbol.for("!=")](_right20);else return _left20 != _right20; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!function (_left9, _right9) { if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("instanceof")]) return _left9[Symbol.for("instanceof")](_right9);else return _left9 instanceof _right9; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left7, _right7) { if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left8, _right8) { if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("in")]) return _left8[Symbol.for("in")](_right8);else return _left8 in _right8; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LogisticRegression =
/*#__PURE__*/
function () {
  function LogisticRegression() {
    _classCallCheck(this, LogisticRegression);

    this.alpha = 0.1;
    this.max_iteration = 1000;
  }

  _createClass(LogisticRegression, [{
    key: "fit",
    value: function fit(x_, y) {
      //normalize x
      var x_norm = m.zScoreOfMatrix(x_); //add a column of ones on the right for bias by using resize function

      this.x = x_norm.resize(x_norm.rows, function (_left, _right) {
        if (_left !== null && _left !== undefined && _left[Symbol.for("+")]) return _left[Symbol.for("+")](_right);else return _left + _right;
      }(x_norm.cols, 1), 1);
      this.y = y; //initialize the weights

      this.init_weights = new m.mat().zeros(this.x.cols, 1); //call the solver

      this.solver();
    }
  }, {
    key: "solver",
    value: function solver() {
      var weight = this.init_weights;
      var m_ = this.x.rows;
      var h, J;
      var th = new m.mat().zeros(1, function (_left2, _right2) {
        if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("+")]) return _left2[Symbol.for("+")](_right2);else return _left2 + _right2;
      }(this.x.cols, 1));

      for (var iter = 0; function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
      }(iter, this.max_iteration); iter++) {
        h = sigmoid(this.x.mul(weight));
        var jsum = m.add(m.dotMul(this.y, logX(h)), m.dotMul(this.y, logOneMinusX(h))).sum();

        J = function (_left4, _right4) {
          if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("*")]) return _left4[Symbol.for("*")](_right4);else return _left4 * _right4;
        }(-function (_left5, _right5) {
          if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("/")]) return _left5[Symbol.for("/")](_right5);else return _left5 / _right5;
        }(1, m_), jsum);

        th.add(this.x.T().muls(function (_left6, _right6) {
          if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("/")]) return _left6[Symbol.for("/")](_right6);else return _left6 / _right6;
        }(this.alpha, this.x.rows)).mul(this.y.clone().minus(h)));
      }
    }
  }]);

  return LogisticRegression;
}();

exports.LogisticRegression = LogisticRegression;

function sigmoid(x) {
  for (var i = 0; function (_left10, _right10) {
    if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("<")]) return _left10[Symbol.for("<")](_right10);else return _left10 < _right10;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left11, _right11) {
      if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
    }(j, x.cols); j++) {
      x.val[i][j] = function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("/")]) return _left12[Symbol.for("/")](_right12);else return _left12 / _right12;
      }(1, function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("+")]) return _left13[Symbol.for("+")](_right13);else return _left13 + _right13;
      }(1, Math.pow(Math.E, function (_left14, _right14) {
        if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("*")]) return _left14[Symbol.for("*")](_right14);else return _left14 * _right14;
      }(x.val[i][j], -1))));
    }
  }

  return x;
}

function logX(x) {
  for (var i = 0; function (_left15, _right15) {
    if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("<")]) return _left15[Symbol.for("<")](_right15);else return _left15 < _right15;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left16, _right16) {
      if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
    }(j, x.cols); j++) {
      x.val[i][j] = Math.log(x.val[i][j]);
    }
  }

  return x;
}

function logOneMinusX(x) {
  for (var i = 0; function (_left17, _right17) {
    if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("<")]) return _left17[Symbol.for("<")](_right17);else return _left17 < _right17;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left18, _right18) {
      if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("<")]) return _left18[Symbol.for("<")](_right18);else return _left18 < _right18;
    }(j, x.cols); j++) {
      x.val[i][j] = function (_left19, _right19) {
        if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("-")]) return _left19[Symbol.for("-")](_right19);else return _left19 - _right19;
      }(1, Math.log(x.val[i][j]));
    }
  }

  return x;
}