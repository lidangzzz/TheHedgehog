"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LU = LU;
exports.LUresult = void 0;

var _matrix = require("../matrix/matrix");

function _classCallCheck(instance, Constructor) { if (!function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("instanceof")]) return _left[Symbol.for("instanceof")](_right);else return _left instanceof _right; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//this is an implementation of LUP decomposition using CPU by Math.js (https://github.com/josdejong/mathjs)
//reference: https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/algebra/decomposition/lup.js
var LUresult = function LUresult(l, u, p_) {
  _classCallCheck(this, LUresult);

  this.L = l;
  this.U = u;
  this.p = p_;
};

exports.LUresult = LUresult;

function LU(m_) {
  var m = m_.clone();
  var rows = m.rows;
  var cols = m.cols;
  var n = Math.min(rows, cols); //allocate L,U,p matrix

  var L = new _matrix.mat().zeros(rows, n);
  var U = new _matrix.mat().zeros(n, cols); // permutation vector

  var p = new Array(rows).fill(0);

  for (var i = 0; function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
  }(i, rows); i++) {
    p[i] = i;
  }

  for (var j = 0; function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
  }(j, cols); j++) {
    // skip first column in upper triangular matrix
    if (function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for(">")]) return _left4[Symbol.for(">")](_right4);else return _left4 > _right4;
    }(j, 0)) {
      for (var i = 0; function (_left5, _right5) {
        if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5;
      }(i, rows); i++) {
        var min = Math.min(i, j); // v[i, j]

        var s = 0;

        for (var k = 0; function (_left6, _right6) {
          if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("<")]) return _left6[Symbol.for("<")](_right6);else return _left6 < _right6;
        }(k, min); k++) {
          s += function (_left7, _right7) {
            if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("*")]) return _left7[Symbol.for("*")](_right7);else return _left7 * _right7;
          }(m.val[i][k], m.val[k][j]);
        }

        m.val[i][j] -= s;
      }
    } // row with larger value in cvector, row >= j


    var pi = j;
    var pabsv = 0;
    var vjj = 0;

    for (var i = j; function (_left8, _right8) {
      if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("<")]) return _left8[Symbol.for("<")](_right8);else return _left8 < _right8;
    }(i, rows); i++) {
      var v = m.val[i][j];
      var v_abs = Math.abs(v);

      if (function (_left9, _right9) {
        if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for(">")]) return _left9[Symbol.for(">")](_right9);else return _left9 > _right9;
      }(v_abs, pabsv)) {
        pi = i;
        pabsv = v_abs;
        vjj = v;
      }
    }

    if (function (_left10, _right10) {
      if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("!=")]) return _left10[Symbol.for("!=")](_right10);else return _left10 != _right10;
    }(j, pi)) {
      // swap values j <-> pi in p
      p[j] = [p[pi], p[pi] = p[j]][0]; // swap j <-> pi in data

      swap_row(m, pi, j);
    } // check column is in lower triangular matrix


    if (function (_left11, _right11) {
      if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
    }(j, rows)) {
      // loop rows (lower triangular matrix)
      for (var i = function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("+")]) return _left12[Symbol.for("+")](_right12);else return _left12 + _right12;
      }(j, 1); function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("<")]) return _left13[Symbol.for("<")](_right13);else return _left13 < _right13;
      }(i, rows); i++) {
        if (function (_left14, _right14) {
          if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("!=")]) return _left14[Symbol.for("!=")](_right14);else return _left14 != _right14;
        }(m.val[i][j], 0)) {
          m.val[i][j] = function (_left15, _right15) {
            if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("/")]) return _left15[Symbol.for("/")](_right15);else return _left15 / _right15;
          }(m.val[i][j], vjj);
        }
      }
    }
  } //loop column


  for (j = 0; function (_left16, _right16) {
    if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
  }(j, cols); j++) {
    // loop rows
    for (i = 0; function (_left17, _right17) {
      if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("<")]) return _left17[Symbol.for("<")](_right17);else return _left17 < _right17;
    }(i, rows); i++) {
      // initialize row in arrays
      if (function (_left18, _right18) {
        if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("===")]) return _left18[Symbol.for("===")](_right18);else return _left18 === _right18;
      }(j, 0)) {
        // check row exists in upper triangular matrix
        if (function (_left19, _right19) {
          if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("<")]) return _left19[Symbol.for("<")](_right19);else return _left19 < _right19;
        }(i, cols)) {
          // U
          U.val[i] = [];
        } // L


        L.val[i] = [];
      } // check we are in the upper triangular matrix


      if (function (_left20, _right20) {
        if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("<")]) return _left20[Symbol.for("<")](_right20);else return _left20 < _right20;
      }(i, j)) {
        // check row exists in upper triangular matrix
        if (function (_left21, _right21) {
          if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("<")]) return _left21[Symbol.for("<")](_right21);else return _left21 < _right21;
        }(i, cols)) {
          // U
          U.val[i][j] = m.val[i][j];
        } // check column exists in lower triangular matrix


        if (function (_left22, _right22) {
          if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("<")]) return _left22[Symbol.for("<")](_right22);else return _left22 < _right22;
        }(j, rows)) {
          // L
          L.val[i][j] = 0;
        }

        continue;
      } // diagonal value


      if (function (_left23, _right23) {
        if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("===")]) return _left23[Symbol.for("===")](_right23);else return _left23 === _right23;
      }(i, j)) {
        // check row exists in upper triangular matrix
        if (function (_left24, _right24) {
          if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("<")]) return _left24[Symbol.for("<")](_right24);else return _left24 < _right24;
        }(i, cols)) {
          // U
          U.val[i][j] = m.val[i][j];
        } // check column exists in lower triangular matrix


        if (function (_left25, _right25) {
          if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("<")]) return _left25[Symbol.for("<")](_right25);else return _left25 < _right25;
        }(j, rows)) {
          // L
          L.val[i][j] = 1;
        }

        continue;
      } // check row exists in upper triangular matrix


      if (function (_left26, _right26) {
        if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("<")]) return _left26[Symbol.for("<")](_right26);else return _left26 < _right26;
      }(i, cols)) {
        // U
        U.val[i][j] = 0;
      } // check column exists in lower triangular matrix


      if (function (_left27, _right27) {
        if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("<")]) return _left27[Symbol.for("<")](_right27);else return _left27 < _right27;
      }(j, rows)) {
        // L
        L.val[i][j] = m.val[i][j];
      }
    }
  }

  var p_vec = [];

  for (var i = 0, n = p.length; function (_left28, _right28) {
    if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("<")]) return _left28[Symbol.for("<")](_right28);else return _left28 < _right28;
  }(i, n); i++) {
    p_vec[p[i]] = i;
  }

  var p_mat = new _matrix.mat().initVec(p_vec);
  return new LUresult(L, U, p_mat);
}

function swap_row(m, r1, r2) {
  for (var i = 0; function (_left29, _right29) {
    if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("<")]) return _left29[Symbol.for("<")](_right29);else return _left29 < _right29;
  }(i, m.cols); i++) {
    var temp = m.val[r1][i];
    m.val[r1][i] = m.val[r2][i];
    m.val[r2][i] = temp;
  }
}