class CVector{
  val: number[];
  constructor(){

  }

  set(x:number[]): CVector {
    this.val = [...x];
    return this;
  }

  get(idx: number): number{
    return this.val[idx];
  }

  [Symbol.for('+')] (other: CVector): CVector {
    if (this.val.length == other.val.length) {
      for (var i=0;i<this.val.length;i++) this.val[i] += other.val[i];
    }

    return this;
  }
}



var v1 = new CVector().set([1,2,3,4,5]);
var v2 = new CVector().set([5,6,7,8,9]);

var v3 = v1+v2;
console.log(v3.val);

