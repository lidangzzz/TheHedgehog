import { mat } from '../matrix/matrix';

function cholesky(A: mat): mat {
    if (A.rows != A.cols || A.rows == 0 || A.cols == 0) throw new Error("Wrong dimension of matrix A.");

    //dimension n
    var n = A.rows;

    //matrix L
    var L = new mat().zeros(n, n);

    //iteration
    for (var i = 0; i < n; i++) {
        for (var k = 0; k < i + 1; k++) {
            var sum = 0;
            for (var j = 0; j < k; j++) {
                sum += L.val[i][j] * L.val[k][j];
            }

            if (i == k) {
                L.val[i][k] = Math.sqrt(A.val[i][i] - sum);
            }

            else {
                L.val[i][k] = 1.0 / L.val[k][k] * (A.val[i][k] - sum);
            }
        }
    }

    return L;
}

export { cholesky };