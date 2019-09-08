import * as m from '../app';
var LogisticRegression = /** @class */ (function () {
    function LogisticRegression() {
        this.alpha = 0.1;
        this.max_iteration = 1000;
    }
    LogisticRegression.prototype.fit = function (x_, y) {
        //normalize x
        var x_norm = m.zScoreOfMatrix(x_);
        //add a column of ones on the right for bias by using resize function
        this.x = x_norm.resize(x_norm.rows, x_norm.cols + 1, 1);
        console.log("training x " + this.x);
        this.y = y;
        if (y.rows == 1 && y.cols != 1) {
            this.y = y.T();
        }
        //initialize the weights
        this.init_weights = new m.mat().zeros(this.x.cols, 1);
        //call the solver
        this.solver();
    };
    LogisticRegression.prototype.solver = function () {
        var th = this.init_weights;
        for (var iter = 0; iter < this.max_iteration; iter++) {
            var h = sigmoid(this.x * th);
            th = th + (this.x.T() * (this.y - h)) * (this.alpha / this.x.rows);
        }
        this.weight = th;
    };
    LogisticRegression.prototype.predict = function (x_) {
        var returnMatrix = new m.mat().zeros(x_.rows, 1);
        //normalize x
        var x_norm = m.zScoreOfMatrix(x_);
        //add a column of ones on the right for bias by using resize function
        var x_test = x_norm.resize(x_norm.rows, x_norm.cols + 1, 1);
        //calculate the output matrix of y
        var y_predict = x_test * this.weight;
        console.log("y predict is " + y_predict);
        var y_probability = sigmoid(y_predict);
        console.log("y hp is " + y_probability);
        for (var i = 0; i < x_.rows; i++) {
            if (y_probability.val[i][0] >= 0.5) {
                returnMatrix.val[i][0] = 1;
            }
            else {
                returnMatrix.val[i][0] = 0;
            }
        }
        return returnMatrix;
    };
    return LogisticRegression;
}());
function sigmoid(x) {
    var returnMatrix = new m.mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = 1 / (1 + Math.pow(Math.E, x.val[i][j] * (-1)));
        }
    }
    return returnMatrix;
}
function logX(x) {
    var returnMatrix = new m.mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = Math.log(x.val[i][j]);
        }
    }
    return returnMatrix;
}
function logOneMinusX(x) {
    var returnMatrix = new m.mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = 1 - Math.log(x.val[i][j]);
        }
    }
    return returnMatrix;
}
export { LogisticRegression };
