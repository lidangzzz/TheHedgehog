import { mat } from '../matrix/matrix';

//Reference: https://github.com/stardisblue/svdjs/blob/master/src/index.ts
//Author: stardisblue

class SVDresult {
    q: mat;
    U: mat;
    V: mat;
    constructor(q_: mat, U_: mat, V_: mat) {
        this.q = q_; this.U = U_; this.V = V_;
    }
}

function SVD(A: mat) {
    var ret = SVD_(A.val);
    return new SVDresult(new mat().initVec(ret.q), new mat().init(ret.u), new mat().init(ret.v));
}

export { SVD, SVDresult };


interface SVDResult {
    /**
     * A vector holding the singular values of `A`; they are non-negative but not necessarily ordered in
     *      decreasing sequence
     */
    q: number[];

    /**
     * Represents the matrix U with orthonormalized columns (`if withu is true` otherwise `u` is used as
     *      a working storage)
     */
    u: number[][];

    /**
     * Represents the orthogonal matrix V (`if withv === true`, otherwise `v` is not used)
     */
    v: number[][];
}

interface SVDParameters {
    /** if U is desired */
    u?: boolean;
    /** if V is desired */
    v?: boolean;
    /** constant used in the test for convergence; should not be smaller than the machine precision */
    eps?: number;
}

