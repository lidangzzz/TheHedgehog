import { mat } from '../matrix/matrix';
import {qr as mathjs_qr} from 'mathjs';

class QRResult{
    Q:mat;
    R:mat;
    constructor(q:mat, r:mat){
        this.Q = q;
        this.R = r;
    }
}

//solving QR decomposition from mathjs.qr
function QR(x:mat):QRResult {
    var result = mathjs_qr(x.val);
    return new QRResult(new mat(result.Q), new mat(result.R));
}

export{QR, QRResult};