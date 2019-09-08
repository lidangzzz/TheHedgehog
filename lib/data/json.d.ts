import { mat } from '../matrix/matrix';
declare function mat2json(A: mat): string;
declare function json2mat(json_str: string): mat;
export { json2mat, mat2json };
