"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.addInPlace = addInPlace;
exports.minus = minus;
exports.minusInPlace = minusInPlace;
exports.mul = mul;
exports.mulInPlace = mulInPlace;
exports.mul_gpu = mul_gpu;
exports.x_mul_xT = x_mul_xT;
exports.xT_mul_x = xT_mul_x;
exports.dotMul = dotMul;
exports.dotMulInPlace = dotMulInPlace;

var _matrix = require("./matrix");

var _gpu = require("gpu.js");

var gpu = new _gpu.GPU(); //leftMatrix + rightMatrix, save the result into left matrix

function addInPlace(leftMatrix, rightMatrix) {
  if (function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right;
  }(leftMatrix.rows, rightMatrix.rows) || function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("!=")]) return _left2[Symbol.for("!=")](_right2);else return _left2 != _right2;
  }(leftMatrix.cols, rightMatrix.cols)) throw new Error("Dimesion does not match for operation:add");
  var rows = leftMatrix.rows,
      cols = leftMatrix.cols;

  for (var i = 0; function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
  }(i, rows); i++) {
    for (var j = 0; function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("<")]) return _left4[Symbol.for("<")](_right4);else return _left4 < _right4;
    }(j, cols); j++) {
      leftMatrix.val[i][j] += rightMatrix.val[i][j];
    }
  }

  return leftMatrix;
} //leftMatrix + rightMatrix, save the result into a new matrix


function add(leftMat, rightMat) {
  return this.addInPlace(leftMat.clone(), rightMat);
} //leftMatrix - rightMatrix, save the result into left matrix


function minusInPlace(leftMatrix, rightMatrix) {
  if (function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("!=")]) return _left5[Symbol.for("!=")](_right5);else return _left5 != _right5;
  }(leftMatrix.rows, rightMatrix.rows) || function (_left6, _right6) {
    if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("!=")]) return _left6[Symbol.for("!=")](_right6);else return _left6 != _right6;
  }(leftMatrix.cols, rightMatrix.cols)) throw new Error("Dimesion does not match for operation:minus");
  var rows = leftMatrix.rows,
      cols = leftMatrix.cols;

  for (var i = 0; function (_left7, _right7) {
    if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
  }(i, rows); i++) {
    for (var j = 0; function (_left8, _right8) {
      if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("<")]) return _left8[Symbol.for("<")](_right8);else return _left8 < _right8;
    }(j, cols); j++) {
      leftMatrix.val[i][j] -= rightMatrix.val[i][j];
    }
  }

  return leftMatrix;
} //leftMatrix - rightMatrix, save the result into a new matrix


function minus(leftMat, rightMat) {
  return this.addInPlace(leftMat.clone(), rightMat);
} // leftMat * rightMat and return a new matrix


function mul(leftMat, rightMat) {
  if (function (_left9, _right9) {
    if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("!=")]) return _left9[Symbol.for("!=")](_right9);else return _left9 != _right9;
  }(leftMat.cols, rightMat.rows)) throw new Error("Dimesion does not match for operation:muitiply");
  var m = leftMat.rows,
      n = leftMat.cols,
      p = rightMat.cols;
  var returnMatrix = new _matrix.mat().zeros(m, p);

  for (var i = 0; function (_left10, _right10) {
    if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("<")]) return _left10[Symbol.for("<")](_right10);else return _left10 < _right10;
  }(i, m); i++) {
    for (var j = 0; function (_left11, _right11) {
      if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
    }(j, p); j++) {
      var val = 0;

      for (var it = 0; function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("<")]) return _left12[Symbol.for("<")](_right12);else return _left12 < _right12;
      }(it, n); it++) {
        val += function (_left13, _right13) {
          if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("*")]) return _left13[Symbol.for("*")](_right13);else return _left13 * _right13;
        }(leftMat.val[i][it], rightMat.val[it][j]);
      }

      returnMatrix.val[i][j] = val;
    }
  }

  return returnMatrix;
} // leftMat * rightMat and save the result to left matrix


function mulInPlace(leftMat, rightMat) {
  var resultMatrix = this.mul(leftMat, rightMat);
  leftMat.copy(resultMatrix);
  return leftMat;
}

