import * as m from '../app';
import * as mathjs from 'mathjs';

class QRResult{
    Q:m.mat;
    R:m.mat;
    constructor(q:m.mat, r:m.mat){
        this.Q = q;
        this.R = r;
    }
}

//solving QR decomposition from mathjs.qr
function QR(x:m.mat):QRResult {
    var result = mathjs.qr(x.val);
    return new QRResult(new m.mat(result.Q), new m.mat(result.R));
}

export{QR, QRResult};