import { op as op_ } from '../matrix/operator';
import { inverse } from '../algebra/inverse';
var op = new op_(); //reference: https://zhuanlan.zhihu.com/p/25434586
//api design: https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html
//https://www.mathworks.com/matlabcentral/fileexchange/64930-linear-regression-simplest-implementation

class LinearRegression {
  constructor() {} //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
  //y: M-by-1 matrix


  fit(x_, y_) {
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

    var xT_mul_x_inverse = inverse(xT_mul_x).log(); //(X.T() * X)^-1 * X.T()

    var s3 = xT_mul_x_inverse.mul(x.T()); //w = (X.T() * X)^-1 * X.T() * y

    this.w = s3.mul(y.T());
    return this;
  } //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
  //


  predict(x_) {
    //expan x_ with one more column with 1
    var x = x_.resize(x_.rows, function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("+")]) return _left4[Symbol.for("+")](_right4);else return _left4 + _right4;
    }(x_.cols, 1), 1);
    return x.mul(this.w);
  }

}

export { LinearRegression };