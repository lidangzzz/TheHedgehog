import { mat } from '../matrix/matrix';

//Reference: 
//https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/matrix/inv.js
function inverse(inmat) {
  if (function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right;
  }(inmat.rows, inmat.cols)) throw new Error("A must be a suqare matrix");
  const A = inmat.clone().val.concat();

  for (var r = 0; function (_left2, _right2) {
    if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
  }(r, inmat.rows); r++) {
    A[r] = A[r].concat();
  } // create an identity matrix which in the end will contain the
  // matrix inverse


  var B = new mat().identity(inmat.rows).val;
  var cols = inmat.cols;
  var rows = inmat.rows; // loop over all columns, and perform row reductions

  for (let c = 0; function (_left3, _right3) {
    if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
  }(c, cols); c++) {
    // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
    let ABig = Math.abs(A[c][c]);
    let rBig = c;

    r = function (_left4, _right4) {
      if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("+")]) return _left4[Symbol.for("+")](_right4);else return _left4 + _right4;
    }(c, 1);

    while (function (_left5, _right5) {
      if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("<")]) return _left5[Symbol.for("<")](_right5);else return _left5 < _right5;
    }(r, rows)) {
      if (function (_left6, _right6) {
        if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for(">")]) return _left6[Symbol.for(">")](_right6);else return _left6 > _right6;
      }(Math.abs(A[r][c]), ABig)) {
        ABig = Math.abs(A[r][c]);
        rBig = r;
      }

      r++;
    }

    if (function (_left7, _right7) {
      if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("===")]) return _left7[Symbol.for("===")](_right7);else return _left7 === _right7;
    }(ABig, 0)) {
      throw Error('Cannot calculate inverse, determinant is zero');
    }

    r = rBig;

    if (function (_left8, _right8) {
      if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("!==")]) return _left8[Symbol.for("!==")](_right8);else return _left8 !== _right8;
    }(r, c)) {
      var temp = A[c];
      A[c] = A[r];
      A[r] = temp;
      temp = B[c];
      B[c] = B[r];
      B[r] = temp;
    } // eliminate non-zero values on the other rows at column c


    const Ac = A[c];
    const Bc = B[c];

    for (r = 0; function (_left9, _right9) {
      if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("<")]) return _left9[Symbol.for("<")](_right9);else return _left9 < _right9;
    }(r, rows); r++) {
      const Ar = A[r];
      const Br = B[r];

      if (function (_left10, _right10) {
        if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("!==")]) return _left10[Symbol.for("!==")](_right10);else return _left10 !== _right10;
      }(r, c)) {
        // eliminate value at column c and row r
        if (function (_left11, _right11) {
          if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("!==")]) return _left11[Symbol.for("!==")](_right11);else return _left11 !== _right11;
        }(Ar[c], 0)) {
          var f = function (_left12, _right12) {
            if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("/")]) return _left12[Symbol.for("/")](_right12);else return _left12 / _right12;
          }(function (_left13, _right13) {
            if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("*")]) return _left13[Symbol.for("*")](_right13);else return _left13 * _right13;
          }(-1, Ar[c]), Ac[c]); // add (f * row c) to row r to eliminate the value
          // at column c


          for (var s = c; function (_left14, _right14) {
            if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("<")]) return _left14[Symbol.for("<")](_right14);else return _left14 < _right14;
          }(s, cols); s++) {
            Ar[s] = function (_left15, _right15) {
              if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("+")]) return _left15[Symbol.for("+")](_right15);else return _left15 + _right15;
            }(Ar[s], function (_left16, _right16) {
              if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("*")]) return _left16[Symbol.for("*")](_right16);else return _left16 * _right16;
            }(f, Ac[s]));
          }

          for (var s = 0; function (_left17, _right17) {
            if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("<")]) return _left17[Symbol.for("<")](_right17);else return _left17 < _right17;
          }(s, cols); s++) {
            Br[s] = function (_left18, _right18) {
              if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("+")]) return _left18[Symbol.for("+")](_right18);else return _left18 + _right18;
            }(Br[s], function (_left19, _right19) {
              if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("*")]) return _left19[Symbol.for("*")](_right19);else return _left19 * _right19;
            }(f, Bc[s]));
          }
        }
      } else {
        // normalize value at Acc to 1,
        // divide each value on row r with the value at Acc
        f = Ac[c];

        for (s = c; function (_left20, _right20) {
          if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("<")]) return _left20[Symbol.for("<")](_right20);else return _left20 < _right20;
        }(s, cols); s++) {
          Ar[s] = function (_left21, _right21) {
            if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("/")]) return _left21[Symbol.for("/")](_right21);else return _left21 / _right21;
          }(Ar[s], f);
        }

        for (s = 0; function (_left22, _right22) {
          if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("<")]) return _left22[Symbol.for("<")](_right22);else return _left22 < _right22;
        }(s, cols); s++) {
          Br[s] = function (_left23, _right23) {
            if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("/")]) return _left23[Symbol.for("/")](_right23);else return _left23 / _right23;
          }(Br[s], f);
        }
      }
    }
  }

  return new mat().init(B);
}

export { inverse };