import {mat} from '../matrix/matrix';
import {zScoreOfMatrix} from '../stats/zScoreOfMat';

class LogisticRegression {

    alpha: number;
    max_iteration: number;
    x: mat;
    y: mat;
    init_weights: mat;
    weight : mat;
    constructor() {
        this.alpha = 0.1;
        this.max_iteration = 1000;
    }

    fit(x_: mat, y: mat) {

        //normalize x
        var x_norm = zScoreOfMatrix(x_);

        //add a column of ones on the right for bias by using resize function
        this.x = x_norm.resize(x_norm.rows, x_norm.cols + 1, 1);
        
        console.log("training x " + this.x);
        this.y = y;

        if (y.rows == 1 && y.cols != 1) {
            this.y = y.T();
        }

        //initialize the weights
        this.init_weights = new mat().zeros(this.x.cols, 1);

        //call the solver
        this.solver();
    }

    solver() {
        var th = this.init_weights;
        for (var iter = 0; iter < this.max_iteration; iter++) {
            var h = sigmoid(this.x * th);
            th = th + ( this.x.T() * (this.y - h)  ) * (this.alpha/this.x.rows);
        }
        this.weight = th;
    }

    predict(x_:mat):mat{
        var returnMatrix = new mat().zeros(x_.rows, 1);

        //normalize x
        var x_norm = zScoreOfMatrix(x_);

        //add a column of ones on the right for bias by using resize function
        var x_test = x_norm.resize(x_norm.rows, x_norm.cols + 1, 1);

        //calculate the output matrix of y
        var y_predict = x_test * this.weight;

        var y_probability = sigmoid(y_predict);

        for (var i=0;i<x_.rows;i++){
            if (y_probability.val[i][0]>=0.5) {
                returnMatrix.val[i][0]=1;
            }
            else{
                returnMatrix.val[i][0]=0;
            }
        }

        return returnMatrix;
    }

}

function sigmoid(x: mat): mat {
    var returnMatrix = new mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = 1 / (1 + Math.pow(Math.E, x.val[i][j] * (-1)) );
        }
    }
    return returnMatrix;
}

function logX(x: mat): mat {
    var returnMatrix = new mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = Math.log(x.val[i][j]);
        }
    }
    return returnMatrix;
}

function logOneMinusX(x: mat): mat {
    var returnMatrix = new mat().zeros(x.rows, x.cols);
    for (var i = 0; i < x.rows; i++) {
        for (var j = 0; j < x.cols; j++) {
            returnMatrix.val[i][j] = 1-Math.log(x.val[i][j]);
        }
    }
    return returnMatrix;
}



export { LogisticRegression };