function dotMulInPlace(leftMat, rightMat) {
  if (function (_left14, _right14) {
    if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("!=")]) return _left14[Symbol.for("!=")](_right14);else return _left14 != _right14;
  }(leftMat.rows, rightMat.rows) || function (_left15, _right15) {
    if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("!=")]) return _left15[Symbol.for("!=")](_right15);else return _left15 != _right15;
  }(leftMat.cols, rightMat.cols)) throw new Error("Dimesion does not match for operation:dot muitiply");

  for (var i = 0; function (_left16, _right16) {
    if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
  }(i, leftMat.rows); i++) {
    for (var j = 0; function (_left17, _right17) {
      if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("<")]) return _left17[Symbol.for("<")](_right17);else return _left17 < _right17;
    }(j, leftMat.cols); j++) {
      leftMat.val[i][j] *= rightMat.val[i][j];
    }
  }

  return leftMat;
}

function dotMul(leftMat, rightMat) {
  return dotMulInPlace(leftMat.clone(), rightMat);
} // leftMat * rightMat and save the result to a new operand
// using gpu.js


function mul_gpu(leftMat, rightMat) {
  //const gpu = new gpu();
  var m = leftMat.rows,
      n = leftMat.cols,
      p = rightMat.cols; //here is a tricky thing: if we want to set the for-loop as the column number of left
  //matrix n, it will throw an exception because the oprand 'n' cannot be passed
  //into the backend. So we create the javascript function and compose the raw function
  //string before passing it into the create kernal function of gpu.js

  var mulfunction_part_1 = "function (a, b) {\n    let sum = 0;\n    for (let i = 0; i < ";
  var mulfunction_part_2 = "; i++) {\n        sum += a[this.thread.y][i] * b[i][this.thread.x];\n    }\n    return sum;\n}";

  var mulfunction_string = function (_left18, _right18) {
    if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("+")]) return _left18[Symbol.for("+")](_right18);else return _left18 + _right18;
  }(function (_left19, _right19) {
    if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("+")]) return _left19[Symbol.for("+")](_right19);else return _left19 + _right19;
  }(mulfunction_part_1, n.toString()), mulfunction_part_2);

  var multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([m, p]);
  var c = multiplyMatrix(leftMat.val, rightMat.val);
  var returnMat = new _matrix.mat();
  returnMat.val = c;
  returnMat.rows = m;
  returnMat.cols = p;
  return returnMat;
} //calculate y = x*x'


function x_mul_xT(inMat) {
  var x_row = inMat.rows;
  var x_col = inMat.cols; //the return matrix is x_row by x_row

  var mulfunction_part_1 = "function (a) {\n    let sum = 0;\n    for (let i = 0; i < ";
  var mulfunction_part_2 = "; i++) {\n        sum += a[this.thread.y][i] * a[i][this.thread.x];\n    }\n    return sum;\n}";

  var mulfunction_string = function (_left20, _right20) {
    if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("+")]) return _left20[Symbol.for("+")](_right20);else return _left20 + _right20;
  }(function (_left21, _right21) {
    if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("+")]) return _left21[Symbol.for("+")](_right21);else return _left21 + _right21;
  }(mulfunction_part_1, x_col.toString()), mulfunction_part_2);

  var multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([x_row, x_row]);
  var c = multiplyMatrix(inMat.val);
  var returnMat = new _matrix.mat();
  returnMat.val = c;
  returnMat.rows = x_row;
  returnMat.cols = x_row;
  return returnMat;
} //calculate y = x*x'


function xT_mul_x(inMat) {
  var x_row = inMat.rows;
  var x_col = inMat.cols; //the return matrix is x_row by x_row

  var mulfunction_part_1 = "function (a) {\n    let sum = 0;\n    for (let i = 0; i < ";
  var mulfunction_part_2 = "; i++) {\n        sum += a[i][this.thread.x] * a[this.thread.y][i];\n    }\n    return sum;\n}";

  var mulfunction_string = function (_left22, _right22) {
    if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("+")]) return _left22[Symbol.for("+")](_right22);else return _left22 + _right22;
  }(function (_left23, _right23) {
    if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("+")]) return _left23[Symbol.for("+")](_right23);else return _left23 + _right23;
  }(mulfunction_part_1, x_col.toString()), mulfunction_part_2);

  var multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([x_row, x_row]);
  var c = multiplyMatrix(inMat.val);
  var returnMat = new _matrix.mat();
  returnMat.val = c;
  returnMat.rows = x_row;
  returnMat.cols = x_row;
  return returnMat;
}