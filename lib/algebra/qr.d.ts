import * as m from '../app';
declare class QRResult {
    Q: m.mat;
    R: m.mat;
    constructor(q: m.mat, r: m.mat);
}
declare function QR(x: m.mat): QRResult;
export { QR, QRResult };
