import { mat } from '../matrix/matrix';
function mat2json(A) {
    return JSON.stringify(A);
}
function json2mat(json_str) {
    var A = new mat();
    var obj = JSON.parse(json_str);
    A.init(obj.val);
    if (A.rows == obj.rows && A.cols == obj.cols) {
        return A;
    }
    throw new Error("Fail to read matrix from json");
}
export { json2mat, mat2json };
