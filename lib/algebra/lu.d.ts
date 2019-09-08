import { mat } from "../matrix/matrix";
declare class LUResult {
    L: mat;
    U: mat;
    p: mat;
    constructor(l: mat, u: mat, p_: mat);
}
declare function LU(m_: mat): LUResult;
export { LU, LUResult };
