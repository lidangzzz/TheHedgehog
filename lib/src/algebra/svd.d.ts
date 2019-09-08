import { mat } from '../matrix/matrix';
declare class SVDresult {
    q: mat;
    U: mat;
    V: mat;
    constructor(q_: mat, U_: mat, V_: mat);
}
declare function SVD(A: mat): SVDresult;
export { SVD, SVDresult };
