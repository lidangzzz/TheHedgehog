import { mat } from '../matrix/matrix'; //Reference: https://github.com/stardisblue/svdjs/blob/master/src/index.ts
//Author: stardisblue

class SVDresult {
  constructor(q_, U_, V_) {
    this.q = q_;
    this.U = U_;
    this.V = V_;
  }

}

function SVD(A) {
  var ret = SVD_(A.val);
  return new SVDresult(new mat().initVec(ret.q), new mat().init(ret.u), new mat().init(ret.v));
}

export { SVD, SVDresult };

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
  let {
    u: withu,
    v: withv,
    eps
  } = {
    u: true,
    v: true,
    eps: Math.pow(2, -52),
    ...options
  };

  const tol = function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("/")]) return _left[Symbol.for("/")](_right);else return _left / _right;
  }(1e-64, eps); // throw error if a is not defined


  if (!a) {
    throw new TypeError("Matrix a is not defined");
  } // Householder's reduction to bidiagonal form


  const n = a[0].length;
  const m = a.length;

  if (function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
  }(m, n)) {
    throw new TypeError("Invalid matrix: m < n");
  }

  let l1, c, f, h, s, y, z;
  let l = 0,
      g = 0,
      x = 0;
  const e = [];
  const u = [];
  const v = []; // Initialize u

  for (let i = 0; function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
  }(i, m); i++) {
    u[i] = new Array(n).fill(0);
  } // Initialize v


  for (let i = 0; function (_left4, _right4) {
    if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("<")]) return _left4[Symbol.for("<")](_right4);else return _left4 < _right4;
  }(i, n); i++) {
    v[i] = new Array(n).fill(0);
  } // Initialize q


  const q = new Array(n).fill(0); // Copy array a in u

  for (let i = 0; function (_left5, _right5) {
    if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5;
  }(i, m); i++) {
    for (let j = 0; function (_left6, _right6) {
      if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("<")]) return _left6[Symbol.for("<")](_right6);else return _left6 < _right6;
    }(j, n); j++) {
      u[i][j] = a[i][j];
    }
  }

  for (let i = 0; function (_left7, _right7) {
    if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
  }(i, n); i++) {
    e[i] = g;
    s = 0;

    l = function (_left8, _right8) {
      if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("+")]) return _left8[Symbol.for("+")](_right8);else return _left8 + _right8;
    }(i, 1);

    for (let j = i; function (_left9, _right9) {
      if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("<")]) return _left9[Symbol.for("<")](_right9);else return _left9 < _right9;
    }(j, m); j++) {
      s += Math.pow(u[j][i], 2);
    }

    if (function (_left10, _right10) {
      if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("<")]) return _left10[Symbol.for("<")](_right10);else return _left10 < _right10;
    }(s, tol)) {
      g = 0;
    } else {
      f = u[i][i];
      g = function (_left11, _right11) {
        if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
      }(f, 0) ? Math.sqrt(s) : -Math.sqrt(s);

      h = function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("-")]) return _left12[Symbol.for("-")](_right12);else return _left12 - _right12;
      }(function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("*")]) return _left13[Symbol.for("*")](_right13);else return _left13 * _right13;
      }(f, g), s);

      u[i][i] = function (_left14, _right14) {
        if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("-")]) return _left14[Symbol.for("-")](_right14);else return _left14 - _right14;
      }(f, g);

      for (let j = l; function (_left15, _right15) {
        if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("<")]) return _left15[Symbol.for("<")](_right15);else return _left15 < _right15;
      }(j, n); j++) {
        s = 0;

        for (let k = i; function (_left16, _right16) {
          if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
        }(k, m); k++) {
          s += function (_left17, _right17) {
            if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("*")]) return _left17[Symbol.for("*")](_right17);else return _left17 * _right17;
          }(u[k][i], u[k][j]);
        }

        f = function (_left18, _right18) {
          if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("/")]) return _left18[Symbol.for("/")](_right18);else return _left18 / _right18;
        }(s, h);

        for (let k = i; function (_left19, _right19) {
          if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("<")]) return _left19[Symbol.for("<")](_right19);else return _left19 < _right19;
        }(k, m); k++) {
          u[k][j] = function (_left20, _right20) {
            if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("+")]) return _left20[Symbol.for("+")](_right20);else return _left20 + _right20;
          }(u[k][j], function (_left21, _right21) {
            if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("*")]) return _left21[Symbol.for("*")](_right21);else return _left21 * _right21;
          }(f, u[k][i]));
        }
      }
    }

    q[i] = g;
    s = 0;

    for (let j = l; function (_left22, _right22) {
      if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("<")]) return _left22[Symbol.for("<")](_right22);else return _left22 < _right22;
    }(j, n); j++) {
      s += Math.pow(u[i][j], 2);
    }

    if (function (_left23, _right23) {
      if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("<")]) return _left23[Symbol.for("<")](_right23);else return _left23 < _right23;
    }(s, tol)) {
      g = 0;
    } else {
      f = u[i][function (_left24, _right24) {
        if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("+")]) return _left24[Symbol.for("+")](_right24);else return _left24 + _right24;
      }(i, 1)];

      g = function (_left25, _right25) {
        if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("<")]) return _left25[Symbol.for("<")](_right25);else return _left25 < _right25;
      }(f, 0) ? Math.sqrt(s) : -Math.sqrt(s);

      h = function (_left26, _right26) {
        if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("-")]) return _left26[Symbol.for("-")](_right26);else return _left26 - _right26;
      }(function (_left27, _right27) {
        if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("*")]) return _left27[Symbol.for("*")](_right27);else return _left27 * _right27;
      }(f, g), s);

      u[i][function (_left28, _right28) {
        if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("+")]) return _left28[Symbol.for("+")](_right28);else return _left28 + _right28;
      }(i, 1)] = function (_left29, _right29) {
        if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("-")]) return _left29[Symbol.for("-")](_right29);else return _left29 - _right29;
      }(f, g);

      for (let j = l; function (_left30, _right30) {
        if (_left30 !== null && _left30 !== undefined && _left30[Symbol.for("<")]) return _left30[Symbol.for("<")](_right30);else return _left30 < _right30;
      }(j, n); j++) {
        e[j] = function (_left31, _right31) {
          if (_left31 !== null && _left31 !== undefined && _left31[Symbol.for("/")]) return _left31[Symbol.for("/")](_right31);else return _left31 / _right31;
        }(u[i][j], h);
      }

      for (let j = l; function (_left32, _right32) {
        if (_left32 !== null && _left32 !== undefined && _left32[Symbol.for("<")]) return _left32[Symbol.for("<")](_right32);else return _left32 < _right32;
      }(j, m); j++) {
        s = 0;

        for (let k = l; function (_left33, _right33) {
          if (_left33 !== null && _left33 !== undefined && _left33[Symbol.for("<")]) return _left33[Symbol.for("<")](_right33);else return _left33 < _right33;
        }(k, n); k++) {
          s += function (_left34, _right34) {
            if (_left34 !== null && _left34 !== undefined && _left34[Symbol.for("*")]) return _left34[Symbol.for("*")](_right34);else return _left34 * _right34;
          }(u[j][k], u[i][k]);
        }

        for (let k = l; function (_left35, _right35) {
          if (_left35 !== null && _left35 !== undefined && _left35[Symbol.for("<")]) return _left35[Symbol.for("<")](_right35);else return _left35 < _right35;
        }(k, n); k++) {
          u[j][k] = function (_left36, _right36) {
            if (_left36 !== null && _left36 !== undefined && _left36[Symbol.for("+")]) return _left36[Symbol.for("+")](_right36);else return _left36 + _right36;
          }(u[j][k], function (_left37, _right37) {
            if (_left37 !== null && _left37 !== undefined && _left37[Symbol.for("*")]) return _left37[Symbol.for("*")](_right37);else return _left37 * _right37;
          }(s, e[k]));
        }
      }
    }

    y = function (_left38, _right38) {
      if (_left38 !== null && _left38 !== undefined && _left38[Symbol.for("+")]) return _left38[Symbol.for("+")](_right38);else return _left38 + _right38;
    }(Math.abs(q[i]), Math.abs(e[i]));

    if (function (_left39, _right39) {
      if (_left39 !== null && _left39 !== undefined && _left39[Symbol.for(">")]) return _left39[Symbol.for(">")](_right39);else return _left39 > _right39;
    }(y, x)) {
      x = y;
    }
  } // Accumulation of right-hand transformations


  if (withv) {
    for (let i = function (_left40, _right40) {
      if (_left40 !== null && _left40 !== undefined && _left40[Symbol.for("-")]) return _left40[Symbol.for("-")](_right40);else return _left40 - _right40;
    }(n, 1); function (_left41, _right41) {
      if (_left41 !== null && _left41 !== undefined && _left41[Symbol.for(">=")]) return _left41[Symbol.for(">=")](_right41);else return _left41 >= _right41;
    }(i, 0); i--) {
      if (function (_left42, _right42) {
        if (_left42 !== null && _left42 !== undefined && _left42[Symbol.for("!==")]) return _left42[Symbol.for("!==")](_right42);else return _left42 !== _right42;
      }(g, 0)) {
        h = function (_left43, _right43) {
          if (_left43 !== null && _left43 !== undefined && _left43[Symbol.for("*")]) return _left43[Symbol.for("*")](_right43);else return _left43 * _right43;
        }(u[i][function (_left44, _right44) {
          if (_left44 !== null && _left44 !== undefined && _left44[Symbol.for("+")]) return _left44[Symbol.for("+")](_right44);else return _left44 + _right44;
        }(i, 1)], g);

        for (let j = l; function (_left45, _right45) {
          if (_left45 !== null && _left45 !== undefined && _left45[Symbol.for("<")]) return _left45[Symbol.for("<")](_right45);else return _left45 < _right45;
        }(j, n); j++) {
          v[j][i] = function (_left46, _right46) {
            if (_left46 !== null && _left46 !== undefined && _left46[Symbol.for("/")]) return _left46[Symbol.for("/")](_right46);else return _left46 / _right46;
          }(u[i][j], h);
        }

        for (let j = l; function (_left47, _right47) {
          if (_left47 !== null && _left47 !== undefined && _left47[Symbol.for("<")]) return _left47[Symbol.for("<")](_right47);else return _left47 < _right47;
        }(j, n); j++) {
          s = 0;

          for (let k = l; function (_left48, _right48) {
            if (_left48 !== null && _left48 !== undefined && _left48[Symbol.for("<")]) return _left48[Symbol.for("<")](_right48);else return _left48 < _right48;
          }(k, n); k++) {
            s += function (_left49, _right49) {
              if (_left49 !== null && _left49 !== undefined && _left49[Symbol.for("*")]) return _left49[Symbol.for("*")](_right49);else return _left49 * _right49;
            }(u[i][k], v[k][j]);
          }

          for (let k = l; function (_left50, _right50) {
            if (_left50 !== null && _left50 !== undefined && _left50[Symbol.for("<")]) return _left50[Symbol.for("<")](_right50);else return _left50 < _right50;
          }(k, n); k++) {
            v[k][j] = function (_left51, _right51) {
              if (_left51 !== null && _left51 !== undefined && _left51[Symbol.for("+")]) return _left51[Symbol.for("+")](_right51);else return _left51 + _right51;
            }(v[k][j], function (_left52, _right52) {
              if (_left52 !== null && _left52 !== undefined && _left52[Symbol.for("*")]) return _left52[Symbol.for("*")](_right52);else return _left52 * _right52;
            }(s, v[k][i]));
          }
        }
      }

      for (let j = l; function (_left53, _right53) {
        if (_left53 !== null && _left53 !== undefined && _left53[Symbol.for("<")]) return _left53[Symbol.for("<")](_right53);else return _left53 < _right53;
      }(j, n); j++) {
        v[i][j] = 0;
        v[j][i] = 0;
      }

      v[i][i] = 1;
      g = e[i];
      l = i;
    }
  } // Accumulation of left-hand transformations


  if (withu) {
    for (let i = function (_left54, _right54) {
      if (_left54 !== null && _left54 !== undefined && _left54[Symbol.for("-")]) return _left54[Symbol.for("-")](_right54);else return _left54 - _right54;
    }(n, 1); function (_left55, _right55) {
      if (_left55 !== null && _left55 !== undefined && _left55[Symbol.for(">=")]) return _left55[Symbol.for(">=")](_right55);else return _left55 >= _right55;
    }(i, 0); i--) {
      l = function (_left56, _right56) {
        if (_left56 !== null && _left56 !== undefined && _left56[Symbol.for("+")]) return _left56[Symbol.for("+")](_right56);else return _left56 + _right56;
      }(i, 1);

      g = q[i];

      for (let j = l; function (_left57, _right57) {
        if (_left57 !== null && _left57 !== undefined && _left57[Symbol.for("<")]) return _left57[Symbol.for("<")](_right57);else return _left57 < _right57;
      }(j, n); j++) {
        u[i][j] = 0;
      }

      if (function (_left58, _right58) {
        if (_left58 !== null && _left58 !== undefined && _left58[Symbol.for("!==")]) return _left58[Symbol.for("!==")](_right58);else return _left58 !== _right58;
      }(g, 0)) {
        h = function (_left59, _right59) {
          if (_left59 !== null && _left59 !== undefined && _left59[Symbol.for("*")]) return _left59[Symbol.for("*")](_right59);else return _left59 * _right59;
        }(u[i][i], g);

        for (let j = l; function (_left60, _right60) {
          if (_left60 !== null && _left60 !== undefined && _left60[Symbol.for("<")]) return _left60[Symbol.for("<")](_right60);else return _left60 < _right60;
        }(j, n); j++) {
          s = 0;

          for (let k = l; function (_left61, _right61) {
            if (_left61 !== null && _left61 !== undefined && _left61[Symbol.for("<")]) return _left61[Symbol.for("<")](_right61);else return _left61 < _right61;
          }(k, m); k++) {
            s += function (_left62, _right62) {
              if (_left62 !== null && _left62 !== undefined && _left62[Symbol.for("*")]) return _left62[Symbol.for("*")](_right62);else return _left62 * _right62;
            }(u[k][i], u[k][j]);
          }

          f = function (_left63, _right63) {
            if (_left63 !== null && _left63 !== undefined && _left63[Symbol.for("/")]) return _left63[Symbol.for("/")](_right63);else return _left63 / _right63;
          }(s, h);

          for (let k = i; function (_left64, _right64) {
            if (_left64 !== null && _left64 !== undefined && _left64[Symbol.for("<")]) return _left64[Symbol.for("<")](_right64);else return _left64 < _right64;
          }(k, m); k++) {
            u[k][j] = function (_left65, _right65) {
              if (_left65 !== null && _left65 !== undefined && _left65[Symbol.for("+")]) return _left65[Symbol.for("+")](_right65);else return _left65 + _right65;
            }(u[k][j], function (_left66, _right66) {
              if (_left66 !== null && _left66 !== undefined && _left66[Symbol.for("*")]) return _left66[Symbol.for("*")](_right66);else return _left66 * _right66;
            }(f, u[k][i]));
          }
        }

        for (let j = i; function (_left67, _right67) {
          if (_left67 !== null && _left67 !== undefined && _left67[Symbol.for("<")]) return _left67[Symbol.for("<")](_right67);else return _left67 < _right67;
        }(j, m); j++) {
          u[j][i] = function (_left68, _right68) {
            if (_left68 !== null && _left68 !== undefined && _left68[Symbol.for("/")]) return _left68[Symbol.for("/")](_right68);else return _left68 / _right68;
          }(u[j][i], g);
        }
      } else {
        for (let j = i; function (_left69, _right69) {
          if (_left69 !== null && _left69 !== undefined && _left69[Symbol.for("<")]) return _left69[Symbol.for("<")](_right69);else return _left69 < _right69;
        }(j, m); j++) {
          u[j][i] = 0;
        }
      }

      u[i][i] = function (_left70, _right70) {
        if (_left70 !== null && _left70 !== undefined && _left70[Symbol.for("+")]) return _left70[Symbol.for("+")](_right70);else return _left70 + _right70;
      }(u[i][i], 1);
    }
  } // Diagonalization of the bidiagonal form


  eps = function (_left71, _right71) {
    if (_left71 !== null && _left71 !== undefined && _left71[Symbol.for("*")]) return _left71[Symbol.for("*")](_right71);else return _left71 * _right71;
  }(eps, x);

  let testConvergence;

  for (let k = function (_left72, _right72) {
    if (_left72 !== null && _left72 !== undefined && _left72[Symbol.for("-")]) return _left72[Symbol.for("-")](_right72);else return _left72 - _right72;
  }(n, 1); function (_left73, _right73) {
    if (_left73 !== null && _left73 !== undefined && _left73[Symbol.for(">=")]) return _left73[Symbol.for(">=")](_right73);else return _left73 >= _right73;
  }(k, 0); k--) {
    for (let iteration = 0; function (_left74, _right74) {
      if (_left74 !== null && _left74 !== undefined && _left74[Symbol.for("<")]) return _left74[Symbol.for("<")](_right74);else return _left74 < _right74;
    }(iteration, 50); iteration++) {
      // test-f-splitting
      testConvergence = false;

      for (l = k; function (_left75, _right75) {
        if (_left75 !== null && _left75 !== undefined && _left75[Symbol.for(">=")]) return _left75[Symbol.for(">=")](_right75);else return _left75 >= _right75;
      }(l, 0); l--) {
        if (function (_left76, _right76) {
          if (_left76 !== null && _left76 !== undefined && _left76[Symbol.for("<=")]) return _left76[Symbol.for("<=")](_right76);else return _left76 <= _right76;
        }(Math.abs(e[l]), eps)) {
          testConvergence = true;
          break;
        }

        if (function (_left77, _right77) {
          if (_left77 !== null && _left77 !== undefined && _left77[Symbol.for("<=")]) return _left77[Symbol.for("<=")](_right77);else return _left77 <= _right77;
        }(Math.abs(q[function (_left78, _right78) {
          if (_left78 !== null && _left78 !== undefined && _left78[Symbol.for("-")]) return _left78[Symbol.for("-")](_right78);else return _left78 - _right78;
        }(l, 1)]), eps)) {
          break;
        }
      }

      if (!testConvergence) {
        // cancellation of e[l] if l>0
        c = 0;
        s = 1;

        l1 = function (_left79, _right79) {
          if (_left79 !== null && _left79 !== undefined && _left79[Symbol.for("-")]) return _left79[Symbol.for("-")](_right79);else return _left79 - _right79;
        }(l, 1);

        for (let i = l; function (_left80, _right80) {
          if (_left80 !== null && _left80 !== undefined && _left80[Symbol.for("<")]) return _left80[Symbol.for("<")](_right80);else return _left80 < _right80;
        }(i, function (_left81, _right81) {
          if (_left81 !== null && _left81 !== undefined && _left81[Symbol.for("+")]) return _left81[Symbol.for("+")](_right81);else return _left81 + _right81;
        }(k, 1)); i++) {
          f = function (_left82, _right82) {
            if (_left82 !== null && _left82 !== undefined && _left82[Symbol.for("*")]) return _left82[Symbol.for("*")](_right82);else return _left82 * _right82;
          }(s, e[i]);

          e[i] = function (_left83, _right83) {
            if (_left83 !== null && _left83 !== undefined && _left83[Symbol.for("*")]) return _left83[Symbol.for("*")](_right83);else return _left83 * _right83;
          }(c, e[i]);

          if (function (_left84, _right84) {
            if (_left84 !== null && _left84 !== undefined && _left84[Symbol.for("<=")]) return _left84[Symbol.for("<=")](_right84);else return _left84 <= _right84;
          }(Math.abs(f), eps)) {
            break; // goto test-f-convergence
          }

          g = q[i];
          q[i] = Math.sqrt(function (_left85, _right85) {
            if (_left85 !== null && _left85 !== undefined && _left85[Symbol.for("+")]) return _left85[Symbol.for("+")](_right85);else return _left85 + _right85;
          }(function (_left86, _right86) {
            if (_left86 !== null && _left86 !== undefined && _left86[Symbol.for("*")]) return _left86[Symbol.for("*")](_right86);else return _left86 * _right86;
          }(f, f), function (_left87, _right87) {
            if (_left87 !== null && _left87 !== undefined && _left87[Symbol.for("*")]) return _left87[Symbol.for("*")](_right87);else return _left87 * _right87;
          }(g, g)));
          h = q[i];

          c = function (_left88, _right88) {
            if (_left88 !== null && _left88 !== undefined && _left88[Symbol.for("/")]) return _left88[Symbol.for("/")](_right88);else return _left88 / _right88;
          }(g, h);

          s = function (_left89, _right89) {
            if (_left89 !== null && _left89 !== undefined && _left89[Symbol.for("/")]) return _left89[Symbol.for("/")](_right89);else return _left89 / _right89;
          }(-f, h);

          if (withu) {
            for (let j = 0; function (_left90, _right90) {
              if (_left90 !== null && _left90 !== undefined && _left90[Symbol.for("<")]) return _left90[Symbol.for("<")](_right90);else return _left90 < _right90;
            }(j, m); j++) {
              y = u[j][l1];
              z = u[j][i];

              u[j][l1] = function (_left91, _right91) {
                if (_left91 !== null && _left91 !== undefined && _left91[Symbol.for("+")]) return _left91[Symbol.for("+")](_right91);else return _left91 + _right91;
              }(function (_left92, _right92) {
                if (_left92 !== null && _left92 !== undefined && _left92[Symbol.for("*")]) return _left92[Symbol.for("*")](_right92);else return _left92 * _right92;
              }(y, c), function (_left93, _right93) {
                if (_left93 !== null && _left93 !== undefined && _left93[Symbol.for("*")]) return _left93[Symbol.for("*")](_right93);else return _left93 * _right93;
              }(z, s));

              u[j][i] = function (_left94, _right94) {
                if (_left94 !== null && _left94 !== undefined && _left94[Symbol.for("+")]) return _left94[Symbol.for("+")](_right94);else return _left94 + _right94;
              }(function (_left95, _right95) {
                if (_left95 !== null && _left95 !== undefined && _left95[Symbol.for("*")]) return _left95[Symbol.for("*")](_right95);else return _left95 * _right95;
              }(-y, s), function (_left96, _right96) {
                if (_left96 !== null && _left96 !== undefined && _left96[Symbol.for("*")]) return _left96[Symbol.for("*")](_right96);else return _left96 * _right96;
              }(z, c));
            }
          }
        }
      } // test f convergence


      z = q[k];

      if (function (_left97, _right97) {
        if (_left97 !== null && _left97 !== undefined && _left97[Symbol.for("===")]) return _left97[Symbol.for("===")](_right97);else return _left97 === _right97;
      }(l, k)) {
        // convergence
        if (function (_left98, _right98) {
          if (_left98 !== null && _left98 !== undefined && _left98[Symbol.for("<")]) return _left98[Symbol.for("<")](_right98);else return _left98 < _right98;
        }(z, 0)) {
          // q[k] is made non-negative
          q[k] = -z;

          if (withv) {
            for (let j = 0; function (_left99, _right99) {
              if (_left99 !== null && _left99 !== undefined && _left99[Symbol.for("<")]) return _left99[Symbol.for("<")](_right99);else return _left99 < _right99;
            }(j, n); j++) {
              v[j][k] = -v[j][k];
            }
          }
        }

        break; // break out of iteration loop and move on to next k value
      } // Shift from bottom 2x2 minor


      x = q[l];

      y = q[function (_left100, _right100) {
        if (_left100 !== null && _left100 !== undefined && _left100[Symbol.for("-")]) return _left100[Symbol.for("-")](_right100);else return _left100 - _right100;
      }(k, 1)];

      g = e[function (_left101, _right101) {
        if (_left101 !== null && _left101 !== undefined && _left101[Symbol.for("-")]) return _left101[Symbol.for("-")](_right101);else return _left101 - _right101;
      }(k, 1)];

      h = e[k];

      f = function (_left102, _right102) {
        if (_left102 !== null && _left102 !== undefined && _left102[Symbol.for("/")]) return _left102[Symbol.for("/")](_right102);else return _left102 / _right102;
      }(function (_left103, _right103) {
        if (_left103 !== null && _left103 !== undefined && _left103[Symbol.for("+")]) return _left103[Symbol.for("+")](_right103);else return _left103 + _right103;
      }(function (_left104, _right104) {
        if (_left104 !== null && _left104 !== undefined && _left104[Symbol.for("*")]) return _left104[Symbol.for("*")](_right104);else return _left104 * _right104;
      }(function (_left105, _right105) {
        if (_left105 !== null && _left105 !== undefined && _left105[Symbol.for("-")]) return _left105[Symbol.for("-")](_right105);else return _left105 - _right105;
      }(y, z), function (_left106, _right106) {
        if (_left106 !== null && _left106 !== undefined && _left106[Symbol.for("+")]) return _left106[Symbol.for("+")](_right106);else return _left106 + _right106;
      }(y, z)), function (_left107, _right107) {
        if (_left107 !== null && _left107 !== undefined && _left107[Symbol.for("*")]) return _left107[Symbol.for("*")](_right107);else return _left107 * _right107;
      }(function (_left108, _right108) {
        if (_left108 !== null && _left108 !== undefined && _left108[Symbol.for("-")]) return _left108[Symbol.for("-")](_right108);else return _left108 - _right108;
      }(g, h), function (_left109, _right109) {
        if (_left109 !== null && _left109 !== undefined && _left109[Symbol.for("+")]) return _left109[Symbol.for("+")](_right109);else return _left109 + _right109;
      }(g, h))), function (_left110, _right110) {
        if (_left110 !== null && _left110 !== undefined && _left110[Symbol.for("*")]) return _left110[Symbol.for("*")](_right110);else return _left110 * _right110;
      }(function (_left111, _right111) {
        if (_left111 !== null && _left111 !== undefined && _left111[Symbol.for("*")]) return _left111[Symbol.for("*")](_right111);else return _left111 * _right111;
      }(2, h), y));

      g = Math.sqrt(function (_left112, _right112) {
        if (_left112 !== null && _left112 !== undefined && _left112[Symbol.for("+")]) return _left112[Symbol.for("+")](_right112);else return _left112 + _right112;
      }(function (_left113, _right113) {
        if (_left113 !== null && _left113 !== undefined && _left113[Symbol.for("*")]) return _left113[Symbol.for("*")](_right113);else return _left113 * _right113;
      }(f, f), 1));

      f = function (_left114, _right114) {
        if (_left114 !== null && _left114 !== undefined && _left114[Symbol.for("/")]) return _left114[Symbol.for("/")](_right114);else return _left114 / _right114;
      }(function (_left115, _right115) {
        if (_left115 !== null && _left115 !== undefined && _left115[Symbol.for("+")]) return _left115[Symbol.for("+")](_right115);else return _left115 + _right115;
      }(function (_left116, _right116) {
        if (_left116 !== null && _left116 !== undefined && _left116[Symbol.for("*")]) return _left116[Symbol.for("*")](_right116);else return _left116 * _right116;
      }(function (_left117, _right117) {
        if (_left117 !== null && _left117 !== undefined && _left117[Symbol.for("-")]) return _left117[Symbol.for("-")](_right117);else return _left117 - _right117;
      }(x, z), function (_left118, _right118) {
        if (_left118 !== null && _left118 !== undefined && _left118[Symbol.for("+")]) return _left118[Symbol.for("+")](_right118);else return _left118 + _right118;
      }(x, z)), function (_left119, _right119) {
        if (_left119 !== null && _left119 !== undefined && _left119[Symbol.for("*")]) return _left119[Symbol.for("*")](_right119);else return _left119 * _right119;
      }(h, function (_left120, _right120) {
        if (_left120 !== null && _left120 !== undefined && _left120[Symbol.for("-")]) return _left120[Symbol.for("-")](_right120);else return _left120 - _right120;
      }(function (_left121, _right121) {
        if (_left121 !== null && _left121 !== undefined && _left121[Symbol.for("/")]) return _left121[Symbol.for("/")](_right121);else return _left121 / _right121;
      }(y, function (_left122, _right122) {
        if (_left122 !== null && _left122 !== undefined && _left122[Symbol.for("<")]) return _left122[Symbol.for("<")](_right122);else return _left122 < _right122;
      }(f, 0) ? function (_left123, _right123) {
        if (_left123 !== null && _left123 !== undefined && _left123[Symbol.for("-")]) return _left123[Symbol.for("-")](_right123);else return _left123 - _right123;
      }(f, g) : function (_left124, _right124) {
        if (_left124 !== null && _left124 !== undefined && _left124[Symbol.for("+")]) return _left124[Symbol.for("+")](_right124);else return _left124 + _right124;
      }(f, g)), h))), x); // Next QR transformation


      c = 1;
      s = 1;

      for (let i = function (_left125, _right125) {
        if (_left125 !== null && _left125 !== undefined && _left125[Symbol.for("+")]) return _left125[Symbol.for("+")](_right125);else return _left125 + _right125;
      }(l, 1); function (_left126, _right126) {
        if (_left126 !== null && _left126 !== undefined && _left126[Symbol.for("<")]) return _left126[Symbol.for("<")](_right126);else return _left126 < _right126;
      }(i, function (_left127, _right127) {
        if (_left127 !== null && _left127 !== undefined && _left127[Symbol.for("+")]) return _left127[Symbol.for("+")](_right127);else return _left127 + _right127;
      }(k, 1)); i++) {
        g = e[i];
        y = q[i];

        h = function (_left128, _right128) {
          if (_left128 !== null && _left128 !== undefined && _left128[Symbol.for("*")]) return _left128[Symbol.for("*")](_right128);else return _left128 * _right128;
        }(s, g);

        g = function (_left129, _right129) {
          if (_left129 !== null && _left129 !== undefined && _left129[Symbol.for("*")]) return _left129[Symbol.for("*")](_right129);else return _left129 * _right129;
        }(c, g);

        z = Math.sqrt(function (_left130, _right130) {
          if (_left130 !== null && _left130 !== undefined && _left130[Symbol.for("+")]) return _left130[Symbol.for("+")](_right130);else return _left130 + _right130;
        }(function (_left131, _right131) {
          if (_left131 !== null && _left131 !== undefined && _left131[Symbol.for("*")]) return _left131[Symbol.for("*")](_right131);else return _left131 * _right131;
        }(f, f), function (_left132, _right132) {
          if (_left132 !== null && _left132 !== undefined && _left132[Symbol.for("*")]) return _left132[Symbol.for("*")](_right132);else return _left132 * _right132;
        }(h, h)));
        e[function (_left133, _right133) {
          if (_left133 !== null && _left133 !== undefined && _left133[Symbol.for("-")]) return _left133[Symbol.for("-")](_right133);else return _left133 - _right133;
        }(i, 1)] = z;

        c = function (_left134, _right134) {
          if (_left134 !== null && _left134 !== undefined && _left134[Symbol.for("/")]) return _left134[Symbol.for("/")](_right134);else return _left134 / _right134;
        }(f, z);

        s = function (_left135, _right135) {
          if (_left135 !== null && _left135 !== undefined && _left135[Symbol.for("/")]) return _left135[Symbol.for("/")](_right135);else return _left135 / _right135;
        }(h, z);

        f = function (_left136, _right136) {
          if (_left136 !== null && _left136 !== undefined && _left136[Symbol.for("+")]) return _left136[Symbol.for("+")](_right136);else return _left136 + _right136;
        }(function (_left137, _right137) {
          if (_left137 !== null && _left137 !== undefined && _left137[Symbol.for("*")]) return _left137[Symbol.for("*")](_right137);else return _left137 * _right137;
        }(x, c), function (_left138, _right138) {
          if (_left138 !== null && _left138 !== undefined && _left138[Symbol.for("*")]) return _left138[Symbol.for("*")](_right138);else return _left138 * _right138;
        }(g, s));

        g = function (_left139, _right139) {
          if (_left139 !== null && _left139 !== undefined && _left139[Symbol.for("+")]) return _left139[Symbol.for("+")](_right139);else return _left139 + _right139;
        }(function (_left140, _right140) {
          if (_left140 !== null && _left140 !== undefined && _left140[Symbol.for("*")]) return _left140[Symbol.for("*")](_right140);else return _left140 * _right140;
        }(-x, s), function (_left141, _right141) {
          if (_left141 !== null && _left141 !== undefined && _left141[Symbol.for("*")]) return _left141[Symbol.for("*")](_right141);else return _left141 * _right141;
        }(g, c));

        h = function (_left142, _right142) {
          if (_left142 !== null && _left142 !== undefined && _left142[Symbol.for("*")]) return _left142[Symbol.for("*")](_right142);else return _left142 * _right142;
        }(y, s);

        y = function (_left143, _right143) {
          if (_left143 !== null && _left143 !== undefined && _left143[Symbol.for("*")]) return _left143[Symbol.for("*")](_right143);else return _left143 * _right143;
        }(y, c);

        if (withv) {
          for (let j = 0; function (_left144, _right144) {
            if (_left144 !== null && _left144 !== undefined && _left144[Symbol.for("<")]) return _left144[Symbol.for("<")](_right144);else return _left144 < _right144;
          }(j, n); j++) {
            x = v[j][function (_left145, _right145) {
              if (_left145 !== null && _left145 !== undefined && _left145[Symbol.for("-")]) return _left145[Symbol.for("-")](_right145);else return _left145 - _right145;
            }(i, 1)];

            z = v[j][i];

            v[j][function (_left146, _right146) {
              if (_left146 !== null && _left146 !== undefined && _left146[Symbol.for("-")]) return _left146[Symbol.for("-")](_right146);else return _left146 - _right146;
            }(i, 1)] = function (_left147, _right147) {
              if (_left147 !== null && _left147 !== undefined && _left147[Symbol.for("+")]) return _left147[Symbol.for("+")](_right147);else return _left147 + _right147;
            }(function (_left148, _right148) {
              if (_left148 !== null && _left148 !== undefined && _left148[Symbol.for("*")]) return _left148[Symbol.for("*")](_right148);else return _left148 * _right148;
            }(x, c), function (_left149, _right149) {
              if (_left149 !== null && _left149 !== undefined && _left149[Symbol.for("*")]) return _left149[Symbol.for("*")](_right149);else return _left149 * _right149;
            }(z, s));

            v[j][i] = function (_left150, _right150) {
              if (_left150 !== null && _left150 !== undefined && _left150[Symbol.for("+")]) return _left150[Symbol.for("+")](_right150);else return _left150 + _right150;
            }(function (_left151, _right151) {
              if (_left151 !== null && _left151 !== undefined && _left151[Symbol.for("*")]) return _left151[Symbol.for("*")](_right151);else return _left151 * _right151;
            }(-x, s), function (_left152, _right152) {
              if (_left152 !== null && _left152 !== undefined && _left152[Symbol.for("*")]) return _left152[Symbol.for("*")](_right152);else return _left152 * _right152;
            }(z, c));
          }
        }

        z = Math.sqrt(function (_left153, _right153) {
          if (_left153 !== null && _left153 !== undefined && _left153[Symbol.for("+")]) return _left153[Symbol.for("+")](_right153);else return _left153 + _right153;
        }(function (_left154, _right154) {
          if (_left154 !== null && _left154 !== undefined && _left154[Symbol.for("*")]) return _left154[Symbol.for("*")](_right154);else return _left154 * _right154;
        }(f, f), function (_left155, _right155) {
          if (_left155 !== null && _left155 !== undefined && _left155[Symbol.for("*")]) return _left155[Symbol.for("*")](_right155);else return _left155 * _right155;
        }(h, h)));
        q[function (_left156, _right156) {
          if (_left156 !== null && _left156 !== undefined && _left156[Symbol.for("-")]) return _left156[Symbol.for("-")](_right156);else return _left156 - _right156;
        }(i, 1)] = z;

        c = function (_left157, _right157) {
          if (_left157 !== null && _left157 !== undefined && _left157[Symbol.for("/")]) return _left157[Symbol.for("/")](_right157);else return _left157 / _right157;
        }(f, z);

        s = function (_left158, _right158) {
          if (_left158 !== null && _left158 !== undefined && _left158[Symbol.for("/")]) return _left158[Symbol.for("/")](_right158);else return _left158 / _right158;
        }(h, z);

        f = function (_left159, _right159) {
          if (_left159 !== null && _left159 !== undefined && _left159[Symbol.for("+")]) return _left159[Symbol.for("+")](_right159);else return _left159 + _right159;
        }(function (_left160, _right160) {
          if (_left160 !== null && _left160 !== undefined && _left160[Symbol.for("*")]) return _left160[Symbol.for("*")](_right160);else return _left160 * _right160;
        }(c, g), function (_left161, _right161) {
          if (_left161 !== null && _left161 !== undefined && _left161[Symbol.for("*")]) return _left161[Symbol.for("*")](_right161);else return _left161 * _right161;
        }(s, y));

        x = function (_left162, _right162) {
          if (_left162 !== null && _left162 !== undefined && _left162[Symbol.for("+")]) return _left162[Symbol.for("+")](_right162);else return _left162 + _right162;
        }(function (_left163, _right163) {
          if (_left163 !== null && _left163 !== undefined && _left163[Symbol.for("*")]) return _left163[Symbol.for("*")](_right163);else return _left163 * _right163;
        }(-s, g), function (_left164, _right164) {
          if (_left164 !== null && _left164 !== undefined && _left164[Symbol.for("*")]) return _left164[Symbol.for("*")](_right164);else return _left164 * _right164;
        }(c, y));

        if (withu) {
          for (let j = 0; function (_left165, _right165) {
            if (_left165 !== null && _left165 !== undefined && _left165[Symbol.for("<")]) return _left165[Symbol.for("<")](_right165);else return _left165 < _right165;
          }(j, m); j++) {
            y = u[j][function (_left166, _right166) {
              if (_left166 !== null && _left166 !== undefined && _left166[Symbol.for("-")]) return _left166[Symbol.for("-")](_right166);else return _left166 - _right166;
            }(i, 1)];

            z = u[j][i];

            u[j][function (_left167, _right167) {
              if (_left167 !== null && _left167 !== undefined && _left167[Symbol.for("-")]) return _left167[Symbol.for("-")](_right167);else return _left167 - _right167;
            }(i, 1)] = function (_left168, _right168) {
              if (_left168 !== null && _left168 !== undefined && _left168[Symbol.for("+")]) return _left168[Symbol.for("+")](_right168);else return _left168 + _right168;
            }(function (_left169, _right169) {
              if (_left169 !== null && _left169 !== undefined && _left169[Symbol.for("*")]) return _left169[Symbol.for("*")](_right169);else return _left169 * _right169;
            }(y, c), function (_left170, _right170) {
              if (_left170 !== null && _left170 !== undefined && _left170[Symbol.for("*")]) return _left170[Symbol.for("*")](_right170);else return _left170 * _right170;
            }(z, s));

            u[j][i] = function (_left171, _right171) {
              if (_left171 !== null && _left171 !== undefined && _left171[Symbol.for("+")]) return _left171[Symbol.for("+")](_right171);else return _left171 + _right171;
            }(function (_left172, _right172) {
              if (_left172 !== null && _left172 !== undefined && _left172[Symbol.for("*")]) return _left172[Symbol.for("*")](_right172);else return _left172 * _right172;
            }(-y, s), function (_left173, _right173) {
              if (_left173 !== null && _left173 !== undefined && _left173[Symbol.for("*")]) return _left173[Symbol.for("*")](_right173);else return _left173 * _right173;
            }(z, c));
          }
        }
      }

      e[l] = 0;
      e[k] = f;
      q[k] = x;
    }
  } // Number below eps should be zero


  for (let i = 0; function (_left174, _right174) {
    if (_left174 !== null && _left174 !== undefined && _left174[Symbol.for("<")]) return _left174[Symbol.for("<")](_right174);else return _left174 < _right174;
  }(i, n); i++) {
    if (function (_left175, _right175) {
      if (_left175 !== null && _left175 !== undefined && _left175[Symbol.for("<")]) return _left175[Symbol.for("<")](_right175);else return _left175 < _right175;
    }(q[i], eps)) q[i] = 0;
  }

  return {
    u,
    q,
    v
  };
}