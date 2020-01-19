import { mat } from '../matrix/matrix';
import {inv as mathjs_inv} from 'mathjs';



function inverse(inmat: mat):mat {
    if (inmat.rows != inmat.cols) throw new Error("A must be a suqare matrix");
    return new mat(mathjs_inv(inmat.val));
}

export { inverse };