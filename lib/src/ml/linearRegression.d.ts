import { mat } from '../matrix/matrix';
declare class LinearRegression {
    w: mat;
    constructor();
    fit(x_: mat, y_: mat): LinearRegression;
    predict(x_: mat): mat;
}
export { LinearRegression };
