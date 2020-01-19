import { mat } from '../matrix/matrix';
import {lup as mathjs_lup} from 'mathjs';

//this is an implementation of LUP decomposition using CPU by Math.js (https://github.com/josdejong/mathjs)
//reference: https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/algebra/decomposition/lup.js

class LUResult {
    L: mat; U: mat; p: mat;
    constructor(l: mat, u: mat, p_: mat) { this.L = l; this.U = u; this.p = p_;}
}

function LU(m_: mat): LUResult {
    var result = mathjs_lup(m_.val);
    return new LUResult(new mat(result.L), new mat(result.U), new mat(result.p));
}


export { LU, LUResult };