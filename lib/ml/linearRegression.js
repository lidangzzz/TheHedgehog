"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinearRegression = void 0;

var op = _interopRequireWildcard(require("../app"));

var _inverse = require("../algebra/inverse");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left8, _right8) { if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("!=")]) return _left8[Symbol.for("!=")](_right8);else return _left8 != _right8; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!function (_left7, _right7) { if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("instanceof")]) return _left7[Symbol.for("instanceof")](_right7);else return _left7 instanceof _right7; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left5, _right5) { if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left6, _right6) { if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("in")]) return _left6[Symbol.for("in")](_right6);else return _left6 in _right6; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//reference: https://zhuanlan.zhihu.com/p/25434586
//api design: https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html
//https://www.mathworks.com/matlabcentral/fileexchange/64930-linear-regression-simplest-implementation
var LinearRegression =
/*#__PURE__*/
function () {
  function LinearRegression() {
    _classCallCheck(this, LinearRegression);
  } //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
  //y: M-by-1 matrix


  _createClass(LinearRegression, [{
    key: "fit",
    value: function fit(x_, y_) {
      var y = y_; //check the dimension of y

      if (function (_left, _right) {
        if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right;
      }(y_.rows, 1) && function (_left2, _right2) {
        if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("==")]) return _left2[Symbol.for("==")](_right2);else return _left2 == _right2;
      }(y_.cols, 1)) {
        y = y_.T();
      } //expan x_ with one more column with 1


      var x = x_.resize(x_.rows, function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("+")]) return _left3[Symbol.for("+")](_right3);else return _left3 + _right3;
      }(x_.cols, 1), 1); //calculate w = (X.T() * X)^-1 * X.T() * y
      //(X.T() * X)

      var xT_mul_x = op.mul(x.T(), x).log(); //(X.T() * X)^-1 

      var xT_mul_x_inverse = (0, _inverse.inverse)(xT_mul_x).log(); //(X.T() * X)^-1 * X.T()

      var s3 = xT_mul_x_inverse.mul(x.T()); //w = (X.T() * X)^-1 * X.T() * y

      this.w = s3.mul(y.T());
      return this;
    } //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
    //

  }, {
    key: "predict",
    value: function predict(x_) {
      //expan x_ with one more column with 1
      var x = x_.resize(x_.rows, function (_left4, _right4) {
        if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("+")]) return _left4[Symbol.for("+")](_right4);else return _left4 + _right4;
      }(x_.cols, 1), 1);
      return x.mul(this.w);
    }
  }]);

  return LinearRegression;
}();

exports.LinearRegression = LinearRegression;