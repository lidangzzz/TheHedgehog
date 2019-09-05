"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVD = SVD;
exports.SVDresult = void 0;

var _matrix = require("../matrix/matrix");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; function (_left177, _right177) { if (_left177 !== null && _left177 !== undefined && _left177[Symbol.for("<")]) return _left177[Symbol.for("<")](_right177);else return _left177 < _right177; }(i, arguments.length); i++) { var source = function (_left178, _right178) { if (_left178 !== null && _left178 !== undefined && _left178[Symbol.for("!=")]) return _left178[Symbol.for("!=")](_right178);else return _left178 != _right178; }(arguments[i], null) ? arguments[i] : {}; if (function (_left179, _right179) { if (_left179 !== null && _left179 !== undefined && _left179[Symbol.for("%")]) return _left179[Symbol.for("%")](_right179);else return _left179 % _right179; }(i, 2)) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (function (_left180, _right180) { if (_left180 !== null && _left180 !== undefined && _left180[Symbol.for("in")]) return _left180[Symbol.for("in")](_right180);else return _left180 in _right180; }(key, obj)) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("instanceof")]) return _left[Symbol.for("instanceof")](_right);else return _left instanceof _right; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Source code from: https://github.com/stardisblue/svdjs/blob/master/src/index.ts
//Author: stardisblue
var SVDresult = function SVDresult(q_, U_, V_) {
  _classCallCheck(this, SVDresult);

  this.q = q_;
  this.U = U_;
  this.V = V_;
};

exports.SVDresult = SVDresult;

function SVD(A) {
  var ret = SVD_(A.val);
  return new SVDresult(new _matrix.mat().initVec(ret.q), new _matrix.mat().init(ret.u), new _matrix.mat().init(ret.v));
}

/** SVD procedure as explained in "Singular Value Decomposition and Least Squares Solutions. By G.H. Golub et al."
 *
 * This procedure computes the singular values and complete orthogonal decomposition of a real rectangular matrix A:
 *
 * `A = U * diag(q) * V(t), U(t) * U = V(t) * V = I`
 *
 * where the arrays `a`, `u`, `v`, `q` represent `A`, `U`, `V`, `q` respectively. The actual parameters corresponding to `a`, `u`, `v` may
 * all be identical unless `withu = withv = true`. In this case, the actual parameters corresponding to `u` and `v` must
 * differ. `m >= n` is assumed (with `m = a.length` and `n = a[0].length`)
 *
 *  @param a  Represents the matrix A to be decomposed
 *  @param options SVD options
 *
 * @returns {SVDResult} the result of the svd
 */
