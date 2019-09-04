"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogisticRegression = void 0;

var m = _interopRequireWildcard(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left31, _right31) { if (_left31 !== null && _left31 !== undefined && _left31[Symbol.for("!=")]) return _left31[Symbol.for("!=")](_right31);else return _left31 != _right31; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!function (_left20, _right20) { if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("instanceof")]) return _left20[Symbol.for("instanceof")](_right20);else return _left20 instanceof _right20; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left18, _right18) { if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("<")]) return _left18[Symbol.for("<")](_right18);else return _left18 < _right18; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left19, _right19) { if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("in")]) return _left19[Symbol.for("in")](_right19);else return _left19 in _right19; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

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
      console.log(function (_left2, _right2) {
        if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("+")]) return _left2[Symbol.for("+")](_right2);else return _left2 + _right2;
      }("training x ", this.x));
      this.y = y;

      if (function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("==")]) return _left3[Symbol.for("==")](_right3);else return _left3 == _right3;
      }(y.rows, 1) && function (_left4, _right4) {
        if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("!=")]) return _left4[Symbol.for("!=")](_right4);else return _left4 != _right4;
      }(y.cols, 1)) {
        this.y = y.T();
      } //initialize the weights


      this.init_weights = new m.mat().zeros(this.x.cols, 1); //call the solver

      this.solver();
    }
  }, {
    key: "solver",
    value: function solver() {
      var th = this.init_weights;

      for (var iter = 0; function (_left5, _right5) {
        if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5;
      }(iter, this.max_iteration); iter++) {
        var h = sigmoid(function (_left6, _right6) {
          if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("*")]) return _left6[Symbol.for("*")](_right6);else return _left6 * _right6;
        }(this.x, th));

        th = function (_left7, _right7) {
          if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("+")]) return _left7[Symbol.for("+")](_right7);else return _left7 + _right7;
        }(th, function (_left8, _right8) {
          if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("*")]) return _left8[Symbol.for("*")](_right8);else return _left8 * _right8;
        }(function (_left9, _right9) {
          if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("*")]) return _left9[Symbol.for("*")](_right9);else return _left9 * _right9;
        }(this.x.T(), function (_left10, _right10) {
          if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("-")]) return _left10[Symbol.for("-")](_right10);else return _left10 - _right10;
        }(this.y, h)), function (_left11, _right11) {
          if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("/")]) return _left11[Symbol.for("/")](_right11);else return _left11 / _right11;
        }(this.alpha, this.x.rows)));
      }

      this.weight = th;
    }
  }, {
    key: "predict",
    value: function predict(x_) {
      var returnMatrix = new m.mat().zeros(x_.rows, 1); //normalize x

      var x_norm = m.zScoreOfMatrix(x_); //add a column of ones on the right for bias by using resize function

      var x_test = x_norm.resize(x_norm.rows, function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("+")]) return _left12[Symbol.for("+")](_right12);else return _left12 + _right12;
      }(x_norm.cols, 1), 1); //calculate the output matrix of y

      var y_predict = function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("*")]) return _left13[Symbol.for("*")](_right13);else return _left13 * _right13;
      }(x_test, this.weight);

      console.log(function (_left14, _right14) {
        if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("+")]) return _left14[Symbol.for("+")](_right14);else return _left14 + _right14;
      }("y predict is ", y_predict));
      var y_probability = sigmoid(y_predict);
      console.log(function (_left15, _right15) {
        if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("+")]) return _left15[Symbol.for("+")](_right15);else return _left15 + _right15;
      }("y hp is ", y_probability));

      for (var i = 0; function (_left16, _right16) {
        if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
      }(i, x_.rows); i++) {
        if (function (_left17, _right17) {
          if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for(">=")]) return _left17[Symbol.for(">=")](_right17);else return _left17 >= _right17;
        }(y_probability.val[i][0], 0.5)) {
          returnMatrix.val[i][0] = 1;
        } else {
          returnMatrix.val[i][0] = 0;
        }
      }

      return returnMatrix;
    }
  }]);

  return LogisticRegression;
}();

exports.LogisticRegression = LogisticRegression;

function sigmoid(x) {
  var returnMatrix = new m.mat().zeros(x.rows, x.cols);

  for (var i = 0; function (_left21, _right21) {
    if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("<")]) return _left21[Symbol.for("<")](_right21);else return _left21 < _right21;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left22, _right22) {
      if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("<")]) return _left22[Symbol.for("<")](_right22);else return _left22 < _right22;
    }(j, x.cols); j++) {
      returnMatrix.val[i][j] = function (_left23, _right23) {
        if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("/")]) return _left23[Symbol.for("/")](_right23);else return _left23 / _right23;
      }(1, function (_left24, _right24) {
        if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("+")]) return _left24[Symbol.for("+")](_right24);else return _left24 + _right24;
      }(1, Math.pow(Math.E, function (_left25, _right25) {
        if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("*")]) return _left25[Symbol.for("*")](_right25);else return _left25 * _right25;
      }(x.val[i][j], -1))));
    }
  }

  return returnMatrix;
}

function logX(x) {
  var returnMatrix = new m.mat().zeros(x.rows, x.cols);

  for (var i = 0; function (_left26, _right26) {
    if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("<")]) return _left26[Symbol.for("<")](_right26);else return _left26 < _right26;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left27, _right27) {
      if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("<")]) return _left27[Symbol.for("<")](_right27);else return _left27 < _right27;
    }(j, x.cols); j++) {
      returnMatrix.val[i][j] = Math.log(x.val[i][j]);
    }
  }

  return returnMatrix;
}

function logOneMinusX(x) {
  var returnMatrix = new m.mat().zeros(x.rows, x.cols);

  for (var i = 0; function (_left28, _right28) {
    if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("<")]) return _left28[Symbol.for("<")](_right28);else return _left28 < _right28;
  }(i, x.rows); i++) {
    for (var j = 0; function (_left29, _right29) {
      if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("<")]) return _left29[Symbol.for("<")](_right29);else return _left29 < _right29;
    }(j, x.cols); j++) {
      returnMatrix.val[i][j] = function (_left30, _right30) {
        if (_left30 !== null && _left30 !== undefined && _left30[Symbol.for("-")]) return _left30[Symbol.for("-")](_right30);else return _left30 - _right30;
      }(1, Math.log(x.val[i][j]));
    }
  }

  return returnMatrix;
}