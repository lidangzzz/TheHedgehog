"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixTest = matrixTest;

var _matrix = require("./matrix");

var _operator = require("./operator");

var _vector = require("./vector");

require("assert");

//assert = require('assert');
function matrixTest() {
  matrixAllocationTest();
  matrixClearTest();
  matrixVectorInitializationTest();
  matrixRangeTest();
  matrixCloneAndCopyTest();
  matrixInitTest();
  matrixOperationTest();
}

function vcectorTest() {
  assert.ok(function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("==")]) return _left[Symbol.for("==")](_right);else return _left == _right;
  }((0, _vector.mean)([1, 2, 3]), 2) && function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("==")]) return _left2[Symbol.for("==")](_right2);else return _left2 == _right2;
  }((0, _vector.std)([1, 2, 3]), 1), "vector test shouldn't fail.");
}

function matrixAllocationTest() {
  var tmat = new _matrix.mat().init([[1, 2], [3, 4]]);
  assert.ok(function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("==")]) return _left3[Symbol.for("==")](_right3);else return _left3 == _right3;
  }(tmat.val[0][0], 1) && function (_left4, _right4) {
    if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("==")]) return _left4[Symbol.for("==")](_right4);else return _left4 == _right4;
  }(tmat.val[0][1], 2) && function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("==")]) return _left5[Symbol.for("==")](_right5);else return _left5 == _right5;
  }(tmat.val[1][0], 3) && function (_left6, _right6) {
    if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("==")]) return _left6[Symbol.for("==")](_right6);else return _left6 == _right6;
  }(tmat.val[1][1], 4) && function (_left7, _right7) {
    if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("==")]) return _left7[Symbol.for("==")](_right7);else return _left7 == _right7;
  }(tmat.rows, 2) && function (_left8, _right8) {
    if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("==")]) return _left8[Symbol.for("==")](_right8);else return _left8 == _right8;
  }(tmat.cols, 2), "matrix allocation test shouldn't fail.");
}

function matrixClearTest() {
  var tmat = new _matrix.mat().init([[1, 2], [3, 4]]);
  tmat.clear();
  assert(function (_left9, _right9) {
    if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("==")]) return _left9[Symbol.for("==")](_right9);else return _left9 == _right9;
  }(tmat.val.length, 0) && function (_left10, _right10) {
    if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("==")]) return _left10[Symbol.for("==")](_right10);else return _left10 == _right10;
  }(tmat.rows, 0) && function (_left11, _right11) {
    if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("==")]) return _left11[Symbol.for("==")](_right11);else return _left11 == _right11;
  }(tmat.cols, 0), "matrix free test shouldn't fail.");
}

function matrixVectorInitializationTest() {
  var tmat = new _matrix.mat().initVec([1, 2, 3]);
  assert.ok(function (_left12, _right12) {
    if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("==")]) return _left12[Symbol.for("==")](_right12);else return _left12 == _right12;
  }(tmat.val.length, 1) && function (_left13, _right13) {
    if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("==")]) return _left13[Symbol.for("==")](_right13);else return _left13 == _right13;
  }(tmat.val[0].length, 3) && function (_left14, _right14) {
    if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("==")]) return _left14[Symbol.for("==")](_right14);else return _left14 == _right14;
  }(tmat.rows, 1) && function (_left15, _right15) {
    if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("==")]) return _left15[Symbol.for("==")](_right15);else return _left15 == _right15;
  }(tmat.cols, 3), "vector unit tet shouldn't fail.");
}

function matrixRangeTest() {
  var mat1 = new _matrix.mat().range(1, 10, 2);
  assert.ok(function (_left16, _right16) {
    if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("==")]) return _left16[Symbol.for("==")](_right16);else return _left16 == _right16;
  }(mat1.val[0][0], 1) && function (_left17, _right17) {
    if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("==")]) return _left17[Symbol.for("==")](_right17);else return _left17 == _right17;
  }(mat1.val[0][4], 9) && function (_left18, _right18) {
    if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("==")]) return _left18[Symbol.for("==")](_right18);else return _left18 == _right18;
  }(mat1.rows, 1) && function (_left19, _right19) {
    if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("==")]) return _left19[Symbol.for("==")](_right19);else return _left19 == _right19;
  }(mat1.cols, 5), "matrix range test 1 shouldn't fail.");
  var mat2 = new _matrix.mat().range(5, 1, -2);
  assert.ok(function (_left20, _right20) {
    if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("==")]) return _left20[Symbol.for("==")](_right20);else return _left20 == _right20;
  }(mat2.val[0][0], 5) && function (_left21, _right21) {
    if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("==")]) return _left21[Symbol.for("==")](_right21);else return _left21 == _right21;
  }(mat2.val[0][1], 3) && function (_left22, _right22) {
    if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("==")]) return _left22[Symbol.for("==")](_right22);else return _left22 == _right22;
  }(mat2.cols, 2), "matrix range test 2 shouldn't fail.");
}

