import { mat } from "../matrix/matrix";
import * as mathjs from 'mathjs';
//this is an implementation of LUP decomposition using CPU by Math.js (https://github.com/josdejong/mathjs)
//reference: https://github.com/josdejong/mathjs/blob/d8a4f3a00a5e61383ac72ea5509ff69cdcbdf6be/src/function/algebra/decomposition/lup.js
var LUResult = /** @class */ (function () {
    function LUResult(l, u, p_) {
        this.L = l;
        this.U = u;
        this.p = p_;
    }
    return LUResult;
}());
function LU(m_) {
    var result = mathjs.lup(m_.val);
    return new LUResult(new mat(result.L), new mat(result.U), new mat(result.p));
}
export { LU, LUResult };
