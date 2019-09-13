import * as m from "../app";


class mat {
    val: number[][]; rows: number; cols: number; GPU:boolean;
    clear() { this.val = []; this.rows = 0; this.cols = 0; return this; }
    constructor(input?: number[][] | number[]| number) {
        this.GPU = false;
        this.val = []; this.rows = 0; this.cols = 0;
        if (typeof input == 'number'){
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
    dimensions(): number[] { return Array.from([this.rows, this.cols]); }
    isVector(): boolean { return this.rows <= 1;}

    //initialize with a 2D array
    init(input2DArray: any): mat {
        this.clear(); this.rows = input2DArray.length;
        if (this.rows > 0) this.cols = input2DArray[0].length; else this.cols = 0;
        for (var i = 0; i < input2DArray.length; i++) { this.val.push([...input2DArray[i]]); }
        return this;
    }

    private dimCheck(row: number, col: number) {
        if (row >= this.rows || row < 0 || col > this.cols || col < 0 || Number.isInteger(row) == false || Number.isInteger(col) == false) {
            throw new Error("Invalid row or column");
        }
    }

    //initialize with 1D array (vector) into an N-by-1 matrix
    initVec(input1DArray: any): mat {
        this.clear(); this.rows = 1; this.cols = input1DArray.length; this.val.push([...input1DArray]);
        return this;
    }

    //generate a N-by-1 matrix by initializing a range vector [start:end:step]. 
    range(arg1: number, arg2 = null, step = 1): mat {
        var rangeVector = [];
        var start = 0, end = 0;
        if (arg2==null) { start = 0; end = arg1; } // range from 0 to arg1 
        else { start = arg1; end = arg2; } //range from arg1 to arg2
        if (start < end) {
            for (var iterator = start; iterator < end; iterator += step) {
                rangeVector.push(iterator);
            }
            return this.initVec(rangeVector);
        }   
        for (var iterator = start; iterator > end; iterator += step) {  //else
            rangeVector.push(iterator);
        } return this.initVec(rangeVector);
    }

    // return a clone of this matrix
    clone(): mat {
        var returnMat = new mat(); returnMat.rows = this.rows; returnMat.cols = this.cols;
        for (var i = 0; i < this.val.length; i++) returnMat.val.push([...this.val[i]]);
        return returnMat;
    }

    // initialize a matrix by copying from another matrix
    copy(inputMat: mat): mat { this.init(inputMat.val); this.cols = inputMat.cols; this.rows = inputMat.rows; return this; }

    equals(inMat: mat, EPSILON=0.0001): boolean {
        if (this.cols != inMat.cols || this.rows != inMat.rows) return false;
        var sumOfDiff = this.minus(inMat).squareSum();
        return (sumOfDiff<= EPSILON);
    }

    //initialze an row-by-col matrix with all elements are N
    Ns(row: number, col: number, N: number): mat {
        this.clear(); this.rows = row; this.cols = col;
        for (var i = 0; i < row; i++) { this.val.push(Array(col).fill(N)); }
        return this;
    }

    //initialze a zero matrix
    zeros(row: number, col: number): mat { return this.Ns(row, col, 0); }
    ones(row: number, col: number): mat { return this.Ns(row, col, 1); }

    // initiaze an N*N matrix with diag values
    diag(input1DArray: number[]): mat {
        this.clear(); this.zeros(input1DArray.length, input1DArray.length);
        for (var i = 0; i < input1DArray.length; i++) this.val[i][i] = input1DArray[i];
        return this;
    }
    identity(N: number): mat {
        var diag_ones = Array(N).fill(1);
        return this.diag(diag_ones);
    }

    // initialize a random matrix
    random(row: number, col: number): mat {
        this.clear(); this.zeros(row, col);
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) this.val[row][col] = Math.random();
        }
        return this;
    }

    T(): mat { // transpose
        var returnMatrix = new mat().zeros(this.cols, this.rows);
        for (var row = 0; row < this.rows; row++) { for (var col = 0; col < this.cols; col++) returnMatrix.val[col][row] = this.val[row][col]; }
        return returnMatrix;
    }

    transpose(): mat { return this.T(); }

