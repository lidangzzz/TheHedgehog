"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mat = void 0;

var _util = require("util");

var m = _interopRequireWildcard(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left107, _right107) { if (_left107 !== null && _left107 !== undefined && _left107[Symbol.for("!=")]) return _left107[Symbol.for("!=")](_right107);else return _left107 != _right107; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (function (_left105, _right105) { if (_left105 !== null && _left105 !== undefined && _left105[Symbol.for("in")]) return _left105[Symbol.for("in")](_right105);else return _left105 in _right105; }(Symbol.iterator, Object(iter)) || function (_left106, _right106) { if (_left106 !== null && _left106 !== undefined && _left106[Symbol.for("===")]) return _left106[Symbol.for("===")](_right106);else return _left106 === _right106; }(Object.prototype.toString.call(iter), "[object Arguments]")) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); function (_left104, _right104) { if (_left104 !== null && _left104 !== undefined && _left104[Symbol.for("<")]) return _left104[Symbol.for("<")](_right104);else return _left104 < _right104; }(i, arr.length); i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (function (_left99, _right99) { if (_left99 !== null && _left99 !== undefined && _left99[Symbol.for("===")]) return _left99[Symbol.for("===")](_right99);else return _left99 === _right99; }(typeof Symbol, "function") && function (_left100, _right100) { if (_left100 !== null && _left100 !== undefined && _left100[Symbol.for("===")]) return _left100[Symbol.for("===")](_right100);else return _left100 === _right100; }(typeof Symbol.iterator, "symbol")) { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && function (_left101, _right101) { if (_left101 !== null && _left101 !== undefined && _left101[Symbol.for("===")]) return _left101[Symbol.for("===")](_right101);else return _left101 === _right101; }(typeof Symbol, "function") && function (_left102, _right102) { if (_left102 !== null && _left102 !== undefined && _left102[Symbol.for("===")]) return _left102[Symbol.for("===")](_right102);else return _left102 === _right102; }(obj.constructor, Symbol) && function (_left103, _right103) { if (_left103 !== null && _left103 !== undefined && _left103[Symbol.for("!==")]) return _left103[Symbol.for("!==")](_right103);else return _left103 !== _right103; }(obj, Symbol.prototype) ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!function (_left98, _right98) { if (_left98 !== null && _left98 !== undefined && _left98[Symbol.for("instanceof")]) return _left98[Symbol.for("instanceof")](_right98);else return _left98 instanceof _right98; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left96, _right96) { if (_left96 !== null && _left96 !== undefined && _left96[Symbol.for("<")]) return _left96[Symbol.for("<")](_right96);else return _left96 < _right96; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left97, _right97) { if (_left97 !== null && _left97 !== undefined && _left97[Symbol.for("in")]) return _left97[Symbol.for("in")](_right97);else return _left97 in _right97; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mat =
/*#__PURE__*/
function () {
  _createClass(mat, [{
    key: "clear",
    value: function clear() {
      this.val = [];
      this.rows = 0;
      this.cols = 0;
      return this;
    }
  }]);

  function mat(input) {
    _classCallCheck(this, mat);

    this.GPU = false;
    this.val = [];
    this.rows = 0;
    this.cols = 0;

    if (function (_left, _right) {
      if (_left !== null && _left !== undefined && _left[Symbol.for("==")]) return _left[Symbol.for("==")](_right);else return _left == _right;
    }(_typeof(input), 'number')) {
      this.val = [[input]];
      this.rows = 1;
      this.cols = 1;
      return this;
    }

    if (Array.isArray(input)) {
      //if input is an 2D array
      if (Array.isArray(input[0])) {
        this.init(input);
      } //else it is a 1D vector
      else {
          this.initVec(input);
        }
    }
  }

  _createClass(mat, [{
    key: "dimensions",
    value: function dimensions() {
      return Array.from([this.rows, this.cols]);
    }
  }, {
    key: "isVector",
    value: function isVector() {
      return function (_left2, _right2) {
        if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<=")]) return _left2[Symbol.for("<=")](_right2);else return _left2 <= _right2;
      }(this.rows, 1);
    } //initialize with a 2D array

  }, {
    key: "init",
    value: function init(input2DArray) {
      this.clear();
      this.rows = input2DArray.length;
      if (function (_left3, _right3) {
        if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for(">")]) return _left3[Symbol.for(">")](_right3);else return _left3 > _right3;
      }(this.rows, 0)) this.cols = input2DArray[0].length;else this.cols = 0;

      for (var i = 0; function (_left4, _right4) {
        if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("<")]) return _left4[Symbol.for("<")](_right4);else return _left4 < _right4;
      }(i, input2DArray.length); i++) {
        this.val.push(_toConsumableArray(input2DArray[i]));
      }

      return this;
    }
  }, {
    key: "dimCheck",
    value: function dimCheck(row, col) {
      if (function (_left5, _right5) {
        if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for(">=")]) return _left5[Symbol.for(">=")](_right5);else return _left5 >= _right5;
      }(row, this.rows) || function (_left6, _right6) {
        if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("<")]) return _left6[Symbol.for("<")](_right6);else return _left6 < _right6;
      }(row, 0) || function (_left7, _right7) {
        if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for(">")]) return _left7[Symbol.for(">")](_right7);else return _left7 > _right7;
      }(col, this.cols) || function (_left8, _right8) {
        if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("<")]) return _left8[Symbol.for("<")](_right8);else return _left8 < _right8;
      }(col, 0) || function (_left9, _right9) {
        if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("==")]) return _left9[Symbol.for("==")](_right9);else return _left9 == _right9;
      }(Number.isInteger(row), false) || function (_left10, _right10) {
        if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("==")]) return _left10[Symbol.for("==")](_right10);else return _left10 == _right10;
      }(Number.isInteger(col), false)) {
        throw new Error("Invalid row or column");
      }
    } //initialize with 1D array (vector) into an N-by-1 matrix

  }, {
    key: "initVec",
    value: function initVec(input1DArray) {
      this.clear();
      this.rows = 1;
      this.cols = input1DArray.length;
      this.val.push(_toConsumableArray(input1DArray));
      return this;
    } //generate a N-by-1 matrix by initializing a range vector [start:end:step]. 

  }, {
    key: "range",
    value: function range(arg1) {
      var arg2 = function (_left11, _right11) {
        if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for(">")]) return _left11[Symbol.for(">")](_right11);else return _left11 > _right11;
      }(arguments.length, 1) && function (_left12, _right12) {
        if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("!==")]) return _left12[Symbol.for("!==")](_right12);else return _left12 !== _right12;
      }(arguments[1], undefined) ? arguments[1] : null;
      var step = function (_left13, _right13) {
        if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for(">")]) return _left13[Symbol.for(">")](_right13);else return _left13 > _right13;
      }(arguments.length, 2) && function (_left14, _right14) {
        if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("!==")]) return _left14[Symbol.for("!==")](_right14);else return _left14 !== _right14;
      }(arguments[2], undefined) ? arguments[2] : 1;
      var rangeVector = [];
      var start = 0,
          end = 0;

      if ((0, _util.isNull)(arg2)) {
        start = 0;
        end = arg1;
      } // range from 0 to arg1 
      else {
          start = arg1;
          end = arg2;
        } //range from arg1 to arg2


      if (function (_left15, _right15) {
        if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("<")]) return _left15[Symbol.for("<")](_right15);else return _left15 < _right15;
      }(start, end)) {
        for (var iterator = start; function (_left16, _right16) {
          if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
        }(iterator, end); iterator += step) {
          rangeVector.push(iterator);
        }

        return this.initVec(rangeVector);
      }

      for (var iterator = start; function (_left17, _right17) {
        if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for(">")]) return _left17[Symbol.for(">")](_right17);else return _left17 > _right17;
      }(iterator, end); iterator += step) {
        //else
        rangeVector.push(iterator);
      }

      return this.initVec(rangeVector);
    } // return a clone of this matrix

  }, {
    key: "clone",
    value: function clone() {
      var returnMat = new mat();
      returnMat.rows = this.rows;
      returnMat.cols = this.cols;

      for (var i = 0; function (_left18, _right18) {
        if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("<")]) return _left18[Symbol.for("<")](_right18);else return _left18 < _right18;
      }(i, this.val.length); i++) {
        returnMat.val.push(_toConsumableArray(this.val[i]));
      }

      return returnMat;
    } // initialize a matrix by copying from another matrix

  }, {
    key: "copy",
    value: function copy(inputMat) {
      this.init(inputMat.val);
      this.cols = inputMat.cols;
      this.rows = inputMat.rows;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(inMat) {
      var EPSILON = function (_left19, _right19) {
        if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for(">")]) return _left19[Symbol.for(">")](_right19);else return _left19 > _right19;
      }(arguments.length, 1) && function (_left20, _right20) {
        if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("!==")]) return _left20[Symbol.for("!==")](_right20);else return _left20 !== _right20;
      }(arguments[1], undefined) ? arguments[1] : 0.0001;
      if (function (_left21, _right21) {
        if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("!=")]) return _left21[Symbol.for("!=")](_right21);else return _left21 != _right21;
      }(this.cols, inMat.cols) || function (_left22, _right22) {
        if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("!=")]) return _left22[Symbol.for("!=")](_right22);else return _left22 != _right22;
      }(this.rows, inMat.rows)) return false;
      var sumOfDiff = this.minus(inMat).squareSum();
      return function (_left23, _right23) {
        if (_left23 !== null && _left23 !== undefined && _left23[Symbol.for("<=")]) return _left23[Symbol.for("<=")](_right23);else return _left23 <= _right23;
      }(sumOfDiff, EPSILON);
    } //initialze an row-by-col matrix with all elements are N

  }, {
    key: "Ns",
    value: function Ns(row, col, N) {
      this.clear();
      this.rows = row;
      this.cols = col;

      for (var i = 0; function (_left24, _right24) {
        if (_left24 !== null && _left24 !== undefined && _left24[Symbol.for("<")]) return _left24[Symbol.for("<")](_right24);else return _left24 < _right24;
      }(i, row); i++) {
        this.val.push(Array(col).fill(N));
      }

      return this;
    } //initialze a zero matrix

  }, {
    key: "zeros",
    value: function zeros(row, col) {
      return this.Ns(row, col, 0);
    }
  }, {
    key: "ones",
    value: function ones(row, col) {
      return this.Ns(row, col, 1);
    } // initiaze an N*N matrix with diag values

  }, {
    key: "diag",
    value: function diag(input1DArray) {
      this.clear();
      this.zeros(input1DArray.length, input1DArray.length);

      for (var i = 0; function (_left25, _right25) {
        if (_left25 !== null && _left25 !== undefined && _left25[Symbol.for("<")]) return _left25[Symbol.for("<")](_right25);else return _left25 < _right25;
      }(i, input1DArray.length); i++) {
        this.val[i][i] = input1DArray[i];
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity(N) {
      var diag_ones = Array(N).fill(1);
      return this.diag(diag_ones);
    } // initialize a random matrix

  }, {
    key: "random",
    value: function random(row, col) {
      this.clear();
      this.zeros(row, col);

      for (var row = 0; function (_left26, _right26) {
        if (_left26 !== null && _left26 !== undefined && _left26[Symbol.for("<")]) return _left26[Symbol.for("<")](_right26);else return _left26 < _right26;
      }(row, this.rows); row++) {
        for (var col = 0; function (_left27, _right27) {
          if (_left27 !== null && _left27 !== undefined && _left27[Symbol.for("<")]) return _left27[Symbol.for("<")](_right27);else return _left27 < _right27;
        }(col, this.cols); col++) {
          this.val[row][col] = Math.random();
        }
      }

      return this;
    }
  }, {
    key: "T",
    value: function T() {
      // transpose
      var returnMatrix = new mat().zeros(this.cols, this.rows);

      for (var row = 0; function (_left28, _right28) {
        if (_left28 !== null && _left28 !== undefined && _left28[Symbol.for("<")]) return _left28[Symbol.for("<")](_right28);else return _left28 < _right28;
      }(row, this.rows); row++) {
        for (var col = 0; function (_left29, _right29) {
          if (_left29 !== null && _left29 !== undefined && _left29[Symbol.for("<")]) return _left29[Symbol.for("<")](_right29);else return _left29 < _right29;
        }(col, this.cols); col++) {
          returnMatrix.val[col][row] = this.val[row][col];
        }
      }

      return returnMatrix;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      return this.T();
    }
  }, {
    key: "each",
    value: function each(func) {
      for (var row = 0; function (_left30, _right30) {
        if (_left30 !== null && _left30 !== undefined && _left30[Symbol.for("<")]) return _left30[Symbol.for("<")](_right30);else return _left30 < _right30;
      }(row, this.rows); row++) {
        for (var col = 0; function (_left31, _right31) {
          if (_left31 !== null && _left31 !== undefined && _left31[Symbol.for("<")]) return _left31[Symbol.for("<")](_right31);else return _left31 < _right31;
        }(col, this.cols); col++) {
          this.val[row][col] = func(this.val[row][col]);
        }
      }

      return this;
    } //get max, min, mean, median value

  }, {
    key: "max",
    value: function max() {
      var maxValue = this.val[0][0];

      for (var i = 0; function (_left32, _right32) {
        if (_left32 !== null && _left32 !== undefined && _left32[Symbol.for("<")]) return _left32[Symbol.for("<")](_right32);else return _left32 < _right32;
      }(i, this.rows); i++) {
        for (var j = 0; function (_left33, _right33) {
          if (_left33 !== null && _left33 !== undefined && _left33[Symbol.for("<")]) return _left33[Symbol.for("<")](_right33);else return _left33 < _right33;
        }(j, this.cols); j++) {
          maxValue = Math.max(maxValue, this.val[i][j]);
        }
      }

      return maxValue;
    }
  }, {
    key: "min",
    value: function min() {
      var minValue = this.val[0][0];

      for (var i = 0; function (_left34, _right34) {
        if (_left34 !== null && _left34 !== undefined && _left34[Symbol.for("<")]) return _left34[Symbol.for("<")](_right34);else return _left34 < _right34;
      }(i, this.rows); i++) {
        for (var j = 0; function (_left35, _right35) {
          if (_left35 !== null && _left35 !== undefined && _left35[Symbol.for("<")]) return _left35[Symbol.for("<")](_right35);else return _left35 < _right35;
        }(j, this.cols); j++) {
          minValue = Math.min(minValue, this.val[i][j]);
        }
      }

      return minValue;
    }
  }, {
    key: "sum",
    value: function sum() {
      var sum = 0;

      for (var i = 0; function (_left36, _right36) {
        if (_left36 !== null && _left36 !== undefined && _left36[Symbol.for("<")]) return _left36[Symbol.for("<")](_right36);else return _left36 < _right36;
      }(i, this.rows); i++) {
        for (var j = 0; function (_left37, _right37) {
          if (_left37 !== null && _left37 !== undefined && _left37[Symbol.for("<")]) return _left37[Symbol.for("<")](_right37);else return _left37 < _right37;
        }(j, this.cols); j++) {
          sum += this.val[i][j];
        }
      }

      return sum;
    }
  }, {
    key: "mean",
    value: function mean() {
      return function (_left38, _right38) {
        if (_left38 !== null && _left38 !== undefined && _left38[Symbol.for("/")]) return _left38[Symbol.for("/")](_right38);else return _left38 / _right38;
      }(this.sum(), function (_left39, _right39) {
        if (_left39 !== null && _left39 !== undefined && _left39[Symbol.for("*")]) return _left39[Symbol.for("*")](_right39);else return _left39 * _right39;
      }(this.rows, this.cols));
    }
  }, {
    key: "median",
    value: function median() {
      var sortedValueArray = this.toArray().sort();
      return function (_left40, _right40) {
        if (_left40 !== null && _left40 !== undefined && _left40[Symbol.for("==")]) return _left40[Symbol.for("==")](_right40);else return _left40 == _right40;
      }(function (_left41, _right41) {
        if (_left41 !== null && _left41 !== undefined && _left41[Symbol.for("%")]) return _left41[Symbol.for("%")](_right41);else return _left41 % _right41;
      }(sortedValueArray.length, 2), 0) ? function (_left42, _right42) {
        if (_left42 !== null && _left42 !== undefined && _left42[Symbol.for("/")]) return _left42[Symbol.for("/")](_right42);else return _left42 / _right42;
      }(function (_left43, _right43) {
        if (_left43 !== null && _left43 !== undefined && _left43[Symbol.for("+")]) return _left43[Symbol.for("+")](_right43);else return _left43 + _right43;
      }(sortedValueArray[function (_left44, _right44) {
        if (_left44 !== null && _left44 !== undefined && _left44[Symbol.for("-")]) return _left44[Symbol.for("-")](_right44);else return _left44 - _right44;
      }(function (_left45, _right45) {
        if (_left45 !== null && _left45 !== undefined && _left45[Symbol.for("/")]) return _left45[Symbol.for("/")](_right45);else return _left45 / _right45;
      }(sortedValueArray.length, 2), 1)], sortedValueArray[function (_left46, _right46) {
        if (_left46 !== null && _left46 !== undefined && _left46[Symbol.for("/")]) return _left46[Symbol.for("/")](_right46);else return _left46 / _right46;
      }(sortedValueArray.length, 2)]), 2) : sortedValueArray[function (_left47, _right47) {
        if (_left47 !== null && _left47 !== undefined && _left47[Symbol.for("/")]) return _left47[Symbol.for("/")](_right47);else return _left47 / _right47;
      }(function (_left48, _right48) {
        if (_left48 !== null && _left48 !== undefined && _left48[Symbol.for("-")]) return _left48[Symbol.for("-")](_right48);else return _left48 - _right48;
      }(sortedValueArray.length, 1), 2)];
    } //add, multiply, minus, divide with one scalar value

  }, {
    key: "adds",
    value: function adds(val) {
      this.each(function (eachMatrixValue) {
        return function (_left49, _right49) {
          if (_left49 !== null && _left49 !== undefined && _left49[Symbol.for("+")]) return _left49[Symbol.for("+")](_right49);else return _left49 + _right49;
        }(eachMatrixValue, val);
      });
      return this;
    }
  }, {
    key: "muls",
    value: function muls(val) {
      this.each(function (eachMatrixValue) {
        return function (_left50, _right50) {
          if (_left50 !== null && _left50 !== undefined && _left50[Symbol.for("*")]) return _left50[Symbol.for("*")](_right50);else return _left50 * _right50;
        }(eachMatrixValue, val);
      });
      return this;
    }
  }, {
    key: "minuss",
    value: function minuss(val) {
      return this.adds(function (_left51, _right51) {
        if (_left51 !== null && _left51 !== undefined && _left51[Symbol.for("*")]) return _left51[Symbol.for("*")](_right51);else return _left51 * _right51;
      }(val, -1));
    }
  }, {
    key: "divs",
    value: function divs(val) {
      return this.muls(function (_left52, _right52) {
        if (_left52 !== null && _left52 !== undefined && _left52[Symbol.for("/")]) return _left52[Symbol.for("/")](_right52);else return _left52 / _right52;
      }(1.0, val));
    } //matrix operations. All matrix operation member functions are NOT In Place

  }, {
    key: "add",
    value: function add(rightMat) {
      return m.add(this, rightMat);
    }
  }, {
    key: "minus",
    value: function minus(rightMat) {
      return m.minus(this, rightMat);
    }
  }, {
    key: "mul",
    value: function mul(rightMat) {
      return m.mul(this, rightMat);
    }
  }, {
    key: "mul_gpu",
    value: function mul_gpu(rightMat) {
      var result = m.mul_gpu(this, rightMat);
      this.copy(result);
      return this;
    }
  }, {
    key: Symbol.for('+'),
    value: function value(rightOperand) {
      //if right operand is a raw array of number or 2D array, initialize the matrix first
      if (Array.isArray(rightOperand)) {
        return this.add(new mat(rightOperand));
      } //if right operand is a number, add the number as a scalar


      if (function (_left53, _right53) {
        if (_left53 !== null && _left53 !== undefined && _left53[Symbol.for("==")]) return _left53[Symbol.for("==")](_right53);else return _left53 == _right53;
      }(_typeof(rightOperand), 'number')) {
        return this.adds(rightOperand);
      } //otherwise, add the right operand as a matrix


      return this.add(rightOperand);
    }
  }, {
    key: Symbol.for('-'),
    value: function value(rightOperand) {
      //if right operand is a raw array of number or 2D array, initialize the matrix first
      if (Array.isArray(rightOperand)) {
        return this.minus(new mat(rightOperand));
      } //if right operand is a number, minus the number as a scalar


      if (function (_left54, _right54) {
        if (_left54 !== null && _left54 !== undefined && _left54[Symbol.for("==")]) return _left54[Symbol.for("==")](_right54);else return _left54 == _right54;
      }(_typeof(rightOperand), 'number')) {
        return this.minuss(rightOperand);
      } //otherwise, minus the right operand as a matrix


      return this.clone().minus(rightOperand);
    }
  }, {
    key: Symbol.for('*'),
    value: function value(rightOperand) {
      //if right operand is a raw array of number or 2D array, initialize the matrix first
      if (Array.isArray(rightOperand)) {
        var rightOperandMatrix = new mat(rightOperand);
        return this.mul(rightOperandMatrix);
      } //if right operand is a number, mul the number as a scalar


      if (function (_left55, _right55) {
        if (_left55 !== null && _left55 !== undefined && _left55[Symbol.for("==")]) return _left55[Symbol.for("==")](_right55);else return _left55 == _right55;
      }(_typeof(rightOperand), 'number')) {
        return this.muls(rightOperand);
      } //otherwise, minus the right operand as a matrix


      return this.mul(rightOperand);
    }
  }, {
    key: Symbol.for('^'),
    value: function value(rightOperand) {
      if (function (_left56, _right56) {
        if (_left56 !== null && _left56 !== undefined && _left56[Symbol.for("!=")]) return _left56[Symbol.for("!=")](_right56);else return _left56 != _right56;
      }(this.rows, this.cols)) throw new Error("This matrix does not support ^ operator"); //if right operand is -1, return the inverse matrix

      if (function (_left57, _right57) {
        if (_left57 !== null && _left57 !== undefined && _left57[Symbol.for("==")]) return _left57[Symbol.for("==")](_right57);else return _left57 == _right57;
      }(rightOperand, -1)) {
        return m.inverse(this);
      } //check if rightOperand is an integer


      if (!Number.isInteger(rightOperand) || function (_left58, _right58) {
        if (_left58 !== null && _left58 !== undefined && _left58[Symbol.for("<")]) return _left58[Symbol.for("<")](_right58);else return _left58 < _right58;
      }(rightOperand, 1)) throw new Error("This right operand does not support ^ operator");
      var returnMatrix = this.clone();

      for (var i = 2; function (_left59, _right59) {
        if (_left59 !== null && _left59 !== undefined && _left59[Symbol.for("<=")]) return _left59[Symbol.for("<=")](_right59);else return _left59 <= _right59;
      }(i, rightOperand); i++) {
        m.mulInPlace(returnMatrix, this);
      }

      return returnMatrix;
    }
  }, {
    key: Symbol.for('=='),
    value: function value(rightOperand) {
      var EPSILON = function (_left60, _right60) {
        if (_left60 !== null && _left60 !== undefined && _left60[Symbol.for(">")]) return _left60[Symbol.for(">")](_right60);else return _left60 > _right60;
      }(arguments.length, 1) && function (_left61, _right61) {
        if (_left61 !== null && _left61 !== undefined && _left61[Symbol.for("!==")]) return _left61[Symbol.for("!==")](_right61);else return _left61 !== _right61;
      }(arguments[1], undefined) ? arguments[1] : 0.0001;

      //if right operand is a raw array of number or 2D array, initialize the matrix first
      if (Array.isArray(rightOperand)) {
        var rightOperandMatrix = new mat(rightOperand);
        return this.equals(rightOperandMatrix);
      } //if right operand is a number, mul the number as a scalar
      else if (function (_left62, _right62) {
          if (_left62 !== null && _left62 !== undefined && _left62[Symbol.for("==")]) return _left62[Symbol.for("==")](_right62);else return _left62 == _right62;
        }(_typeof(rightOperand), 'number')) {
          if (function (_left63, _right63) {
            if (_left63 !== null && _left63 !== undefined && _left63[Symbol.for("!=")]) return _left63[Symbol.for("!=")](_right63);else return _left63 != _right63;
          }(this.rows, 1) || function (_left64, _right64) {
            if (_left64 !== null && _left64 !== undefined && _left64[Symbol.for("!=")]) return _left64[Symbol.for("!=")](_right64);else return _left64 != _right64;
          }(this.cols, 1)) {
            throw new Error("This matrix cannot be compared with a scalar");
          }

          return function (_left65, _right65) {
            if (_left65 !== null && _left65 !== undefined && _left65[Symbol.for("<")]) return _left65[Symbol.for("<")](_right65);else return _left65 < _right65;
          }(function (_left66, _right66) {
            if (_left66 !== null && _left66 !== undefined && _left66[Symbol.for("*")]) return _left66[Symbol.for("*")](_right66);else return _left66 * _right66;
          }(function (_left67, _right67) {
            if (_left67 !== null && _left67 !== undefined && _left67[Symbol.for("-")]) return _left67[Symbol.for("-")](_right67);else return _left67 - _right67;
          }(this.val[0][0], rightOperand), function (_left68, _right68) {
            if (_left68 !== null && _left68 !== undefined && _left68[Symbol.for("-")]) return _left68[Symbol.for("-")](_right68);else return _left68 - _right68;
          }(this.val[0][0], rightOperand)), EPSILON);
        } //otherwise, minus the right operand as a matrix


      return this.equals(rightOperand);
    } //setter and getter

  }, {
    key: "set",
    value: function set(row, col, val) {
      this.dimCheck(row, col);
      this.val[row][col] = val;
      return this;
    }
  }, {
    key: "get",
    value: function get(row, col) {
      this.dimCheck(row, col);
      return this.val[row][col];
    }
  }, {
    key: "at",
    value: function at(row, col) {
      this.dimCheck(row, col);
      return this.val[row][col];
    } //get a row vector (as an N-by-1 matrix) by index

  }, {
    key: "row",
    value: function row(rowIndex) {
      this.dimCheck(rowIndex, 0);
      return new mat().initVec(this.val[rowIndex]);
    } //get a column vector (as an N-by-1 matrix) by index

  }, {
    key: "col",
    value: function col(colIndex) {
      this.dimCheck(0, colIndex);
      var columnVector = Array(this.rows).fill(0);

      for (var rowPt = 0; function (_left69, _right69) {
        if (_left69 !== null && _left69 !== undefined && _left69[Symbol.for("<")]) return _left69[Symbol.for("<")](_right69);else return _left69 < _right69;
      }(rowPt, this.rows); rowPt++) {
        columnVector[rowPt] = this.val[rowPt][colIndex];
      }

      return new mat().initVec(columnVector);
    } //return a 2D array

  }, {
    key: "to2DArray",
    value: function to2DArray() {
      return this.clone().val;
    } //return a 1D array

  }, {
    key: "toArray",
    value: function toArray() {
      var _ref;

      return (_ref = []).concat.apply(_ref, _toConsumableArray(this.val));
    } //reshape matrix

  }, {
    key: "reshape",
    value: function reshape(row, col) {
      var returnMatrix = new mat().zeros(row, col);
      var thisArray = this.toArray();
      var arrayPt = 0;

      for (var i = 0; function (_left70, _right70) {
        if (_left70 !== null && _left70 !== undefined && _left70[Symbol.for("<")]) return _left70[Symbol.for("<")](_right70);else return _left70 < _right70;
      }(i, row); i++) {
        for (var j = 0; function (_left71, _right71) {
          if (_left71 !== null && _left71 !== undefined && _left71[Symbol.for("<")]) return _left71[Symbol.for("<")](_right71);else return _left71 < _right71;
        }(j, col); j++) {
          if (function (_left72, _right72) {
            if (_left72 !== null && _left72 !== undefined && _left72[Symbol.for("<")]) return _left72[Symbol.for("<")](_right72);else return _left72 < _right72;
          }(arrayPt, thisArray.length)) {
            returnMatrix.val[i][j] = thisArray[arrayPt];
            arrayPt++;
          } else {
            break;
          }
        }

        if (function (_left73, _right73) {
          if (_left73 !== null && _left73 !== undefined && _left73[Symbol.for(">=")]) return _left73[Symbol.for(">=")](_right73);else return _left73 >= _right73;
        }(arrayPt, thisArray.length)) break;
      }

      return returnMatrix;
    } //resize matrix to a smaller matrix [rowStart , rowEnd), [colStart , colEnd)
    //All extra spaces will be filled with zero

  }, {
    key: "subMatrix",
    value: function subMatrix(rowStart, rowEnd, colStart, colEnd) {
      rowEnd += 1;
      colEnd += 1;

      if (function (_left74, _right74) {
        if (_left74 !== null && _left74 !== undefined && _left74[Symbol.for("<")]) return _left74[Symbol.for("<")](_right74);else return _left74 < _right74;
      }(rowStart, 0) || function (_left75, _right75) {
        if (_left75 !== null && _left75 !== undefined && _left75[Symbol.for(">")]) return _left75[Symbol.for(">")](_right75);else return _left75 > _right75;
      }(rowEnd, function (_left76, _right76) {
        if (_left76 !== null && _left76 !== undefined && _left76[Symbol.for("+")]) return _left76[Symbol.for("+")](_right76);else return _left76 + _right76;
      }(this.rows, 1)) || function (_left77, _right77) {
        if (_left77 !== null && _left77 !== undefined && _left77[Symbol.for("<")]) return _left77[Symbol.for("<")](_right77);else return _left77 < _right77;
      }(colStart, 0) || function (_left78, _right78) {
        if (_left78 !== null && _left78 !== undefined && _left78[Symbol.for(">")]) return _left78[Symbol.for(">")](_right78);else return _left78 > _right78;
      }(colEnd, function (_left79, _right79) {
        if (_left79 !== null && _left79 !== undefined && _left79[Symbol.for("+")]) return _left79[Symbol.for("+")](_right79);else return _left79 + _right79;
      }(this.cols, 1)) || function (_left80, _right80) {
        if (_left80 !== null && _left80 !== undefined && _left80[Symbol.for(">")]) return _left80[Symbol.for(">")](_right80);else return _left80 > _right80;
      }(rowStart, rowEnd) || function (_left81, _right81) {
        if (_left81 !== null && _left81 !== undefined && _left81[Symbol.for(">")]) return _left81[Symbol.for(">")](_right81);else return _left81 > _right81;
      }(colStart, colEnd)) {
        throw new Error("Please check the dimensions of subMatrix");
      }

      var returnMatrix = new mat().zeros(function (_left82, _right82) {
        if (_left82 !== null && _left82 !== undefined && _left82[Symbol.for("-")]) return _left82[Symbol.for("-")](_right82);else return _left82 - _right82;
      }(rowEnd, rowStart), function (_left83, _right83) {
        if (_left83 !== null && _left83 !== undefined && _left83[Symbol.for("-")]) return _left83[Symbol.for("-")](_right83);else return _left83 - _right83;
      }(colEnd, colStart));

      for (var i = rowStart; function (_left84, _right84) {
        if (_left84 !== null && _left84 !== undefined && _left84[Symbol.for("<=")]) return _left84[Symbol.for("<=")](_right84);else return _left84 <= _right84;
      }(i, rowEnd); i++) {
        var row_index_of_return_matrix = function (_left85, _right85) {
          if (_left85 !== null && _left85 !== undefined && _left85[Symbol.for("-")]) return _left85[Symbol.for("-")](_right85);else return _left85 - _right85;
        }(i, rowStart);

        for (var j = colStart; function (_left86, _right86) {
          if (_left86 !== null && _left86 !== undefined && _left86[Symbol.for("<=")]) return _left86[Symbol.for("<=")](_right86);else return _left86 <= _right86;
        }(j, colEnd); j++) {
          var col_index_of_return_matrix = function (_left87, _right87) {
            if (_left87 !== null && _left87 !== undefined && _left87[Symbol.for("-")]) return _left87[Symbol.for("-")](_right87);else return _left87 - _right87;
          }(j, colStart);

          returnMatrix.val[row_index_of_return_matrix][col_index_of_return_matrix] = this.val[i][j];
        }
      }

      return returnMatrix;
    } //get a few rows of matrix

  }, {
    key: "getRows",
    value: function getRows(rowStart, rowEnd) {
      return this.subMatrix(rowStart, rowEnd, 0, this.cols);
    } //get a few columns of matrix

  }, {
    key: "getCols",
    value: function getCols(colStart, colEnd) {
      return this.subMatrix(0, this.rows, colStart, colEnd);
    } //resize the matrix to a larger or smaller matrix
    //and fill the extra spaces with defaultValue

  }, {
    key: "resize",
    value: function resize(row, col) {
      var defaultValue = function (_left88, _right88) {
        if (_left88 !== null && _left88 !== undefined && _left88[Symbol.for(">")]) return _left88[Symbol.for(">")](_right88);else return _left88 > _right88;
      }(arguments.length, 2) && function (_left89, _right89) {
        if (_left89 !== null && _left89 !== undefined && _left89[Symbol.for("!==")]) return _left89[Symbol.for("!==")](_right89);else return _left89 !== _right89;
      }(arguments[2], undefined) ? arguments[2] : 0;
      var returnMatrix = new mat().Ns(row, col, defaultValue);
      var min_row = Math.min(row, this.rows);
      var min_col = Math.min(col, this.cols);

      for (var i = 0; function (_left90, _right90) {
        if (_left90 !== null && _left90 !== undefined && _left90[Symbol.for("<")]) return _left90[Symbol.for("<")](_right90);else return _left90 < _right90;
      }(i, min_row); i++) {
        for (var j = 0; function (_left91, _right91) {
          if (_left91 !== null && _left91 !== undefined && _left91[Symbol.for("<")]) return _left91[Symbol.for("<")](_right91);else return _left91 < _right91;
        }(j, min_col); j++) {
          returnMatrix.val[i][j] = this.val[i][j];
        }
      }

      return returnMatrix;
    }
  }, {
    key: "rowVector",
    value: function rowVector(row) {
      return _toConsumableArray(this.val[row]);
    }
  }, {
    key: "columnVector",
    value: function columnVector(col) {
      var ret = [];

      for (var i = 0; function (_left92, _right92) {
        if (_left92 !== null && _left92 !== undefined && _left92[Symbol.for("<")]) return _left92[Symbol.for("<")](_right92);else return _left92 < _right92;
      }(i, this.rows); i++) {
        ret.push(this.val[i][col]);
      }

      return ret;
    }
  }, {
    key: "squareSum",
    value: function squareSum() {
      var ret = 0;

      for (var i = 0; function (_left93, _right93) {
        if (_left93 !== null && _left93 !== undefined && _left93[Symbol.for("<")]) return _left93[Symbol.for("<")](_right93);else return _left93 < _right93;
      }(i, this.rows); i++) {
        for (var j = 0; function (_left94, _right94) {
          if (_left94 !== null && _left94 !== undefined && _left94[Symbol.for("<")]) return _left94[Symbol.for("<")](_right94);else return _left94 < _right94;
        }(j, this.cols); j++) {
          var val = this.val[i][j];

          ret += function (_left95, _right95) {
            if (_left95 !== null && _left95 !== undefined && _left95[Symbol.for("*")]) return _left95[Symbol.for("*")](_right95);else return _left95 * _right95;
          }(val, val);
        }
      }

      return ret;
    } //output log to console

  }, {
    key: "log",
    value: function log() {
      console.log(this);
      return this;
    } //output in console

  }]);

  return mat;
}();

exports.mat = mat;