"use strict";

var matrixUnitTest = _interopRequireWildcard(require("./matrix/matrixUnitTest"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

matrixUnitTest.matrixTest();
console.log("All unit tests pass.");

while (1) {}