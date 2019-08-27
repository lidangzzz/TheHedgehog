import { mat } from './matrix';
import { op } from './operator';
import {mean, std } from './vector';
import 'assert';//assert = require('assert');

export function matrixTest() {
    matrixAllocationTest();
    matrixClearTest();
    matrixVectorInitializationTest();
    matrixRangeTest();
    matrixCloneAndCopyTest();
    matrixInitTest();
    matrixOperationTest();
}

function vcectorTest() {
    assert.ok(mean([1, 2, 3]) == 2 && std([1,2,3])==1, "vector test shouldn't fail.");
}

function matrixAllocationTest(){
    var tmat = new mat().init([[1, 2], [3, 4]]);
    assert.ok(tmat.val[0][0] == 1 && tmat.val[0][1] == 2 && tmat.val[1][0] == 3 && tmat.val[1][1] == 4 && tmat.rows == 2 && tmat.cols == 2, "matrix allocation test shouldn't fail.");
}

function matrixClearTest() {
    var tmat = new mat().init([[1, 2], [3, 4]]);
    tmat.clear();
    assert(tmat.val.length == 0 && tmat.rows == 0 && tmat.cols == 0, "matrix free test shouldn't fail.");
}

function matrixVectorInitializationTest() {
    var tmat = new mat().initVec([1, 2, 3]);
    assert.ok(tmat.val.length == 1 && tmat.val[0].length==3 && tmat.rows == 1 && tmat.cols == 3, "vector unit tet shouldn't fail.");
}

function matrixRangeTest() {
    var mat1 = new mat().range(1, 10, 2);
    assert.ok(mat1.val[0][0] == 1 && mat1.val[0][4] == 9 && mat1.rows == 1 && mat1.cols == 5, "matrix range test 1 shouldn't fail.");
    var mat2 = new mat().range(5, 1, -2);
    assert.ok(mat2.val[0][0] == 5 && mat2.val[0][1] == 3 && mat2.cols == 2, "matrix range test 2 shouldn't fail.");
}

function matrixCloneAndCopyTest() {
    var mat1 = new mat().range(1, 4);
    var mat2 = mat1.clone();
    var mat3 = new mat().copy(mat1);
    mat2.val[0][0] = 2;
    mat1.val[0][0] = 3;
    assert(mat1.val[0][0] == 3 && mat2.val[0][0] == 2 && mat3.val[0][0] == 1, "clone and copy test shouldn't fail");
}

function matrixInitTest() {
    var m1 = new mat().Ns(3, 3, 1);
    var m2 = new mat().ones(3, 3);
    var m3 = new mat().Ns(3, 3, 0);
    var m4 = new mat().zeros(3, 3);
    var m5 = new mat().diag([1, 2,3]);
    var m6 = new mat().zeros(3, 3).set(0, 0, 1).set(1, 1, 2).set(2, 2, 3);
    assert(m1.equals(m2) && m3.equals(m4) && m5.equals(m6), "init test shouldn't fail");

    assert(new mat().range(1, 2).reshape(2, 2).equals(new mat().init([[1, 0], [0, 0]])), "init test shouldn't fail");
    var m7 = new mat().range(1, 100).reshape(2, 2);
    assert(m7.rows ==2 && m7.cols==2, "init test shouldn't fail");
}

function matrixOperationTest() {
    var msg = "operation test shouldn't fail";
    assert(new mat().range(1, 10).reshape(3, 3).equals(new mat().init([[1, 2, 3], [4, 5, 6], [7, 8, 9]])), msg);
    assert(new mat().range(1, 10).reshape(3, 3).T().equals(new mat().init([[1, 4, 7], [2, 5, 8], [3, 6, 9]])), msg);
    assert(new mat().range(0, 9).reshape(3, 3).each(x => x + 1).equals(new mat().range(1, 10).reshape(3, 3)), msg);
    var m1 = new mat().range(1, 10).reshape(3, 3);
    assert(m1.min() == 1 && m1.max() == 9, msg);
    assert(m1.mean() == 5 && m1.sum() == 45 && m1.median() == 5 , msg);
    assert(new mat().range(0, 9).reshape(3, 3).adds(1).equals(m1), msg);
    assert(new mat().range(2, 11).reshape(3, 3).minuss(1).equals(m1), msg);
    assert(m1.muls(2).equals(new mat().range(2, 20, 2).reshape(3, 3)), msg);
    assert(m1.divs(2).equals(new mat().range(1, 10).reshape(3, 3)), msg);
    //console.log(new mat().range(1, 10).reshape(2, 4).median());
    assert(new mat().range(1, 10).reshape(2, 4).median() == 4.5, msg);
}

function matrixOperationGPUTest() {
    var msg = "operation test shouldn't fail";
    const ot = new op();
    var msg = "operation test shouldn't fail";
    var m1 = new mat().range(1, 10).reshape(2,2);
    var m2 = new mat().range(1, 10).reshape(2, 2);
    var r = new mat().init([[7, 10], [15, 22]]);
    assert(ot.mul(m1, m2).equals(r), msg);
    assert(ot.mul_gpu(m1, m2).equals(r), msg);
    var r2 = new mat().init([[5, 11], [11, 25]]);
    assert(ot.x_mul_xT(m1).equals(r2), msg);
}