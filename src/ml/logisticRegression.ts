import * as m from '../app';

class LogisticRegression {

    alpha: number;
    max_iteration: number;
    x: m.mat;
    y: m.mat;
    init_weights: m.mat;
    constructor() {
        this.alpha = 0.1;
        this.max_iteration = 1000;
    }

    fit(x_: m.mat, y: m.mat) {

        //normalize x
        var x_norm = m.zScoreOfMatrix(x_);

        //add a column of ones on the right for bias by using resize function
        this.x = x_norm.resize(x_norm.rows, x_norm.cols + 1, 1);

        this.y = y;

        //initialize the weights
        this.init_weights = new m.mat().zeros(this.x.cols, 1);

        //call the solver
        this.solver();
    }

    solver() {
        var weight = this.init_weights;
        var m_ = this.x.rows;
        var h, J;
        var th = new m.mat().zeros(1,this.x.cols + 1);
        for (var iter = 0; iter < this.max_iteration; iter++) {
            h = sigmoid(this.x.mul(weight));
            var jsum = m.add(m.dotMul(this.y, logX(h)) , m.dotMul(this.y, logOneMinusX(h))).sum();
            J = -(1 / m_) * jsum;
            th.add( this.x.T().muls(this.alpha / this.x.rows).mul(this.y.clone().minus(h)) );
        }

    }

}

function sigmoid(x: m.mat): m.mat {
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            x.val[i][j] = 1 / (1 + Math.pow(Math.E, x.val[i][j] * (-1)) );
        }
    }
    return x;
}

function logX(x: m.mat): m.mat {
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            x.val[i][j] = Math.log(x.val[i][j]);
        }
    }
    return x;
}

function logOneMinusX(x: m.mat): m.mat {
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            x.val[i][j] = 1-Math.log(x.val[i][j]);
        }
    }
    return x;
}



export { LogisticRegression };