    each(func: Function): mat {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) this.val[row][col] = func(this.val[row][col]);
        }
        return this;
    }

    //get max, min, mean, median value
    max(): number {
        var maxValue = this.val[0][0];
        for (var i = 0; i < this.rows; i++) { for (var j = 0; j < this.cols; j++) { maxValue = Math.max(maxValue, this.val[i][j]); } }
        return maxValue;
    }
    min(): number {
        var minValue = this.val[0][0];
        for (var i = 0; i < this.rows; i++) { for (var j = 0; j < this.cols; j++) { minValue = Math.min(minValue, this.val[i][j]); } }
        return minValue;
    }

    sum(): number {
        var sum = 0;
        for (var i = 0; i < this.rows; i++) { for (var j = 0; j < this.cols; j++) { sum += this.val[i][j]; } }
        return sum;
    }
    mean(): number {
        return this.sum() / (this.rows * this.cols);
    }
    median(): number {
        var sortedValueArray = this.toArray().sort();
        return sortedValueArray.length % 2 == 0 ?
            (sortedValueArray [(sortedValueArray.length) / 2 -1] + sortedValueArray[sortedValueArray.length / 2]) / 2
            : sortedValueArray[(sortedValueArray.length - 1) / 2 ];
    }

    //add, multiply, minus, divide with one scalar value
    adds(val: number): mat { this.each(function (eachMatrixValue: number): number { return eachMatrixValue + val; }); return this; }
    muls(val: number): mat { this.each(function (eachMatrixValue: number): number { return eachMatrixValue * val; }); return this; }
    minuss(val: number): mat { return this.adds(val * (-1)); }
    divs(val: number): mat { return this.muls(1.0 / val); }

    //matrix operations. All matrix operation member functions are NOT In Place
    add(rightMat: mat): mat { return m.add(this, rightMat); }
    minus(rightMat: mat): mat { return m.minus(this, rightMat); }
    mul(rightMat: mat): mat { 
        if (this.GPU == false && rightMat.GPU == false){
            return m.mul(this, rightMat); 
        }
        return m.mul_gpu(this, rightMat);
    }
    mul_gpu(rightMat: mat): mat { var result = m.mul_gpu(this, rightMat); this.copy(result); return this; }



    // matrix plus operator overload
    // mat1 + A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('+')] (rightOperand: mat | number | number[] | number[][]): mat {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            return this.add(new mat(rightOperand));
        } 
        
        //if right operand is a number, add the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.adds(rightOperand);
        }
        //otherwise, add the right operand as a matrix
        return this.add(rightOperand);
    }

    // matrix minus operator overload
    // mat1 - A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('-')] (rightOperand: mat | number| number[] | number[][]): mat {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            return this.minus(new mat(rightOperand));
        } 
        //if right operand is a number, minus the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.minuss(rightOperand);
        }
        //otherwise, minus the right operand as a matrix
        return this.clone().minus(rightOperand);
    }

    // matrix multiply operator overload
    // mat1 * A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('*')] (rightOperand: mat | number| number[] | number[][]): mat {

        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            var rightOperandMatrix = new mat(rightOperand);
            return this.mul(rightOperandMatrix);
        } 

        //if right operand is a number, mul the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.muls(rightOperand);
        }
        //otherwise, multiply the right operand as a matrix
        return this.mul(rightOperand);
    }

    // mat ^ N, the power of a matrix
    // if N == -1, return the inverse matrix
    // otherwise return the result of matrix multiplying itself 
    [Symbol.for('^')] (rightOperand: number): mat {

        if (this.rows != this.cols) throw new Error("This matrix does not support ^ operator");
        //if right operand is -1, return the inverse matrix
        if (rightOperand == -1){
            return m.inverse(this);
        }
        
        //check if rightOperand is an integer
        if (!Number.isInteger(rightOperand) || rightOperand<1) throw new Error("This right operand does not support ^ operator");

        var returnMatrix = this.clone();
        for (var i =2;i<= rightOperand; i++){
            m.mulInPlace(returnMatrix, this);
        }

        return returnMatrix;
    }

    // compare mat1 == mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
    [Symbol.for('==')] (rightOperand: mat | number| number[] | number[][], EPSILON=0.0001): boolean {

        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            var rightOperandMatrix = new mat(rightOperand);
            return this.equals(rightOperandMatrix);
        } 

        //if right operand is a number, mul the number as a scalar
        else if (typeof rightOperand == 'number'){
            if (this.rows != 1 || this.cols != 1)
            {
                throw new Error("This matrix cannot be compared with a scalar");
            }
            return (this.val[0][0] - rightOperand)*(this.val[0][0] - rightOperand) < EPSILON;
        }
        //otherwise, minus the right operand as a matrix
        return this.equals(rightOperand);
    }
    

    //setter and getter
    set(row: number, col: number, val: number): mat { this.dimCheck(row, col); this.val[row][col] = val; return this; }
    get(row: number, col: number): number { this.dimCheck(row, col); return this.val[row][col]; }
    at(row: number, col: number): number { this.dimCheck(row, col); return this.val[row][col]; }

    //get a row vector (as an N-by-1 matrix) by index
    row(rowIndex: number): mat { this.dimCheck(rowIndex, 0); return new mat().initVec(this.val[rowIndex]); }

    //get a column vector (as an N-by-1 matrix) by index
    col(colIndex: number): mat {
        this.dimCheck(0, colIndex); var columnVector = Array(this.rows).fill(0);
        for (var rowPt = 0; rowPt < this.rows; rowPt++) columnVector[rowPt] = this.val[rowPt][colIndex];
        return new mat().initVec(columnVector);
    }

    //return a 2D array
    to2DArray(): number[][] { return this.clone().val; }

    //return a 1D array
    toArray(): number[] { return [].concat(...this.val); }

    //reshape matrix
    reshape(row: number, col: number): mat {
        var returnMatrix = new mat().zeros(row, col); var thisArray = this.toArray(); var arrayPt = 0;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (arrayPt < thisArray.length) { returnMatrix.val[i][j] = thisArray[arrayPt]; arrayPt++; }
                else { break; }
            }
            if (arrayPt >= thisArray.length) break;
        }
        return returnMatrix;
    }

    //resize matrix to a smaller matrix [rowStart , rowEnd), [colStart , colEnd)
    //All extra spaces will be filled with zero
    subMatrix(rowStart: number, rowEnd: number, colStart: number, colEnd: number): mat {

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
    }


    //get a few rows of matrix
    getRows(rowStart: number, rowEnd: number): mat {
        return this.subMatrix(rowStart, rowEnd, 0, this.cols);
    }

    //get a few columns of matrix
    getCols(colStart: number, colEnd: number): mat {
        return this.subMatrix(0, this.rows, colStart, colEnd);
    }

    //resize the matrix to a larger or smaller matrix
    //and fill the extra spaces with defaultValue
    resize(row: number, col: number, defaultValue = 0): mat {
        var returnMatrix = new mat().Ns(row, col, defaultValue);
        var min_row = Math.min(row, this.rows);
        var min_col = Math.min(col, this.cols);
        for (var i = 0; i < min_row; i++) {
            for (var j = 0; j < min_col; j++) {
                returnMatrix.val[i][j] = this.val[i][j];
            }
        }
        return returnMatrix;
    }

    rowVector(row: number): number[] {
        return [...this.val[row]];
    }

    columnVector(col: number): number[] {
        var ret = [];
        for (var i = 0; i < this.rows; i++) ret.push(this.val[i][col]);
        return ret;
    }


    squareSum(): number {
        var ret = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var val = this.val[i][j];
                ret += val * val;
            }
        }
        return ret;
    }

    //return the format of matrix as a CSV string
    toString():string{ return m.mat2csv(this); }

    //output the whole information to console
    log(): mat { console.log(this); return this; }  //output in console

    //append matrix x to the bottom
    //A =  [A]
    //     [x]
    appendInRow(x_:mat): mat{
        var x = x_.clone();
        if (x.cols != this.cols){
            throw new Error('Dimension does not match on  appendInRow()');
        }

        this.val.push(...x.val);
        this.rows +=x.rows;

        return this;
    }

    //append matrix x to the right
    //A = [A|x]
    appendInColumn(x_:mat):mat{
        var x = x_.clone();
        if (x.rows != this.rows){
            throw new Error('Dimension does not match on  appendInColumn()');
        }

        for (var i=0;i<this.rows;i++){
            this.val[i].push(...x.val[i]);
        }
        this.cols += x.cols;

        return this;
    }
}

export { mat };