interface SVDDestructured {
    /** if U is desired */
    u: boolean;
    /** if V is desired */
    v: boolean;
    /** constant used in the test for convergence; should not be smaller than the machine precision */
    eps: number;
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
function SVD_(a: number[][], options?: SVDParameters): SVDResult {
    let { u: withu, v: withv, eps }: SVDDestructured = {
        u: true,
        v: true,
        eps: Math.pow(2, -52),
        ...options
    };
    const tol = 1e-64 / eps;

    // throw error if a is not defined
    if (!a) {
        throw new TypeError("Matrix a is not defined");
    }

    // Householder's reduction to bidiagonal form

    const n = a[0].length;
    const m = a.length;

    if (m < n) {
        throw new TypeError("Invalid matrix: m < n");
    }

    let l1, c, f, h, s, y, z;

    let l = 0,
        g = 0,
        x = 0;
    const e = [];

    const u: number[][] = [];
    const v: number[][] = [];

    // Initialize u
    for (let i = 0; i < m; i++) {
        u[i] = new Array(n).fill(0);
    }

    // Initialize v
    for (let i = 0; i < n; i++) {
        v[i] = new Array(n).fill(0);
    }

    // Initialize q
    const q: number[] = new Array(n).fill(0);

    // Copy array a in u
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            u[i][j] = a[i][j];
        }
    }

    for (let i = 0; i < n; i++) {
        e[i] = g;
        s = 0;
        l = i + 1;
        for (let j = i; j < m; j++) {
            s += Math.pow(u[j][i], 2);
        }
        if (s < tol) {
            g = 0;
        } else {
            f = u[i][i];
            g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
            h = f * g - s;
            u[i][i] = f - g;
            for (let j = l; j < n; j++) {
                s = 0;
                for (let k = i; k < m; k++) {
                    s += u[k][i] * u[k][j];
                }
                f = s / h;
                for (let k = i; k < m; k++) {
                    u[k][j] = u[k][j] + f * u[k][i];
                }
            }
        }
        q[i] = g;
        s = 0;
        for (let j = l; j < n; j++) {
            s += Math.pow(u[i][j], 2);
        }
        if (s < tol) {
            g = 0;
        } else {
            f = u[i][i + 1];
            g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
            h = f * g - s;
            u[i][i + 1] = f - g;
            for (let j = l; j < n; j++) {
                e[j] = u[i][j] / h;
            }
            for (let j = l; j < m; j++) {
                s = 0;
                for (let k = l; k < n; k++) {
                    s += u[j][k] * u[i][k];
                }
                for (let k = l; k < n; k++) {
                    u[j][k] = u[j][k] + s * e[k];
                }
            }
        }
        y = Math.abs(q[i]) + Math.abs(e[i]);
        if (y > x) {
            x = y;
        }
    }

    // Accumulation of right-hand transformations
    if (withv) {
        for (let i = n - 1; i >= 0; i--) {
            if (g !== 0) {
                h = u[i][i + 1] * g;
                for (let j = l; j < n; j++) {
                    v[j][i] = u[i][j] / h;
                }
                for (let j = l; j < n; j++) {
                    s = 0;
                    for (let k = l; k < n; k++) {
                        s += u[i][k] * v[k][j];
                    }
                    for (let k = l; k < n; k++) {
                        v[k][j] = v[k][j] + s * v[k][i];
                    }
                }
            }
            for (let j = l; j < n; j++) {
                v[i][j] = 0;
                v[j][i] = 0;
            }
            v[i][i] = 1;
            g = e[i];
            l = i;
        }
    }

    // Accumulation of left-hand transformations
    if (withu) {
        for (let i = n - 1; i >= 0; i--) {
            l = i + 1;
            g = q[i];
            for (let j = l; j < n; j++) {
                u[i][j] = 0;
            }
            if (g !== 0) {
                h = u[i][i] * g;
                for (let j = l; j < n; j++) {
                    s = 0;
                    for (let k = l; k < m; k++) {
                        s += u[k][i] * u[k][j];
                    }
                    f = s / h;
                    for (let k = i; k < m; k++) {
                        u[k][j] = u[k][j] + f * u[k][i];
                    }
                }
                for (let j = i; j < m; j++) {
                    u[j][i] = u[j][i] / g;
                }
            } else {
                for (let j = i; j < m; j++) {
                    u[j][i] = 0;
                }
            }
            u[i][i] = u[i][i] + 1;
        }
    }

    // Diagonalization of the bidiagonal form
    eps = eps * x;
    let testConvergence;
    for (let k = n - 1; k >= 0; k--) {
        for (let iteration = 0; iteration < 50; iteration++) {
            // test-f-splitting
            testConvergence = false;
            for (l = k; l >= 0; l--) {
                if (Math.abs(e[l]) <= eps) {
                    testConvergence = true;
                    break;
                }
                if (Math.abs(q[l - 1]) <= eps) {
                    break;
                }
            }

            if (!testConvergence) {
                // cancellation of e[l] if l>0
                c = 0;
                s = 1;
                l1 = l - 1;
                for (let i = l; i < k + 1; i++) {
                    f = s * e[i];
                    e[i] = c * e[i];
                    if (Math.abs(f) <= eps) {
                        break; // goto test-f-convergence
                    }
                    g = q[i];
                    q[i] = Math.sqrt(f * f + g * g);
                    h = q[i];
                    c = g / h;
                    s = -f / h;
                    if (withu) {
                        for (let j = 0; j < m; j++) {
                            y = u[j][l1];
                            z = u[j][i];
                            u[j][l1] = y * c + z * s;
                            u[j][i] = -y * s + z * c;
                        }
                    }
                }
            }

            // test f convergence
            z = q[k];
            if (l === k) {
                // convergence
                if (z < 0) {
                    // q[k] is made non-negative
                    q[k] = -z;
                    if (withv) {
                        for (let j = 0; j < n; j++) {
                            v[j][k] = -v[j][k];
                        }
                    }
                }
                break; // break out of iteration loop and move on to next k value
            }

            // Shift from bottom 2x2 minor
            x = q[l];
            y = q[k - 1];
            g = e[k - 1];
            h = e[k];
            f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
            g = Math.sqrt(f * f + 1);
            f = ((x - z) * (x + z) + h * (y / (f < 0 ? f - g : f + g) - h)) / x;

            // Next QR transformation
            c = 1;
            s = 1;
            for (let i = l + 1; i < k + 1; i++) {
                g = e[i];
                y = q[i];
                h = s * g;
                g = c * g;
                z = Math.sqrt(f * f + h * h);
                e[i - 1] = z;
                c = f / z;
                s = h / z;
                f = x * c + g * s;
                g = -x * s + g * c;
                h = y * s;
                y = y * c;
                if (withv) {
                    for (let j = 0; j < n; j++) {
                        x = v[j][i - 1];
                        z = v[j][i];
                        v[j][i - 1] = x * c + z * s;
                        v[j][i] = -x * s + z * c;
                    }
                }
                z = Math.sqrt(f * f + h * h);
                q[i - 1] = z;
                c = f / z;
                s = h / z;
                f = c * g + s * y;
                x = -s * g + c * y;
                if (withu) {
                    for (let j = 0; j < m; j++) {
                        y = u[j][i - 1];
                        z = u[j][i];
                        u[j][i - 1] = y * c + z * s;
                        u[j][i] = -y * s + z * c;
                    }
                }
            }
            e[l] = 0;
            e[k] = f;
            q[k] = x;
        }
    }

    // Number below eps should be zero
    for (let i = 0; i < n; i++) {
        if (q[i] < eps) q[i] = 0;
    }

    return { u, q, v };
}