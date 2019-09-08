import * as m from '../app';
import * as mathjs from 'mathjs';
var QRResult = /** @class */ (function () {
    function QRResult(q, r) {
        this.Q = q;
        this.R = r;
    }
    return QRResult;
}());
//solving QR decomposition from mathjs.qr
function QR(x) {
    var result = mathjs.qr(x.val);
    return new QRResult(new m.mat(result.Q), new m.mat(result.R));
}
export { QR, QRResult };
