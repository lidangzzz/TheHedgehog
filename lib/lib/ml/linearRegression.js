import * as op from '../app';
import { inverse } from '../algebra/inverse';
//reference: https://zhuanlan.zhihu.com/p/25434586
//api design: https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html
//https://www.mathworks.com/matlabcentral/fileexchange/64930-linear-regression-simplest-implementation
class LinearRegression {
    constructor() { }
    //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
    //y: M-by-1 matrix
    fit(x_, y_) {
        var y = y_;
        //check the dimension of y
        if (y_.rows != 1 && y_.cols == 1) {
            y = y_.T();
        }
        //expan x_ with one more column with 1
        var x = x_.resize(x_.rows, x_.cols + 1, 1);
        //calculate w = (X.T() * X)^-1 * X.T() * y
        //(X.T() * X)
        var xT_mul_x = op.mul(x.T(), x).log();
        //(X.T() * X)^-1 
        var xT_mul_x_inverse = inverse(xT_mul_x).log();
        //(X.T() * X)^-1 * X.T()
        var s3 = xT_mul_x_inverse.mul(x.T());
        //w = (X.T() * X)^-1 * X.T() * y
        this.w = s3.mul(y.T());
        return this;
    }
    //x: M-by-N matrix. M data with N dimensions. Each row is an N-dim vector
    //
    predict(x_) {
        //expan x_ with one more column with 1
        var x = x_.resize(x_.rows, x_.cols + 1, 1);
        return x.mul(this.w);
    }
}
export { LinearRegression };
