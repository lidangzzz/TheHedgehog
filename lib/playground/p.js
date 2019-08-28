"use strict";

var m = _interopRequireWildcard(require("../app"));

var _logisticRegression = require("../ml/logisticRegression");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var mat_str = "\n    15    20     0\n    20    30     1\n    30    20     1\n    25    25     0\n    26     8     0\n    36     8     0\n    22    35     1\n    24    30     1\n    10    15     0\n     8    60     1\n    33    35     1\n    18    18     0\n    33    17     1\n";
var mat = m.read(mat_str);
var a = new m.mat([1, 2, 3]);
var b = new m.mat([4, 5, 6]).T(); //console.log(a*100);
//console.log( a + a );

var v1 = new m.mat(5);
console.log(new m.mat().range(10).reshape(3, 3).toString());

while (1) {}

var x = mat.getCols(0, 2);
var y = mat.getCols(2, 3);
var lr = new _logisticRegression.LogisticRegression();
lr.fit(x, y);

while (1) {}