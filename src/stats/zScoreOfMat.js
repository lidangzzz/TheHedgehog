import { mat, zScore } from '../app';
/*

Standardized z scores
input X: the matrix
isUsingSampleStandardDeviation == true: using Sample Standard Deviation, otherwise using population standard deviation.
isColumn== true: z-score of column
return: the z-score of X, in which each element of every column has mean of 0 and standard deviation 1

*/
function zScoreOfMatrix(x, isUsingSampleStandardDeviation, isColumn) {
    if (isUsingSampleStandardDeviation === void 0) { isUsingSampleStandardDeviation = true; }
    if (isColumn === void 0) { isColumn = true; }
    if (isUsingSampleStandardDeviation)
        return zScoreUsingSampleStandardDeviation(x, isColumn);
    else {
        throw new Error("population standard deviation is not implemented yet.");
    }
}
function zScoreUsingSampleStandardDeviation(x_, isColumn) {
    if (isColumn === void 0) { isColumn = true; }
    var xT = new mat();
    if (isColumn) {
        xT = x_.T();
    }
    else {
        xT = x_;
    }
    var return2DArray = [];
    //compute the mean and standard deviation of X of each column\
    for (var i = 0; i < xT.val.length; i++) {
        var currentRow = xT.val[i];
        var zscoreOfCurrentRow = zScore(currentRow);
        return2DArray.push(zscoreOfCurrentRow);
    }
    var returnMatrixT = new mat(return2DArray);
    if (!isColumn)
        return returnMatrixT;
    return returnMatrixT.T();
}
export { zScoreOfMatrix };
