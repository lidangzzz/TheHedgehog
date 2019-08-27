class CVector {
  constructor() {}

  set(x) {
    this.val = [...x];
    return this;
  }

  get(idx) {
    return this.val[idx];
  }

  [Symbol.for('+')](other) {
    if (function (_left, _right) {
      if (_left !== null && _left !== undefined && _left[Symbol.for("==")]) return _left[Symbol.for("==")](_right);else return _left == _right;
    }(this.val.length, other.val.length)) {
      for (var i = 0; function (_left2, _right2) {
        if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
      }(i, this.val.length); i++) this.val[i] += other.val[i];
    }

    return this;
  }

}

var v1 = new CVector().set([1, 2, 3, 4, 5]);
var v2 = new CVector().set([5, 6, 7, 8, 9]);

var v3 = function (_left3, _right3) {
  if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("+")]) return _left3[Symbol.for("+")](_right3);else return _left3 + _right3;
}(v1, v2);

console.log(v3.val);