import { mat } from '../matrix/matrix';
function mat2csv(A) {
    var returnCSV = "";
    for (var i = 0; i < A.rows; i++) {
        for (var j = 0; j < A.cols; j++) {
            if (j == 0) {
                returnCSV += String(A.val[i][j]);
            }
            else {
                returnCSV += (',' + String(A.val[i][j]));
            }
        }
        returnCSV += '\n';
    }
    return returnCSV;
}
function mat2csvWithNewLines(A) {
    var returnCSV = "";
    for (var i = 0; i < A.rows; i++) {
        for (var j = 0; j < A.cols; j++) {
            if (j == 0) {
                returnCSV += String(A.val[i][j]);
            }
            else {
                returnCSV += (',' + String(A.val[i][j]));
            }
        }
        returnCSV += ';\n';
    }
    return returnCSV;
}
function csv2mat(strCSV) {
    var A = new mat();
    try {
        if (csv2mat.length == 0)
            return A;
        var split_result = strCSV.split('\n');
        var linesOfCSVString = split_result.filter(x => x.length > 0);
        var rows = linesOfCSVString.length;
        var cols = linesOfCSVString[0].split(',').length;
        A.zeros(rows, cols);
        //process each line
        for (var row = 0; row < rows; row++) {
            var eachRowString = linesOfCSVString[row];
            var listOfElement = eachRowString.split(',');
            if (listOfElement.length != cols)
                throw new Error("Current row " + row.toString() + " does not have same element as first row");
            for (var col = 0; col < cols; col++) {
                A.val[row][col] = Number(listOfElement[col]);
            }
        }
    }
    catch (err) {
        throw new Error("Cannot parse matrix from csv file. Exception: " + err);
    }
    return A;
}
export { mat2csv, csv2mat, mat2csvWithNewLines };
