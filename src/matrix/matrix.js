import * as m from "../app";
var mat = /** @class */ (function () {
    function mat(input) {
        this.GPU = false;
        this.val = [];
        this.rows = 0;
        this.cols = 0;
        if (typeof input == 'number') {
            this.val = [[input]];
            this.rows = 1;
            this.cols = 1;
            return this;
        }
        if (Array.isArray(input)) {
            //if input is an 2D array
            if (Array.isArray(input[0])) {
                this.init(input);
            }
            //else it is a 1D vector
            else {
                this.initVec(input);
            }
        }
    }
    mat.prototype.clear = function () { this.val = []; this.rows = 0; this.cols = 0; return this; };
    mat.prototype.dimensions = function () { return Array.from([this.rows, this.cols]); };
    mat.prototype.isVector = function () { return this.rows <= 1; };
    //initialize with a 2D array
    mat.prototype.init = function (input2DArray) {
        this.clear();
        this.rows = input2DArray.length;
        if (this.rows > 0)
            this.cols = input2DArray[0].length;
        else
            this.cols = 0;
        for (var i = 0; i < input2DArray.length; i++) {
            this.val.push(input2DArray[i].slice());
        }
        return this;
    };
    mat.prototype.dimCheck = function (row, col) {
        if (row >= this.rows || row < 0 || col > this.cols || col < 0 || Number.isInteger(row) == false || Number.isInteger(col) == false) {
            throw new Error("Invalid row or column");
        }
    };
    //initialize with 1D array (vector) into an N-by-1 matrix
    mat.prototype.initVec = function (input1DArray) {
        this.clear();
        this.rows = 1;
        this.cols = input1DArray.length;
        this.val.push(input1DArray.slice());
        return this;
    };
    //generate a N-by-1 matrix by initializing a range vector [start:end:step]. 
    mat.prototype.range = function (arg1, arg2, step) {
        if (arg2 === void 0) { arg2 = null; }
        if (step === void 0) { step = 1; }
        var rangeVector = [];
        var start = 0, end = 0;
        if (arg2 == null) {
            start = 0;
            end = arg1;
        } // range from 0 to arg1 
        else {
            start = arg1;
            end = arg2;
        } //range from arg1 to arg2
        if (start < end) {
            for (var iterator = start; iterator < end; iterator += step) {
                rangeVector.push(iterator);
            }
            return this.initVec(rangeVector);
        }
        for (var iterator = start; iterator > end; iterator += step) { //else
            rangeVector.push(iterator);
        }
        return this.initVec(rangeVector);
    };
    // return a clone of this matrix
    mat.prototype.clone = function () {
        var returnMat = new mat();
        returnMat.rows = this.rows;
        returnMat.cols = this.cols;
        for (var i = 0; i < this.val.length; i++)
            returnMat.val.push(this.val[i].slice());
        return returnMat;
    };
    // initialize a matrix by copying from another matrix
    mat.prototype.copy = function (inputMat) { this.init(inputMat.val); this.cols = inputMat.cols; this.rows = inputMat.rows; return this; };
    mat.prototype.equals = function (inMat, EPSILON) {
        if (EPSILON === void 0) { EPSILON = 0.0001; }
        if (this.cols != inMat.cols || this.rows != inMat.rows)
            return false;
        var sumOfDiff = this.minus(inMat).squareSum();
        return (sumOfDiff <= EPSILON);
    };
    //initialze an row-by-col matrix with all elements are N
    mat.prototype.Ns = function (row, col, N) {
        this.clear();
        this.rows = row;
        this.cols = col;
        for (var i = 0; i < row; i++) {
            this.val.push(Array(col).fill(N));
        }
        return this;
    };
    //initialze a zero matrix
    mat.prototype.zeros = function (row, col) { return this.Ns(row, col, 0); };
    mat.prototype.ones = function (row, col) { return this.Ns(row, col, 1); };
    // initiaze an N*N matrix with diag values
    mat.prototype.diag = function (input1DArray) {
        this.clear();
        this.zeros(input1DArray.length, input1DArray.length);
        for (var i = 0; i < input1DArray.length; i++)
            this.val[i][i] = input1DArray[i];
        return this;
    };
    mat.prototype.identity = function (N) {
        var diag_ones = Array(N).fill(1);
        return this.diag(diag_ones);
    };
    // initialize a random matrix
    mat.prototype.random = function (row, col) {
        this.clear();
        this.zeros(row, col);
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++)
                this.val[row][col] = Math.random();
        }
        return this;
    };
    mat.prototype.T = function () {
        var returnMatrix = new mat().zeros(this.cols, this.rows);
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++)
                returnMatrix.val[col][row] = this.val[row][col];
        }
        return returnMatrix;
    };
    mat.prototype.transpose = function () { return this.T(); };
    mat.prototype.each = function (func) {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++)
                this.val[row][col] = func(this.val[row][col]);
        }
        return this;
    };
    //get max, min, mean, median value
    mat.prototype.max = function () {
        var maxValue = this.val[0][0];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                maxValue = Math.max(maxValue, this.val[i][j]);
            }
        }
        return maxValue;
    };
    mat.prototype.min = function () {
        var minValue = this.val[0][0];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                minValue = Math.min(minValue, this.val[i][j]);
            }
        }
        return minValue;
    };
    mat.prototype.sum = function () {
        var sum = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                sum += this.val[i][j];
            }
        }
        return sum;
    };
    mat.prototype.mean = function () {
        return this.sum() / (this.rows * this.cols);
    };
    mat.prototype.median = function () {
        var sortedValueArray = this.toArray().sort();
        return sortedValueArray.length % 2 == 0 ?
            (sortedValueArray[(sortedValueArray.length) / 2 - 1] + sortedValueArray[sortedValueArray.length / 2]) / 2
            : sortedValueArray[(sortedValueArray.length - 1) / 2];
    };
    //add, multiply, minus, divide with one scalar value
    mat.prototype.adds = function (val) { this.each(function (eachMatrixValue) { return eachMatrixValue + val; }); return this; };
    mat.prototype.muls = function (val) { this.each(function (eachMatrixValue) { return eachMatrixValue * val; }); return this; };
    mat.prototype.minuss = function (val) { return this.adds(val * (-1)); };
    mat.prototype.divs = function (val) { return this.muls(1.0 / val); };
    //matrix operations. All matrix operation member functions are NOT In Place
    mat.prototype.add = function (rightMat) { return m.add(this, rightMat); };
    mat.prototype.minus = function (rightMat) { return m.minus(this, rightMat); };
    mat.prototype.mul = function (rightMat) {
        if (this.GPU == false && rightMat.GPU == false) {
            return m.mul(this, rightMat);
        }
        return m.mul_gpu(this, rightMat);
    };
    mat.prototype.mul_gpu = function (rightMat) { var result = m.mul_gpu(this, rightMat); this.copy(result); return this; };
    // matrix plus operator overload
    // mat1 + A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    mat.prototype[Symbol["for"]('+')] = function (rightOperand) {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)) {
            return this.add(new mat(rightOperand));
        }
        //if right operand is a number, add the number as a scalar
        if (typeof rightOperand == 'number') {
            return this.adds(rightOperand);
        }
        //otherwise, add the right operand as a matrix
        return this.add(rightOperand);
    };
    // matrix minus operator overload
    // mat1 - A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    mat.prototype[Symbol["for"]('-')] = function (rightOperand) {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)) {
            return this.minus(new mat(rightOperand));
        }
        //if right operand is a number, minus the number as a scalar
        if (typeof rightOperand == 'number') {
            return this.minuss(rightOperand);
        }
        //otherwise, minus the right operand as a matrix
        return this.clone().minus(rightOperand);
    };
    // matrix multiply operator overload
    // mat1 * A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    mat.prototype[Symbol["for"]('*')] = function (rightOperand) {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)) {
            var rightOperandMatrix = new mat(rightOperand);
            return this.mul(rightOperandMatrix);
        }
        //if right operand is a number, mul the number as a scalar
        if (typeof rightOperand == 'number') {
            return this.muls(rightOperand);
        }
        //otherwise, multiply the right operand as a matrix
        return this.mul(rightOperand);
    };
    // mat ^ N, the power of a matrix
    // if N == -1, return the inverse matrix
    // otherwise return the result of matrix multiplying itself 
    mat.prototype[Symbol["for"]('^')] = function (rightOperand) {
        if (this.rows != this.cols)
            throw new Error("This matrix does not support ^ operator");
        //if right operand is -1, return the inverse matrix
        if (rightOperand == -1) {
            return m.inverse(this);
        }
        //check if rightOperand is an integer
        if (!Number.isInteger(rightOperand) || rightOperand < 1)
            throw new Error("This right operand does not support ^ operator");
        var returnMatrix = this.clone();
        for (var i = 2; i <= rightOperand; i++) {
            m.mulInPlace(returnMatrix, this);
        }
        return returnMatrix;
    };
    // compare mat1 == mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
    mat.prototype[Symbol["for"]('==')] = function (rightOperand, EPSILON) {
        if (EPSILON === void 0) { EPSILON = 0.0001; }
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)) {
            var rightOperandMatrix = new mat(rightOperand);
            return this.equals(rightOperandMatrix);
        }
        //if right operand is a number, mul the number as a scalar
        else if (typeof rightOperand == 'number') {
            if (this.rows != 1 || this.cols != 1) {
                throw new Error("This matrix cannot be compared with a scalar");
            }
            return (this.val[0][0] - rightOperand) * (this.val[0][0] - rightOperand) < EPSILON;
        }
        //otherwise, minus the right operand as a matrix
        return this.equals(rightOperand);
    };
    //setter and getter
    mat.prototype.set = function (row, col, val) { this.dimCheck(row, col); this.val[row][col] = val; return this; };
    mat.prototype.get = function (row, col) { this.dimCheck(row, col); return this.val[row][col]; };
    mat.prototype.at = function (row, col) { this.dimCheck(row, col); return this.val[row][col]; };
    //get a row vector (as an N-by-1 matrix) by index
    mat.prototype.row = function (rowIndex) { this.dimCheck(rowIndex, 0); return new mat().initVec(this.val[rowIndex]); };
    //get a column vector (as an N-by-1 matrix) by index
    mat.prototype.col = function (colIndex) {
        this.dimCheck(0, colIndex);
        var columnVector = Array(this.rows).fill(0);
        for (var rowPt = 0; rowPt < this.rows; rowPt++)
            columnVector[rowPt] = this.val[rowPt][colIndex];
        return new mat().initVec(columnVector);
    };
    //return a 2D array
    mat.prototype.to2DArray = function () { return this.clone().val; };
    //return a 1D array
    mat.prototype.toArray = function () { return [].concat.apply([], this.val); };
    //reshape matrix
    mat.prototype.reshape = function (row, col) {
        var returnMatrix = new mat().zeros(row, col);
        var thisArray = this.toArray();
        var arrayPt = 0;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (arrayPt < thisArray.length) {
                    returnMatrix.val[i][j] = thisArray[arrayPt];
                    arrayPt++;
                }
                else {
                    break;
                }
            }
            if (arrayPt >= thisArray.length)
                break;
        }
        return returnMatrix;
    };
    //resize matrix to a smaller matrix [rowStart , rowEnd), [colStart , colEnd)
    //All extra spaces will be filled with zero
    mat.prototype.subMatrix = function (rowStart, rowEnd, colStart, colEnd) {
        if (rowStart < 0 || rowEnd > this.rows || colStart < 0 || colEnd > this.cols || rowStart > rowEnd || colStart > colEnd) {
            throw new Error("Please check the dimensions of subMatrix");
        }
        var returnMatrix = new mat().zeros(rowEnd - rowStart, colEnd - colStart);
        for (var i = rowStart; i < rowEnd; i++) {
            var row_index_of_return_matrix = i - rowStart;
            for (var j = colStart; j < colEnd; j++) {
                var col_index_of_return_matrix = j - colStart;
                returnMatrix.val[row_index_of_return_matrix][col_index_of_return_matrix] = this.val[i][j];
            }
        }
        return returnMatrix;
    };
    //get a few rows of matrix
    mat.prototype.getRows = function (rowStart, rowEnd) {
        return this.subMatrix(rowStart, rowEnd, 0, this.cols);
    };
    //get a few columns of matrix
    mat.prototype.getCols = function (colStart, colEnd) {
        return this.subMatrix(0, this.rows, colStart, colEnd);
    };
    //resize the matrix to a larger or smaller matrix
    //and fill the extra spaces with defaultValue
    mat.prototype.resize = function (row, col, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var returnMatrix = new mat().Ns(row, col, defaultValue);
        var min_row = Math.min(row, this.rows);
        var min_col = Math.min(col, this.cols);
        for (var i = 0; i < min_row; i++) {
            for (var j = 0; j < min_col; j++) {
                returnMatrix.val[i][j] = this.val[i][j];
            }
        }
        return returnMatrix;
    };
    mat.prototype.rowVector = function (row) {
        return this.val[row].slice();
    };
    mat.prototype.columnVector = function (col) {
        var ret = [];
        for (var i = 0; i < this.rows; i++)
            ret.push(this.val[i][col]);
        return ret;
    };
    mat.prototype.squareSum = function () {
        var ret = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var val = this.val[i][j];
                ret += val * val;
            }
        }
        return ret;
    };
    //return the format of matrix as a CSV string
    mat.prototype.toString = function () { return m.mat2csv(this); };
    //output the whole information to console
    mat.prototype.log = function () { console.log(this); return this; }; //output in console
    return mat;
}());
export { mat };
