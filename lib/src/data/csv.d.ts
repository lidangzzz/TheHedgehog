import { mat } from '../matrix/matrix';
declare function mat2csv(A: mat): string;
declare function mat2csvWithNewLines(A: mat): string;
declare function csv2mat(strCSV: string): mat;
export { mat2csv, csv2mat, mat2csvWithNewLines };
