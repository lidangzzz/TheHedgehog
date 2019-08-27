import { mat } from '../matrix/matrix';

function mat2csv(A) {
  var returnCSV = "";

  for (var i = 0; function (_left, _right) {
    if (_left !== null && _left !== undefined && _left[Symbol.for("<")]) return _left[Symbol.for("<")](_right);else return _left < _right;
  }(i, A.rows); i++) {
    for (var j = 0; function (_left2, _right2) {
      if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
    }(j, A.cols); j++) {
      if (function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("==")]) return _left3[Symbol.for("==")](_right3);else return _left3 == _right3;
      }(j, 0)) {
        returnCSV += String(A.val[i][j]);
      } else {
        returnCSV += function (_left4, _right4) {
          if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("+")]) return _left4[Symbol.for("+")](_right4);else return _left4 + _right4;
        }(',', String(A.val[i][j]));
      }
    }

    returnCSV += '\n';
  }

  return returnCSV;
}

function csv2mat(strCSV) {
  var A = new mat();

  try {
    if (function (_left5, _right5) {
      if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for("==")]) return _left5[Symbol.for("==")](_right5);else return _left5 == _right5;
    }(csv2mat.length, 0)) return A;
    var split_result = strCSV.split('\n');
    var linesOfCSVString = split_result.filter(x => function (_left6, _right6) {
      if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for(">")]) return _left6[Symbol.for(">")](_right6);else return _left6 > _right6;
    }(x.length, 0));
    var rows = linesOfCSVString.length;
    var cols = linesOfCSVString[0].split(',').length;
    A.zeros(rows, cols); //process each line

    for (var row = 0; function (_left7, _right7) {
      if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
    }(row, rows); row++) {
      var eachRowString = linesOfCSVString[row];
      var listOfElement = eachRowString.split(',');
      if (function (_left8, _right8) {
        if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("!=")]) return _left8[Symbol.for("!=")](_right8);else return _left8 != _right8;
      }(listOfElement.length, cols)) throw new Error(function (_left9, _right9) {
        if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("+")]) return _left9[Symbol.for("+")](_right9);else return _left9 + _right9;
      }(function (_left10, _right10) {
        if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("+")]) return _left10[Symbol.for("+")](_right10);else return _left10 + _right10;
      }("Current row ", row.toString()), " does not have same element as first row"));

      for (var col = 0; function (_left11, _right11) {
        if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("<")]) return _left11[Symbol.for("<")](_right11);else return _left11 < _right11;
      }(col, cols); col++) {
        A.val[row][col] = Number(listOfElement[col]);
      }
    }
  } catch (err) {
    throw new Error(function (_left12, _right12) {
      if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("+")]) return _left12[Symbol.for("+")](_right12);else return _left12 + _right12;
    }("Cannot parse matrix from csv file. Exception: ", err));
  }

  return A;
}

export { mat2csv, csv2mat };