import { mat } from './matrix';
import { GPU as gpu_ } from 'gpu.js';
const gpu = new gpu_();

//leftMatrix + rightMatrix, save the result into left matrix
function addInPlace(leftMatrix: mat, rightMatrix: mat): mat {
    if (leftMatrix.rows != rightMatrix.rows || leftMatrix.cols != rightMatrix.cols) throw new Error("Dimesion does not match for operation:add");
    var rows = leftMatrix.rows, cols = leftMatrix.cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            leftMatrix.val[i][j] += rightMatrix.val[i][j];
        }
    }
    return leftMatrix;
}

//leftMatrix + rightMatrix, save the result into a new matrix
function add(leftMat: mat, rightMat: mat): mat {
    return this.addInPlace(leftMat.clone(), rightMat);
}

//leftMatrix - rightMatrix, save the result into left matrix
function minusInPlace(leftMatrix: mat, rightMatrix: mat): mat {
    if (leftMatrix.rows != rightMatrix.rows || leftMatrix.cols != rightMatrix.cols) throw new Error("Dimesion does not match for operation:minus");
    var rows = leftMatrix.rows, cols = leftMatrix.cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            leftMatrix.val[i][j] -= rightMatrix.val[i][j];
        }
    }
    return leftMatrix;
}

//leftMatrix - rightMatrix, save the result into a new matrix
function minus(leftMat: mat, rightMat: mat): mat {
    return this.minusInPlace(leftMat.clone(), rightMat);
}


// leftMat * rightMat and return a new matrix
function mul(leftMat: mat, rightMat: mat): mat {
    if (leftMat.cols != rightMat.rows) throw new Error("Dimesion does not match for operation:muitiply");
    var m = leftMat.rows, n = leftMat.cols, p = rightMat.cols;
    var returnMatrix = new mat().zeros(m, p);
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < p; j++) {
            var val = 0;
            for (var it = 0; it < n; it++) val += leftMat.val[i][it] * rightMat.val[it][j];
            returnMatrix.val[i][j] = val;
        }
    }
    return returnMatrix;
}

// leftMat * rightMat and save the result to left matrix
function mulInPlace(leftMat: mat, rightMat: mat): mat {
    var resultMatrix = this.mul(leftMat, rightMat);
    leftMat.copy(resultMatrix);
    return leftMat;
}

function dotMulInPlace(leftMat: mat, rightMat: mat): mat {
    if (leftMat.rows != rightMat.rows || leftMat.cols != rightMat.cols) throw new Error("Dimesion does not match for operation:dot muitiply");
    for (var i = 0; i < leftMat.rows; i++) {
        for (var j = 0; j < leftMat.cols; j++) {
            leftMat.val[i][j] *= rightMat.val[i][j]; 
        }
    }
    return leftMat;
}

function dotMul(leftMat: mat, rightMat: mat): mat {
    return dotMulInPlace(leftMat.clone(), rightMat);
}


// leftMat * rightMat and save the result to a new operand
// using gpu.js
function mul_gpu(leftMat: mat, rightMat: mat): mat {
    //const gpu = new gpu();
    const m = leftMat.rows, n = leftMat.cols, p = rightMat.cols;


    //here is a tricky thing: if we want to set the for-loop as the column number of left
    //matrix n, it will throw an exception because the oprand 'n' cannot be passed
    //into the backend. So we create the javascript function and compose the raw function
    //string before passing it into the create kernal function of gpu.js
    const mulfunction_part_1 = `function (a, b) {
    let sum = 0;
    for (let i = 0; i < `;

    const mulfunction_part_2 = `; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}`;

    const mulfunction_string = mulfunction_part_1 + n.toString() + mulfunction_part_2;

    const multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([m,p]);


    const c = multiplyMatrix(leftMat.val, rightMat.val) as number[][];
    var returnMat = new mat();
    returnMat.val = c;
    returnMat.rows = m; returnMat.cols = p;
    return returnMat;
}

//calculate y = x*x'
function x_mul_xT(inMat: mat): mat {

    var x_row = inMat.rows;
    var x_col = inMat.cols;

    //the return matrix is x_row by x_row

    const mulfunction_part_1 = `function (a) {
    let sum = 0;
    for (let i = 0; i < `;

    const mulfunction_part_2 = `; i++) {
        sum += a[this.thread.y][i] * a[i][this.thread.x];
    }
    return sum;
}`;


    const mulfunction_string = mulfunction_part_1 + x_col.toString() + mulfunction_part_2;
    const multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([x_row, x_row]);
    const c = multiplyMatrix(inMat.val) as number[][];
    var returnMat = new mat();
    returnMat.val = c;
    returnMat.rows = x_row; returnMat.cols = x_row;
    return returnMat;
}


//calculate y = x*x'
function xT_mul_x(inMat: mat): mat {

    var x_row = inMat.rows;
    var x_col = inMat.cols;

    //the return matrix is x_row by x_row

    const mulfunction_part_1 = `function (a) {
    let sum = 0;
    for (let i = 0; i < `;

    const mulfunction_part_2 = `; i++) {
        sum += a[i][this.thread.x] * a[this.thread.y][i];
    }
    return sum;
}`;


    const mulfunction_string = mulfunction_part_1 + x_col.toString() + mulfunction_part_2;
    const multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([x_row, x_row]);
    const c = multiplyMatrix(inMat.val) as number[][];
    var returnMat = new mat();
    returnMat.val = c;
    returnMat.rows = x_row; returnMat.cols = x_row;
    return returnMat;
}



export { add, addInPlace, minus, minusInPlace, mul, mulInPlace, mul_gpu, x_mul_xT, xT_mul_x, dotMul, dotMulInPlace};
