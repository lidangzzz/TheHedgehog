import * as m from '../app';
import * as mathjs from 'mathjs';
class QRResult {
    constructor(q, r) {
        this.Q = q;
        this.R = r;
    }
}
//solving QR decomposition from mathjs.qr
function QR(x) {
    var result = mathjs.qr(x.val);
    return new QRResult(new m.mat(result.Q), new m.mat(result.R));
}
export { QR, QRResult };
