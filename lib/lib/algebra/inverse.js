import { mat } from '../matrix/matrix';
import * as mathjs from 'mathjs';
function inverse(inmat) {
    if (inmat.rows != inmat.cols)
        throw new Error("A must be a suqare matrix");
    return new mat(mathjs.inv(inmat.val));
}
export { inverse };
