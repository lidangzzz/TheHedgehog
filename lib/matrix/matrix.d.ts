declare class mat {
    val: number[][];
    rows: number;
    cols: number;
    GPU: boolean;
    clear(): this;
    constructor(input?: number[][] | number[] | number);
    dimensions(): number[];
    isVector(): boolean;
    init(input2DArray: any): mat;
    private dimCheck;
    initVec(input1DArray: any): mat;
    range(arg1: number, arg2?: any, step?: number): mat;
    clone(): mat;
    copy(inputMat: mat): mat;
    equals(inMat: mat, EPSILON?: number): boolean;
    Ns(row: number, col: number, N: number): mat;
    zeros(row: number, col: number): mat;
    ones(row: number, col: number): mat;
    diag(input1DArray: number[]): mat;
    identity(N: number): mat;
    random(row: number, col: number): mat;
    T(): mat;
    transpose(): mat;
    each(func: Function): mat;
    max(): number;
    min(): number;
    sum(): number;
    mean(): number;
    median(): number;
    adds(val: number): mat;
    muls(val: number): mat;
    minuss(val: number): mat;
    divs(val: number): mat;
    add(rightMat: mat): mat;
    minus(rightMat: mat): mat;
    mul(rightMat: mat): mat;
    mul_gpu(rightMat: mat): mat;
    set(row: number, col: number, val: number): mat;
    get(row: number, col: number): number;
    at(row: number, col: number): number;
    row(rowIndex: number): mat;
    col(colIndex: number): mat;
    to2DArray(): number[][];
    toArray(): number[];
    reshape(row: number, col: number): mat;
    subMatrix(rowStart: number, rowEnd: number, colStart: number, colEnd: number): mat;
    getRows(rowStart: number, rowEnd: number): mat;
    getCols(colStart: number, colEnd: number): mat;
    resize(row: number, col: number, defaultValue?: number): mat;
    rowVector(row: number): number[];
    columnVector(col: number): number[];
    squareSum(): number;
    toString(): string;
    log(): mat;
}
export { mat };