function matrixCloneAndCopyTest() {
  var mat1 = new _matrix.mat().range(1, 4);
  var mat2 = mat1.clone();
  var mat3 = new _matrix.mat().copy(mat1);
  mat2.val[0][0] = 2;
  mat1.val[0][0] = 3;
  assert(function (_left23, _right23) {
    if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("==")]) return _left23[Symbol.for("==")](_right23);else return _left23 == _right23;
  }(mat1.val[0][0], 3) && function (_left24, _right24) {
    if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("==")]) return _left24[Symbol.for("==")](_right24);else return _left24 == _right24;
  }(mat2.val[0][0], 2) && function (_left25, _right25) {
    if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("==")]) return _left25[Symbol.for("==")](_right25);else return _left25 == _right25;
  }(mat3.val[0][0], 1), "clone and copy test shouldn't fail");
}

function matrixInitTest() {
  var m1 = new _matrix.mat().Ns(3, 3, 1);
  var m2 = new _matrix.mat().ones(3, 3);
  var m3 = new _matrix.mat().Ns(3, 3, 0);
  var m4 = new _matrix.mat().zeros(3, 3);
  var m5 = new _matrix.mat().diag([1, 2, 3]);
  var m6 = new _matrix.mat().zeros(3, 3).set(0, 0, 1).set(1, 1, 2).set(2, 2, 3);
  assert(m1.equals(m2) && m3.equals(m4) && m5.equals(m6), "init test shouldn't fail");
  assert(new _matrix.mat().range(1, 2).reshape(2, 2).equals(new _matrix.mat().init([[1, 0], [0, 0]])), "init test shouldn't fail");
  var m7 = new _matrix.mat().range(1, 100).reshape(2, 2);
  assert(function (_left26, _right26) {
    if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("==")]) return _left26[Symbol.for("==")](_right26);else return _left26 == _right26;
  }(m7.rows, 2) && function (_left27, _right27) {
    if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("==")]) return _left27[Symbol.for("==")](_right27);else return _left27 == _right27;
  }(m7.cols, 2), "init test shouldn't fail");
}

function matrixOperationTest() {
  var msg = "operation test shouldn't fail";
  assert(new _matrix.mat().range(1, 10).reshape(3, 3).equals(new _matrix.mat().init([[1, 2, 3], [4, 5, 6], [7, 8, 9]])), msg);
  assert(new _matrix.mat().range(1, 10).reshape(3, 3).T().equals(new _matrix.mat().init([[1, 4, 7], [2, 5, 8], [3, 6, 9]])), msg);
  assert(new _matrix.mat().range(0, 9).reshape(3, 3).each(function (x) {
    return function (_left28, _right28) {
      if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("+")]) return _left28[Symbol.for("+")](_right28);else return _left28 + _right28;
    }(x, 1);
  }).equals(new _matrix.mat().range(1, 10).reshape(3, 3)), msg);
  var m1 = new _matrix.mat().range(1, 10).reshape(3, 3);
  assert(function (_left29, _right29) {
    if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("==")]) return _left29[Symbol.for("==")](_right29);else return _left29 == _right29;
  }(m1.min(), 1) && function (_left30, _right30) {
    if (_left30 !== null && _left30 !== undefined && _left30[Symbol.for("==")]) return _left30[Symbol.for("==")](_right30);else return _left30 == _right30;
  }(m1.max(), 9), msg);
  assert(function (_left31, _right31) {
    if (_left31 !== null && _left31 !== undefined && _left31[Symbol.for("==")]) return _left31[Symbol.for("==")](_right31);else return _left31 == _right31;
  }(m1.mean(), 5) && function (_left32, _right32) {
    if (_left32 !== null && _left32 !== undefined && _left32[Symbol.for("==")]) return _left32[Symbol.for("==")](_right32);else return _left32 == _right32;
  }(m1.sum(), 45) && function (_left33, _right33) {
    if (_left33 !== null && _left33 !== undefined && _left33[Symbol.for("==")]) return _left33[Symbol.for("==")](_right33);else return _left33 == _right33;
  }(m1.median(), 5), msg);
  assert(new _matrix.mat().range(0, 9).reshape(3, 3).adds(1).equals(m1), msg);
  assert(new _matrix.mat().range(2, 11).reshape(3, 3).minuss(1).equals(m1), msg);
  assert(m1.muls(2).equals(new _matrix.mat().range(2, 20, 2).reshape(3, 3)), msg);
  assert(m1.divs(2).equals(new _matrix.mat().range(1, 10).reshape(3, 3)), msg); //console.log(new mat().range(1, 10).reshape(2, 4).median());

  assert(function (_left34, _right34) {
    if (_left34 !== null && _left34 !== undefined && _left34[Symbol.for("==")]) return _left34[Symbol.for("==")](_right34);else return _left34 == _right34;
  }(new _matrix.mat().range(1, 10).reshape(2, 4).median(), 4.5), msg);
}

function matrixOperationGPUTest() {
  var msg = "operation test shouldn't fail";
  var ot = new _operator.op();
  var msg = "operation test shouldn't fail";
  var m1 = new _matrix.mat().range(1, 10).reshape(2, 2);
  var m2 = new _matrix.mat().range(1, 10).reshape(2, 2);
  var r = new _matrix.mat().init([[7, 10], [15, 22]]);
  assert(ot.mul(m1, m2).equals(r), msg);
  assert(ot.mul_gpu(m1, m2).equals(r), msg);
  var r2 = new _matrix.mat().init([[5, 11], [11, 25]]);
  assert(ot.x_mul_xT(m1).equals(r2), msg);
}