import { mat } from '../matrix/matrix';
import { LU, LUresult } from './lu';
//Reference: 
//https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/matrix/inv.js



function inverse(inmat: mat):mat {
    if (inmat.rows != inmat.cols) throw new Error("A must be a suqare matrix");

    const A = inmat.clone().val.concat()
    for (var r = 0; r < inmat.rows; r++) {
        A[r] = A[r].concat()
    }

    // create an identity matrix which in the end will contain the
    // matrix inverse
    var B = new mat().identity(inmat.rows).val;
    var cols = inmat.cols; var rows = inmat.rows;
    // loop over all columns, and perform row reductions
    for (let c = 0; c < cols; c++) {
        // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
        let ABig = Math.abs(A[c][c])
        let rBig = c
        r = c + 1
        while (r < rows) {
            if (Math.abs(A[r][c]) > ABig) {
                ABig = Math.abs(A[r][c])
                rBig = r
            }
            r++
        }
        if (ABig === 0) {
            throw Error('Cannot calculate inverse, determinant is zero')
        }
        r = rBig
        if (r !== c) {
            var temp = A[c]; A[c] = A[r]; A[r] = temp
            temp = B[c]; B[c] = B[r]; B[r] = temp
        }

        // eliminate non-zero values on the other rows at column c
        const Ac = A[c]
        const Bc = B[c]
        for (r = 0; r < rows; r++) {
            const Ar = A[r]
            const Br = B[r]
            if (r !== c) {
                // eliminate value at column c and row r
                if (Ar[c] !== 0) {
                    var f = -1* Ar[c]/ Ac[c]

                    // add (f * row c) to row r to eliminate the value
                    // at column c
                    for (var s = c; s < cols; s++) {
                        Ar[s] = Ar[s]+f*Ac[s]
                    }
                    for (var s = 0; s < cols; s++) {
                        Br[s] = Br[s] + f*Bc[s]
                    }
                }
            } else {
                // normalize value at Acc to 1,
                // divide each value on row r with the value at Acc
                f = Ac[c]
                for (s = c; s < cols; s++) {
                    Ar[s] = Ar[s]/ f
                }
                for (s = 0; s < cols; s++) {
                    Br[s] = Br[s] / f
                }
            }
        }
    }
    return new mat().init(B);

}

export { inverse };