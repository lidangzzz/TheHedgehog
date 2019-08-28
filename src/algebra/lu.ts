import { mat } from "../matrix/matrix";

//this is an implementation of LUP decomposition using CPU
class LUresult {
    L: mat; U: mat; p: mat;
    constructor(l: mat, u: mat, p_: mat) { this.L = l; this.U = u; this.p = p_;}
}

function LU(m_: mat): LUresult {

    var m = m_.clone();
    const rows = m.rows; const cols = m.cols;
    var n = Math.min(rows, cols);

    //allocate L,U,p matrix
    var L = new mat().zeros(rows, n);
    var U = new mat().zeros(n, cols);



    // permutation vector
    var p = new Array(rows).fill(0);

    for (var i = 0; i < rows; i++) p[i] = i;

    for (var j = 0; j < cols; j++) {

        // skip first column in upper triangular matrix
        if (j > 0) {

            for (var i = 0; i < rows; i++) {

                const min = Math.min(i, j);

                // v[i, j]
                var s = 0;

                for (var k = 0; k < min; k++) {
                    s += m.val[i][k] * m.val[k][j];
                }

                m.val[i][j] -= s;
            }
        }

        // row with larger value in cvector, row >= j
        var pi = j
        var pabsv = 0;
        var vjj = 0;

        for (var i = j; i < rows; i++) {
            const v = m.val[i][j];
            const v_abs = Math.abs(v);

            if (v_abs > pabsv) {
                pi = i;
                pabsv = v_abs;

                vjj = v;
            }
        }

        if (j != pi) {
            // swap values j <-> pi in p
            p[j] = [p[pi], p[pi] = p[j]][0];

            // swap j <-> pi in data
            swap_row(m, pi, j);
        }
         // check column is in lower triangular matrix
        if (j < rows) {
            // loop rows (lower triangular matrix)
            for (var i = j + 1; i < rows; i++) {
                if (m.val[i][j] != 0) {
                    m.val[i][j] = m.val[i][j] / vjj;
                }
            }
        }
    }

    //loop column
    for (j = 0; j < cols; j++) {
        // loop rows
        for (i = 0; i < rows; i++) {
            // initialize row in arrays
            if (j === 0) {
                // check row exists in upper triangular matrix
                if (i < cols) {
                    // U
                    U.val[i] = [];
                }
                // L
                L.val[i] = [];
            }
            // check we are in the upper triangular matrix
            if (i < j) {
                // check row exists in upper triangular matrix
                if (i < cols) {
                    // U
                    U.val[i][j] = m.val[i][j]
                }
                // check column exists in lower triangular matrix
                if (j < rows) {
                    // L
                    L.val[i][j] = 0;
                }
                continue
            }
            // diagonal value
            if (i === j) {
                // check row exists in upper triangular matrix
                if (i < cols) {
                    // U
                    U.val[i][j] = m.val[i][j];
                }
                // check column exists in lower triangular matrix
                if (j < rows) {
                    // L
                    L.val[i][j] = 1
                }
                continue
            }
            // check row exists in upper triangular matrix
            if (i < cols) {
                // U
                U.val[i][j] = 0
            }
            // check column exists in lower triangular matrix
            if (j < rows) {
                // L
                L.val[i][j] = m.val[i][j]
            }
        }
    }

    var p_vec = [];
    for (var i = 0, n = p.length; i < n; i++) {
        p_vec[p[i]] = i;
    }
    var p_mat = new mat().initVec(p_vec);
    return new LUresult(L, U, p_mat);
}

function swap_row(m: mat, r1: number, r2: number) {
    for (var i = 0; i < m.cols; i++) {
        var temp = m.val[r1][i];
        m.val[r1][i] = m.val[r2][i];
        m.val[r2][i] = temp;
    }
}


export { LU, LUresult };