function SVD_(a, options) {
  var _u$v$eps$options = _objectSpread({
    u: true,
    v: true,
    eps: Math.pow(2, -52)
  }, options),
      withu = _u$v$eps$options.u,
      withv = _u$v$eps$options.v,
      eps = _u$v$eps$options.eps;

  var tol = function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("/")]) return _left2[Symbol.for("/")](_right2);else return _left2 / _right2;
  }(1e-64, eps); // throw error if a is not defined


  if (!a) {
    throw new TypeError("Matrix a is not defined");
  } // Householder's reduction to bidiagonal form


  var n = a[0].length;
  var m = a.length;

  if (function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
  }(m, n)) {
    throw new TypeError("Invalid matrix: m < n");
  }

  var l1, c, f, h, s, y, z;
  var l = 0,
      g = 0,
      x = 0;
  var e = [];
  var u = [];
  var v = []; // Initialize u

  for (var i = 0; function (_left4, _right4) {
    if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("<")]) return _left4[Symbol.for("<")](_right4);else return _left4 < _right4;
  }(i, m); i++) {
    u[i] = new Array(n).fill(0);
  } // Initialize v


  for (var _i = 0; function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5;
  }(_i, n); _i++) {
    v[_i] = new Array(n).fill(0);
  } // Initialize q


  var q = new Array(n).fill(0); // Copy array a in u

  for (var _i2 = 0; function (_left6, _right6) {
    if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("<")]) return _left6[Symbol.for("<")](_right6);else return _left6 < _right6;
  }(_i2, m); _i2++) {
    for (var j = 0; function (_left7, _right7) {
      if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
    }(j, n); j++) {
      u[_i2][j] = a[_i2][j];
    }
  }

  for (var _i3 = 0; function (_left8, _right8) {
    if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("<")]) return _left8[Symbol.for("<")](_right8);else return _left8 < _right8;
  }(_i3, n); _i3++) {
    e[_i3] = g;
    s = 0;

    l = function (_left9, _right9) {
      if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("+")]) return _left9[Symbol.for("+")](_right9);else return _left9 + _right9;
    }(_i3, 1);

    for (var _j = _i3; function (_left10, _right10) {
      if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("<")]) return _left10[Symbol.for("<")](_right10);else return _left10 < _right10;
    }(_j, m); _j++) {
      s += Math.pow(u[_j][_i3], 2);
    }

    if (function (_left11, _right11) {
      if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
    }(s, tol)) {
      g = 0;
    } else {
      f = u[_i3][_i3];
      g = function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("<")]) return _left12[Symbol.for("<")](_right12);else return _left12 < _right12;
      }(f, 0) ? Math.sqrt(s) : -Math.sqrt(s);

      h = function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("-")]) return _left13[Symbol.for("-")](_right13);else return _left13 - _right13;
      }(function (_left14, _right14) {
        if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("*")]) return _left14[Symbol.for("*")](_right14);else return _left14 * _right14;
      }(f, g), s);

      u[_i3][_i3] = function (_left15, _right15) {
        if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("-")]) return _left15[Symbol.for("-")](_right15);else return _left15 - _right15;
      }(f, g);

      for (var _j2 = l; function (_left16, _right16) {
        if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
      }(_j2, n); _j2++) {
        s = 0;

        for (var k = _i3; function (_left17, _right17) {
          if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("<")]) return _left17[Symbol.for("<")](_right17);else return _left17 < _right17;
        }(k, m); k++) {
          s += function (_left18, _right18) {
            if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("*")]) return _left18[Symbol.for("*")](_right18);else return _left18 * _right18;
          }(u[k][_i3], u[k][_j2]);
        }

        f = function (_left19, _right19) {
          if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("/")]) return _left19[Symbol.for("/")](_right19);else return _left19 / _right19;
        }(s, h);

        for (var _k = _i3; function (_left20, _right20) {
          if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("<")]) return _left20[Symbol.for("<")](_right20);else return _left20 < _right20;
        }(_k, m); _k++) {
          u[_k][_j2] = function (_left21, _right21) {
            if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("+")]) return _left21[Symbol.for("+")](_right21);else return _left21 + _right21;
          }(u[_k][_j2], function (_left22, _right22) {
            if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("*")]) return _left22[Symbol.for("*")](_right22);else return _left22 * _right22;
          }(f, u[_k][_i3]));
        }
      }
    }

    q[_i3] = g;
    s = 0;

    for (var _j3 = l; function (_left23, _right23) {
      if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("<")]) return _left23[Symbol.for("<")](_right23);else return _left23 < _right23;
    }(_j3, n); _j3++) {
      s += Math.pow(u[_i3][_j3], 2);
    }

    if (function (_left24, _right24) {
      if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("<")]) return _left24[Symbol.for("<")](_right24);else return _left24 < _right24;
    }(s, tol)) {
      g = 0;
    } else {
      f = u[_i3][function (_left25, _right25) {
        if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("+")]) return _left25[Symbol.for("+")](_right25);else return _left25 + _right25;
      }(_i3, 1)];

      g = function (_left26, _right26) {
        if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("<")]) return _left26[Symbol.for("<")](_right26);else return _left26 < _right26;
      }(f, 0) ? Math.sqrt(s) : -Math.sqrt(s);

      h = function (_left27, _right27) {
        if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("-")]) return _left27[Symbol.for("-")](_right27);else return _left27 - _right27;
      }(function (_left28, _right28) {
        if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("*")]) return _left28[Symbol.for("*")](_right28);else return _left28 * _right28;
      }(f, g), s);

      u[_i3][function (_left29, _right29) {
        if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("+")]) return _left29[Symbol.for("+")](_right29);else return _left29 + _right29;
      }(_i3, 1)] = function (_left30, _right30) {
        if (_left30 !== null && _left30 !== undefined && _left30[Symbol.for("-")]) return _left30[Symbol.for("-")](_right30);else return _left30 - _right30;
      }(f, g);

      for (var _j4 = l; function (_left31, _right31) {
        if (_left31 !== null && _left31 !== undefined && _left31[Symbol.for("<")]) return _left31[Symbol.for("<")](_right31);else return _left31 < _right31;
      }(_j4, n); _j4++) {
        e[_j4] = function (_left32, _right32) {
          if (_left32 !== null && _left32 !== undefined && _left32[Symbol.for("/")]) return _left32[Symbol.for("/")](_right32);else return _left32 / _right32;
        }(u[_i3][_j4], h);
      }

      for (var _j5 = l; function (_left33, _right33) {
        if (_left33 !== null && _left33 !== undefined && _left33[Symbol.for("<")]) return _left33[Symbol.for("<")](_right33);else return _left33 < _right33;
      }(_j5, m); _j5++) {
        s = 0;

        for (var _k2 = l; function (_left34, _right34) {
          if (_left34 !== null && _left34 !== undefined && _left34[Symbol.for("<")]) return _left34[Symbol.for("<")](_right34);else return _left34 < _right34;
        }(_k2, n); _k2++) {
          s += function (_left35, _right35) {
            if (_left35 !== null && _left35 !== undefined && _left35[Symbol.for("*")]) return _left35[Symbol.for("*")](_right35);else return _left35 * _right35;
          }(u[_j5][_k2], u[_i3][_k2]);
        }

        for (var _k3 = l; function (_left36, _right36) {
          if (_left36 !== null && _left36 !== undefined && _left36[Symbol.for("<")]) return _left36[Symbol.for("<")](_right36);else return _left36 < _right36;
        }(_k3, n); _k3++) {
          u[_j5][_k3] = function (_left37, _right37) {
            if (_left37 !== null && _left37 !== undefined && _left37[Symbol.for("+")]) return _left37[Symbol.for("+")](_right37);else return _left37 + _right37;
          }(u[_j5][_k3], function (_left38, _right38) {
            if (_left38 !== null && _left38 !== undefined && _left38[Symbol.for("*")]) return _left38[Symbol.for("*")](_right38);else return _left38 * _right38;
          }(s, e[_k3]));
        }
      }
    }

    y = function (_left39, _right39) {
      if (_left39 !== null && _left39 !== undefined && _left39[Symbol.for("+")]) return _left39[Symbol.for("+")](_right39);else return _left39 + _right39;
    }(Math.abs(q[_i3]), Math.abs(e[_i3]));

    if (function (_left40, _right40) {
      if (_left40 !== null && _left40 !== undefined && _left40[Symbol.for(">")]) return _left40[Symbol.for(">")](_right40);else return _left40 > _right40;
    }(y, x)) {
      x = y;
    }
  } // Accumulation of right-hand transformations


  if (withv) {
    for (var _i4 = function (_left41, _right41) {
      if (_left41 !== null && _left41 !== undefined && _left41[Symbol.for("-")]) return _left41[Symbol.for("-")](_right41);else return _left41 - _right41;
    }(n, 1); function (_left42, _right42) {
      if (_left42 !== null && _left42 !== undefined && _left42[Symbol.for(">=")]) return _left42[Symbol.for(">=")](_right42);else return _left42 >= _right42;
    }(_i4, 0); _i4--) {
      if (function (_left43, _right43) {
        if (_left43 !== null && _left43 !== undefined && _left43[Symbol.for("!==")]) return _left43[Symbol.for("!==")](_right43);else return _left43 !== _right43;
      }(g, 0)) {
        h = function (_left44, _right44) {
          if (_left44 !== null && _left44 !== undefined && _left44[Symbol.for("*")]) return _left44[Symbol.for("*")](_right44);else return _left44 * _right44;
        }(u[_i4][function (_left45, _right45) {
          if (_left45 !== null && _left45 !== undefined && _left45[Symbol.for("+")]) return _left45[Symbol.for("+")](_right45);else return _left45 + _right45;
        }(_i4, 1)], g);

        for (var _j6 = l; function (_left46, _right46) {
          if (_left46 !== null && _left46 !== undefined && _left46[Symbol.for("<")]) return _left46[Symbol.for("<")](_right46);else return _left46 < _right46;
        }(_j6, n); _j6++) {
          v[_j6][_i4] = function (_left47, _right47) {
            if (_left47 !== null && _left47 !== undefined && _left47[Symbol.for("/")]) return _left47[Symbol.for("/")](_right47);else return _left47 / _right47;
          }(u[_i4][_j6], h);
        }

        for (var _j7 = l; function (_left48, _right48) {
          if (_left48 !== null && _left48 !== undefined && _left48[Symbol.for("<")]) return _left48[Symbol.for("<")](_right48);else return _left48 < _right48;
        }(_j7, n); _j7++) {
          s = 0;

          for (var _k4 = l; function (_left49, _right49) {
            if (_left49 !== null && _left49 !== undefined && _left49[Symbol.for("<")]) return _left49[Symbol.for("<")](_right49);else return _left49 < _right49;
          }(_k4, n); _k4++) {
            s += function (_left50, _right50) {
              if (_left50 !== null && _left50 !== undefined && _left50[Symbol.for("*")]) return _left50[Symbol.for("*")](_right50);else return _left50 * _right50;
            }(u[_i4][_k4], v[_k4][_j7]);
          }

          for (var _k5 = l; function (_left51, _right51) {
            if (_left51 !== null && _left51 !== undefined && _left51[Symbol.for("<")]) return _left51[Symbol.for("<")](_right51);else return _left51 < _right51;
          }(_k5, n); _k5++) {
            v[_k5][_j7] = function (_left52, _right52) {
              if (_left52 !== null && _left52 !== undefined && _left52[Symbol.for("+")]) return _left52[Symbol.for("+")](_right52);else return _left52 + _right52;
            }(v[_k5][_j7], function (_left53, _right53) {
              if (_left53 !== null && _left53 !== undefined && _left53[Symbol.for("*")]) return _left53[Symbol.for("*")](_right53);else return _left53 * _right53;
            }(s, v[_k5][_i4]));
          }
        }
      }

      for (var _j8 = l; function (_left54, _right54) {
        if (_left54 !== null && _left54 !== undefined && _left54[Symbol.for("<")]) return _left54[Symbol.for("<")](_right54);else return _left54 < _right54;
      }(_j8, n); _j8++) {
        v[_i4][_j8] = 0;
        v[_j8][_i4] = 0;
      }

      v[_i4][_i4] = 1;
      g = e[_i4];
      l = _i4;
    }
  } // Accumulation of left-hand transformations


  if (withu) {
    for (var _i5 = function (_left55, _right55) {
      if (_left55 !== null && _left55 !== undefined && _left55[Symbol.for("-")]) return _left55[Symbol.for("-")](_right55);else return _left55 - _right55;
    }(n, 1); function (_left56, _right56) {
      if (_left56 !== null && _left56 !== undefined && _left56[Symbol.for(">=")]) return _left56[Symbol.for(">=")](_right56);else return _left56 >= _right56;
    }(_i5, 0); _i5--) {
      l = function (_left57, _right57) {
        if (_left57 !== null && _left57 !== undefined && _left57[Symbol.for("+")]) return _left57[Symbol.for("+")](_right57);else return _left57 + _right57;
      }(_i5, 1);

      g = q[_i5];

      for (var _j9 = l; function (_left58, _right58) {
        if (_left58 !== null && _left58 !== undefined && _left58[Symbol.for("<")]) return _left58[Symbol.for("<")](_right58);else return _left58 < _right58;
      }(_j9, n); _j9++) {
        u[_i5][_j9] = 0;
      }

      if (function (_left59, _right59) {
        if (_left59 !== null && _left59 !== undefined && _left59[Symbol.for("!==")]) return _left59[Symbol.for("!==")](_right59);else return _left59 !== _right59;
      }(g, 0)) {
        h = function (_left60, _right60) {
          if (_left60 !== null && _left60 !== undefined && _left60[Symbol.for("*")]) return _left60[Symbol.for("*")](_right60);else return _left60 * _right60;
        }(u[_i5][_i5], g);

        for (var _j10 = l; function (_left61, _right61) {
          if (_left61 !== null && _left61 !== undefined && _left61[Symbol.for("<")]) return _left61[Symbol.for("<")](_right61);else return _left61 < _right61;
        }(_j10, n); _j10++) {
          s = 0;

          for (var _k6 = l; function (_left62, _right62) {
            if (_left62 !== null && _left62 !== undefined && _left62[Symbol.for("<")]) return _left62[Symbol.for("<")](_right62);else return _left62 < _right62;
          }(_k6, m); _k6++) {
            s += function (_left63, _right63) {
              if (_left63 !== null && _left63 !== undefined && _left63[Symbol.for("*")]) return _left63[Symbol.for("*")](_right63);else return _left63 * _right63;
            }(u[_k6][_i5], u[_k6][_j10]);
          }

          f = function (_left64, _right64) {
            if (_left64 !== null && _left64 !== undefined && _left64[Symbol.for("/")]) return _left64[Symbol.for("/")](_right64);else return _left64 / _right64;
          }(s, h);

          for (var _k7 = _i5; function (_left65, _right65) {
            if (_left65 !== null && _left65 !== undefined && _left65[Symbol.for("<")]) return _left65[Symbol.for("<")](_right65);else return _left65 < _right65;
          }(_k7, m); _k7++) {
            u[_k7][_j10] = function (_left66, _right66) {
              if (_left66 !== null && _left66 !== undefined && _left66[Symbol.for("+")]) return _left66[Symbol.for("+")](_right66);else return _left66 + _right66;
            }(u[_k7][_j10], function (_left67, _right67) {
              if (_left67 !== null && _left67 !== undefined && _left67[Symbol.for("*")]) return _left67[Symbol.for("*")](_right67);else return _left67 * _right67;
            }(f, u[_k7][_i5]));
          }
        }

        for (var _j11 = _i5; function (_left68, _right68) {
          if (_left68 !== null && _left68 !== undefined && _left68[Symbol.for("<")]) return _left68[Symbol.for("<")](_right68);else return _left68 < _right68;
        }(_j11, m); _j11++) {
          u[_j11][_i5] = function (_left69, _right69) {
            if (_left69 !== null && _left69 !== undefined && _left69[Symbol.for("/")]) return _left69[Symbol.for("/")](_right69);else return _left69 / _right69;
          }(u[_j11][_i5], g);
        }
      } else {
        for (var _j12 = _i5; function (_left70, _right70) {
          if (_left70 !== null && _left70 !== undefined && _left70[Symbol.for("<")]) return _left70[Symbol.for("<")](_right70);else return _left70 < _right70;
        }(_j12, m); _j12++) {
          u[_j12][_i5] = 0;
        }
      }

      u[_i5][_i5] = function (_left71, _right71) {
        if (_left71 !== null && _left71 !== undefined && _left71[Symbol.for("+")]) return _left71[Symbol.for("+")](_right71);else return _left71 + _right71;
      }(u[_i5][_i5], 1);
    }
  } // Diagonalization of the bidiagonal form


  eps = function (_left72, _right72) {
    if (_left72 !== null && _left72 !== undefined && _left72[Symbol.for("*")]) return _left72[Symbol.for("*")](_right72);else return _left72 * _right72;
  }(eps, x);

  var testConvergence;

  for (var _k8 = function (_left73, _right73) {
    if (_left73 !== null && _left73 !== undefined && _left73[Symbol.for("-")]) return _left73[Symbol.for("-")](_right73);else return _left73 - _right73;
  }(n, 1); function (_left74, _right74) {
    if (_left74 !== null && _left74 !== undefined && _left74[Symbol.for(">=")]) return _left74[Symbol.for(">=")](_right74);else return _left74 >= _right74;
  }(_k8, 0); _k8--) {
    for (var iteration = 0; function (_left75, _right75) {
      if (_left75 !== null && _left75 !== undefined && _left75[Symbol.for("<")]) return _left75[Symbol.for("<")](_right75);else return _left75 < _right75;
    }(iteration, 50); iteration++) {
      // test-f-splitting
      testConvergence = false;

      for (l = _k8; function (_left76, _right76) {
        if (_left76 !== null && _left76 !== undefined && _left76[Symbol.for(">=")]) return _left76[Symbol.for(">=")](_right76);else return _left76 >= _right76;
      }(l, 0); l--) {
        if (function (_left77, _right77) {
          if (_left77 !== null && _left77 !== undefined && _left77[Symbol.for("<=")]) return _left77[Symbol.for("<=")](_right77);else return _left77 <= _right77;
        }(Math.abs(e[l]), eps)) {
          testConvergence = true;
          break;
        }

        if (function (_left78, _right78) {
          if (_left78 !== null && _left78 !== undefined && _left78[Symbol.for("<=")]) return _left78[Symbol.for("<=")](_right78);else return _left78 <= _right78;
        }(Math.abs(q[function (_left79, _right79) {
          if (_left79 !== null && _left79 !== undefined && _left79[Symbol.for("-")]) return _left79[Symbol.for("-")](_right79);else return _left79 - _right79;
        }(l, 1)]), eps)) {
          break;
        }
      }

      if (!testConvergence) {
        // cancellation of e[l] if l>0
        c = 0;
        s = 1;

        l1 = function (_left80, _right80) {
          if (_left80 !== null && _left80 !== undefined && _left80[Symbol.for("-")]) return _left80[Symbol.for("-")](_right80);else return _left80 - _right80;
        }(l, 1);

        for (var _i6 = l; function (_left81, _right81) {
          if (_left81 !== null && _left81 !== undefined && _left81[Symbol.for("<")]) return _left81[Symbol.for("<")](_right81);else return _left81 < _right81;
        }(_i6, function (_left82, _right82) {
          if (_left82 !== null && _left82 !== undefined && _left82[Symbol.for("+")]) return _left82[Symbol.for("+")](_right82);else return _left82 + _right82;
        }(_k8, 1)); _i6++) {
          f = function (_left83, _right83) {
            if (_left83 !== null && _left83 !== undefined && _left83[Symbol.for("*")]) return _left83[Symbol.for("*")](_right83);else return _left83 * _right83;
          }(s, e[_i6]);

          e[_i6] = function (_left84, _right84) {
            if (_left84 !== null && _left84 !== undefined && _left84[Symbol.for("*")]) return _left84[Symbol.for("*")](_right84);else return _left84 * _right84;
          }(c, e[_i6]);

          if (function (_left85, _right85) {
            if (_left85 !== null && _left85 !== undefined && _left85[Symbol.for("<=")]) return _left85[Symbol.for("<=")](_right85);else return _left85 <= _right85;
          }(Math.abs(f), eps)) {
            break; // goto test-f-convergence
          }

          g = q[_i6];
          q[_i6] = Math.sqrt(function (_left86, _right86) {
            if (_left86 !== null && _left86 !== undefined && _left86[Symbol.for("+")]) return _left86[Symbol.for("+")](_right86);else return _left86 + _right86;
          }(function (_left87, _right87) {
            if (_left87 !== null && _left87 !== undefined && _left87[Symbol.for("*")]) return _left87[Symbol.for("*")](_right87);else return _left87 * _right87;
          }(f, f), function (_left88, _right88) {
            if (_left88 !== null && _left88 !== undefined && _left88[Symbol.for("*")]) return _left88[Symbol.for("*")](_right88);else return _left88 * _right88;
          }(g, g)));
          h = q[_i6];

          c = function (_left89, _right89) {
            if (_left89 !== null && _left89 !== undefined && _left89[Symbol.for("/")]) return _left89[Symbol.for("/")](_right89);else return _left89 / _right89;
          }(g, h);

          s = function (_left90, _right90) {
            if (_left90 !== null && _left90 !== undefined && _left90[Symbol.for("/")]) return _left90[Symbol.for("/")](_right90);else return _left90 / _right90;
          }(-f, h);

          if (withu) {
            for (var _j13 = 0; function (_left91, _right91) {
              if (_left91 !== null && _left91 !== undefined && _left91[Symbol.for("<")]) return _left91[Symbol.for("<")](_right91);else return _left91 < _right91;
            }(_j13, m); _j13++) {
              y = u[_j13][l1];
              z = u[_j13][_i6];

              u[_j13][l1] = function (_left92, _right92) {
                if (_left92 !== null && _left92 !== undefined && _left92[Symbol.for("+")]) return _left92[Symbol.for("+")](_right92);else return _left92 + _right92;
              }(function (_left93, _right93) {
                if (_left93 !== null && _left93 !== undefined && _left93[Symbol.for("*")]) return _left93[Symbol.for("*")](_right93);else return _left93 * _right93;
              }(y, c), function (_left94, _right94) {
                if (_left94 !== null && _left94 !== undefined && _left94[Symbol.for("*")]) return _left94[Symbol.for("*")](_right94);else return _left94 * _right94;
              }(z, s));

              u[_j13][_i6] = function (_left95, _right95) {
                if (_left95 !== null && _left95 !== undefined && _left95[Symbol.for("+")]) return _left95[Symbol.for("+")](_right95);else return _left95 + _right95;
              }(function (_left96, _right96) {
                if (_left96 !== null && _left96 !== undefined && _left96[Symbol.for("*")]) return _left96[Symbol.for("*")](_right96);else return _left96 * _right96;
              }(-y, s), function (_left97, _right97) {
                if (_left97 !== null && _left97 !== undefined && _left97[Symbol.for("*")]) return _left97[Symbol.for("*")](_right97);else return _left97 * _right97;
              }(z, c));
            }
          }
        }
      } // test f convergence


      z = q[_k8];

      if (function (_left98, _right98) {
        if (_left98 !== null && _left98 !== undefined && _left98[Symbol.for("===")]) return _left98[Symbol.for("===")](_right98);else return _left98 === _right98;
      }(l, _k8)) {
        // convergence
        if (function (_left99, _right99) {
          if (_left99 !== null && _left99 !== undefined && _left99[Symbol.for("<")]) return _left99[Symbol.for("<")](_right99);else return _left99 < _right99;
        }(z, 0)) {
          // q[k] is made non-negative
          q[_k8] = -z;

          if (withv) {
            for (var _j14 = 0; function (_left100, _right100) {
              if (_left100 !== null && _left100 !== undefined && _left100[Symbol.for("<")]) return _left100[Symbol.for("<")](_right100);else return _left100 < _right100;
            }(_j14, n); _j14++) {
              v[_j14][_k8] = -v[_j14][_k8];
            }
          }
        }

        break; // break out of iteration loop and move on to next k value
      } // Shift from bottom 2x2 minor


      x = q[l];

      y = q[function (_left101, _right101) {
        if (_left101 !== null && _left101 !== undefined && _left101[Symbol.for("-")]) return _left101[Symbol.for("-")](_right101);else return _left101 - _right101;
      }(_k8, 1)];

      g = e[function (_left102, _right102) {
        if (_left102 !== null && _left102 !== undefined && _left102[Symbol.for("-")]) return _left102[Symbol.for("-")](_right102);else return _left102 - _right102;
      }(_k8, 1)];

      h = e[_k8];

      f = function (_left103, _right103) {
        if (_left103 !== null && _left103 !== undefined && _left103[Symbol.for("/")]) return _left103[Symbol.for("/")](_right103);else return _left103 / _right103;
      }(function (_left104, _right104) {
        if (_left104 !== null && _left104 !== undefined && _left104[Symbol.for("+")]) return _left104[Symbol.for("+")](_right104);else return _left104 + _right104;
      }(function (_left105, _right105) {
        if (_left105 !== null && _left105 !== undefined && _left105[Symbol.for("*")]) return _left105[Symbol.for("*")](_right105);else return _left105 * _right105;
      }(function (_left106, _right106) {
        if (_left106 !== null && _left106 !== undefined && _left106[Symbol.for("-")]) return _left106[Symbol.for("-")](_right106);else return _left106 - _right106;
      }(y, z), function (_left107, _right107) {
        if (_left107 !== null && _left107 !== undefined && _left107[Symbol.for("+")]) return _left107[Symbol.for("+")](_right107);else return _left107 + _right107;
      }(y, z)), function (_left108, _right108) {
        if (_left108 !== null && _left108 !== undefined && _left108[Symbol.for("*")]) return _left108[Symbol.for("*")](_right108);else return _left108 * _right108;
      }(function (_left109, _right109) {
        if (_left109 !== null && _left109 !== undefined && _left109[Symbol.for("-")]) return _left109[Symbol.for("-")](_right109);else return _left109 - _right109;
      }(g, h), function (_left110, _right110) {
        if (_left110 !== null && _left110 !== undefined && _left110[Symbol.for("+")]) return _left110[Symbol.for("+")](_right110);else return _left110 + _right110;
      }(g, h))), function (_left111, _right111) {
        if (_left111 !== null && _left111 !== undefined && _left111[Symbol.for("*")]) return _left111[Symbol.for("*")](_right111);else return _left111 * _right111;
      }(function (_left112, _right112) {
        if (_left112 !== null && _left112 !== undefined && _left112[Symbol.for("*")]) return _left112[Symbol.for("*")](_right112);else return _left112 * _right112;
      }(2, h), y));

      g = Math.sqrt(function (_left113, _right113) {
        if (_left113 !== null && _left113 !== undefined && _left113[Symbol.for("+")]) return _left113[Symbol.for("+")](_right113);else return _left113 + _right113;
      }(function (_left114, _right114) {
        if (_left114 !== null && _left114 !== undefined && _left114[Symbol.for("*")]) return _left114[Symbol.for("*")](_right114);else return _left114 * _right114;
      }(f, f), 1));

      f = function (_left115, _right115) {
        if (_left115 !== null && _left115 !== undefined && _left115[Symbol.for("/")]) return _left115[Symbol.for("/")](_right115);else return _left115 / _right115;
      }(function (_left116, _right116) {
        if (_left116 !== null && _left116 !== undefined && _left116[Symbol.for("+")]) return _left116[Symbol.for("+")](_right116);else return _left116 + _right116;
      }(function (_left117, _right117) {
        if (_left117 !== null && _left117 !== undefined && _left117[Symbol.for("*")]) return _left117[Symbol.for("*")](_right117);else return _left117 * _right117;
      }(function (_left118, _right118) {
        if (_left118 !== null && _left118 !== undefined && _left118[Symbol.for("-")]) return _left118[Symbol.for("-")](_right118);else return _left118 - _right118;
      }(x, z), function (_left119, _right119) {
        if (_left119 !== null && _left119 !== undefined && _left119[Symbol.for("+")]) return _left119[Symbol.for("+")](_right119);else return _left119 + _right119;
      }(x, z)), function (_left120, _right120) {
        if (_left120 !== null && _left120 !== undefined && _left120[Symbol.for("*")]) return _left120[Symbol.for("*")](_right120);else return _left120 * _right120;
      }(h, function (_left121, _right121) {
        if (_left121 !== null && _left121 !== undefined && _left121[Symbol.for("-")]) return _left121[Symbol.for("-")](_right121);else return _left121 - _right121;
      }(function (_left122, _right122) {
        if (_left122 !== null && _left122 !== undefined && _left122[Symbol.for("/")]) return _left122[Symbol.for("/")](_right122);else return _left122 / _right122;
      }(y, function (_left123, _right123) {
        if (_left123 !== null && _left123 !== undefined && _left123[Symbol.for("<")]) return _left123[Symbol.for("<")](_right123);else return _left123 < _right123;
      }(f, 0) ? function (_left124, _right124) {
        if (_left124 !== null && _left124 !== undefined && _left124[Symbol.for("-")]) return _left124[Symbol.for("-")](_right124);else return _left124 - _right124;
      }(f, g) : function (_left125, _right125) {
        if (_left125 !== null && _left125 !== undefined && _left125[Symbol.for("+")]) return _left125[Symbol.for("+")](_right125);else return _left125 + _right125;
      }(f, g)), h))), x); // Next QR transformation


      c = 1;
      s = 1;

      for (var _i7 = function (_left126, _right126) {
        if (_left126 !== null && _left126 !== undefined && _left126[Symbol.for("+")]) return _left126[Symbol.for("+")](_right126);else return _left126 + _right126;
      }(l, 1); function (_left127, _right127) {
        if (_left127 !== null && _left127 !== undefined && _left127[Symbol.for("<")]) return _left127[Symbol.for("<")](_right127);else return _left127 < _right127;
      }(_i7, function (_left128, _right128) {
        if (_left128 !== null && _left128 !== undefined && _left128[Symbol.for("+")]) return _left128[Symbol.for("+")](_right128);else return _left128 + _right128;
      }(_k8, 1)); _i7++) {
        g = e[_i7];
        y = q[_i7];

        h = function (_left129, _right129) {
          if (_left129 !== null && _left129 !== undefined && _left129[Symbol.for("*")]) return _left129[Symbol.for("*")](_right129);else return _left129 * _right129;
        }(s, g);

        g = function (_left130, _right130) {
          if (_left130 !== null && _left130 !== undefined && _left130[Symbol.for("*")]) return _left130[Symbol.for("*")](_right130);else return _left130 * _right130;
        }(c, g);

        z = Math.sqrt(function (_left131, _right131) {
          if (_left131 !== null && _left131 !== undefined && _left131[Symbol.for("+")]) return _left131[Symbol.for("+")](_right131);else return _left131 + _right131;
        }(function (_left132, _right132) {
          if (_left132 !== null && _left132 !== undefined && _left132[Symbol.for("*")]) return _left132[Symbol.for("*")](_right132);else return _left132 * _right132;
        }(f, f), function (_left133, _right133) {
          if (_left133 !== null && _left133 !== undefined && _left133[Symbol.for("*")]) return _left133[Symbol.for("*")](_right133);else return _left133 * _right133;
        }(h, h)));
        e[function (_left134, _right134) {
          if (_left134 !== null && _left134 !== undefined && _left134[Symbol.for("-")]) return _left134[Symbol.for("-")](_right134);else return _left134 - _right134;
        }(_i7, 1)] = z;

        c = function (_left135, _right135) {
          if (_left135 !== null && _left135 !== undefined && _left135[Symbol.for("/")]) return _left135[Symbol.for("/")](_right135);else return _left135 / _right135;
        }(f, z);

        s = function (_left136, _right136) {
          if (_left136 !== null && _left136 !== undefined && _left136[Symbol.for("/")]) return _left136[Symbol.for("/")](_right136);else return _left136 / _right136;
        }(h, z);

        f = function (_left137, _right137) {
          if (_left137 !== null && _left137 !== undefined && _left137[Symbol.for("+")]) return _left137[Symbol.for("+")](_right137);else return _left137 + _right137;
        }(function (_left138, _right138) {
          if (_left138 !== null && _left138 !== undefined && _left138[Symbol.for("*")]) return _left138[Symbol.for("*")](_right138);else return _left138 * _right138;
        }(x, c), function (_left139, _right139) {
          if (_left139 !== null && _left139 !== undefined && _left139[Symbol.for("*")]) return _left139[Symbol.for("*")](_right139);else return _left139 * _right139;
        }(g, s));

        g = function (_left140, _right140) {
          if (_left140 !== null && _left140 !== undefined && _left140[Symbol.for("+")]) return _left140[Symbol.for("+")](_right140);else return _left140 + _right140;
        }(function (_left141, _right141) {
          if (_left141 !== null && _left141 !== undefined && _left141[Symbol.for("*")]) return _left141[Symbol.for("*")](_right141);else return _left141 * _right141;
        }(-x, s), function (_left142, _right142) {
          if (_left142 !== null && _left142 !== undefined && _left142[Symbol.for("*")]) return _left142[Symbol.for("*")](_right142);else return _left142 * _right142;
        }(g, c));

        h = function (_left143, _right143) {
          if (_left143 !== null && _left143 !== undefined && _left143[Symbol.for("*")]) return _left143[Symbol.for("*")](_right143);else return _left143 * _right143;
        }(y, s);

        y = function (_left144, _right144) {
          if (_left144 !== null && _left144 !== undefined && _left144[Symbol.for("*")]) return _left144[Symbol.for("*")](_right144);else return _left144 * _right144;
        }(y, c);

        if (withv) {
          for (var _j15 = 0; function (_left145, _right145) {
            if (_left145 !== null && _left145 !== undefined && _left145[Symbol.for("<")]) return _left145[Symbol.for("<")](_right145);else return _left145 < _right145;
          }(_j15, n); _j15++) {
            x = v[_j15][function (_left146, _right146) {
              if (_left146 !== null && _left146 !== undefined && _left146[Symbol.for("-")]) return _left146[Symbol.for("-")](_right146);else return _left146 - _right146;
            }(_i7, 1)];

            z = v[_j15][_i7];

            v[_j15][function (_left147, _right147) {
              if (_left147 !== null && _left147 !== undefined && _left147[Symbol.for("-")]) return _left147[Symbol.for("-")](_right147);else return _left147 - _right147;
            }(_i7, 1)] = function (_left148, _right148) {
              if (_left148 !== null && _left148 !== undefined && _left148[Symbol.for("+")]) return _left148[Symbol.for("+")](_right148);else return _left148 + _right148;
            }(function (_left149, _right149) {
              if (_left149 !== null && _left149 !== undefined && _left149[Symbol.for("*")]) return _left149[Symbol.for("*")](_right149);else return _left149 * _right149;
            }(x, c), function (_left150, _right150) {
              if (_left150 !== null && _left150 !== undefined && _left150[Symbol.for("*")]) return _left150[Symbol.for("*")](_right150);else return _left150 * _right150;
            }(z, s));

            v[_j15][_i7] = function (_left151, _right151) {
              if (_left151 !== null && _left151 !== undefined && _left151[Symbol.for("+")]) return _left151[Symbol.for("+")](_right151);else return _left151 + _right151;
            }(function (_left152, _right152) {
              if (_left152 !== null && _left152 !== undefined && _left152[Symbol.for("*")]) return _left152[Symbol.for("*")](_right152);else return _left152 * _right152;
            }(-x, s), function (_left153, _right153) {
              if (_left153 !== null && _left153 !== undefined && _left153[Symbol.for("*")]) return _left153[Symbol.for("*")](_right153);else return _left153 * _right153;
            }(z, c));
          }
        }

        z = Math.sqrt(function (_left154, _right154) {
          if (_left154 !== null && _left154 !== undefined && _left154[Symbol.for("+")]) return _left154[Symbol.for("+")](_right154);else return _left154 + _right154;
        }(function (_left155, _right155) {
          if (_left155 !== null && _left155 !== undefined && _left155[Symbol.for("*")]) return _left155[Symbol.for("*")](_right155);else return _left155 * _right155;
        }(f, f), function (_left156, _right156) {
          if (_left156 !== null && _left156 !== undefined && _left156[Symbol.for("*")]) return _left156[Symbol.for("*")](_right156);else return _left156 * _right156;
        }(h, h)));
        q[function (_left157, _right157) {
          if (_left157 !== null && _left157 !== undefined && _left157[Symbol.for("-")]) return _left157[Symbol.for("-")](_right157);else return _left157 - _right157;
        }(_i7, 1)] = z;

        c = function (_left158, _right158) {
          if (_left158 !== null && _left158 !== undefined && _left158[Symbol.for("/")]) return _left158[Symbol.for("/")](_right158);else return _left158 / _right158;
        }(f, z);

        s = function (_left159, _right159) {
          if (_left159 !== null && _left159 !== undefined && _left159[Symbol.for("/")]) return _left159[Symbol.for("/")](_right159);else return _left159 / _right159;
        }(h, z);

        f = function (_left160, _right160) {
          if (_left160 !== null && _left160 !== undefined && _left160[Symbol.for("+")]) return _left160[Symbol.for("+")](_right160);else return _left160 + _right160;
        }(function (_left161, _right161) {
          if (_left161 !== null && _left161 !== undefined && _left161[Symbol.for("*")]) return _left161[Symbol.for("*")](_right161);else return _left161 * _right161;
        }(c, g), function (_left162, _right162) {
          if (_left162 !== null && _left162 !== undefined && _left162[Symbol.for("*")]) return _left162[Symbol.for("*")](_right162);else return _left162 * _right162;
        }(s, y));

        x = function (_left163, _right163) {
          if (_left163 !== null && _left163 !== undefined && _left163[Symbol.for("+")]) return _left163[Symbol.for("+")](_right163);else return _left163 + _right163;
        }(function (_left164, _right164) {
          if (_left164 !== null && _left164 !== undefined && _left164[Symbol.for("*")]) return _left164[Symbol.for("*")](_right164);else return _left164 * _right164;
        }(-s, g), function (_left165, _right165) {
          if (_left165 !== null && _left165 !== undefined && _left165[Symbol.for("*")]) return _left165[Symbol.for("*")](_right165);else return _left165 * _right165;
        }(c, y));

        if (withu) {
          for (var _j16 = 0; function (_left166, _right166) {
            if (_left166 !== null && _left166 !== undefined && _left166[Symbol.for("<")]) return _left166[Symbol.for("<")](_right166);else return _left166 < _right166;
          }(_j16, m); _j16++) {
            y = u[_j16][function (_left167, _right167) {
              if (_left167 !== null && _left167 !== undefined && _left167[Symbol.for("-")]) return _left167[Symbol.for("-")](_right167);else return _left167 - _right167;
            }(_i7, 1)];

            z = u[_j16][_i7];

            u[_j16][function (_left168, _right168) {
              if (_left168 !== null && _left168 !== undefined && _left168[Symbol.for("-")]) return _left168[Symbol.for("-")](_right168);else return _left168 - _right168;
            }(_i7, 1)] = function (_left169, _right169) {
              if (_left169 !== null && _left169 !== undefined && _left169[Symbol.for("+")]) return _left169[Symbol.for("+")](_right169);else return _left169 + _right169;
            }(function (_left170, _right170) {
              if (_left170 !== null && _left170 !== undefined && _left170[Symbol.for("*")]) return _left170[Symbol.for("*")](_right170);else return _left170 * _right170;
            }(y, c), function (_left171, _right171) {
              if (_left171 !== null && _left171 !== undefined && _left171[Symbol.for("*")]) return _left171[Symbol.for("*")](_right171);else return _left171 * _right171;
            }(z, s));

            u[_j16][_i7] = function (_left172, _right172) {
              if (_left172 !== null && _left172 !== undefined && _left172[Symbol.for("+")]) return _left172[Symbol.for("+")](_right172);else return _left172 + _right172;
            }(function (_left173, _right173) {
              if (_left173 !== null && _left173 !== undefined && _left173[Symbol.for("*")]) return _left173[Symbol.for("*")](_right173);else return _left173 * _right173;
            }(-y, s), function (_left174, _right174) {
              if (_left174 !== null && _left174 !== undefined && _left174[Symbol.for("*")]) return _left174[Symbol.for("*")](_right174);else return _left174 * _right174;
            }(z, c));
          }
        }
      }

      e[l] = 0;
      e[_k8] = f;
      q[_k8] = x;
    }
  } // Number below eps should be zero


  for (var _i8 = 0; function (_left175, _right175) {
    if (_left175 !== null && _left175 !== undefined && _left175[Symbol.for("<")]) return _left175[Symbol.for("<")](_right175);else return _left175 < _right175;
  }(_i8, n); _i8++) {
    if (function (_left176, _right176) {
      if (_left176 !== null && _left176 !== undefined && _left176[Symbol.for("<")]) return _left176[Symbol.for("<")](_right176);else return _left176 < _right176;
    }(q[_i8], eps)) q[_i8] = 0;
  }

  return {
    u: u,
    q: q,
    v: v
  };
}