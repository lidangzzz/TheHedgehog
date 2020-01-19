import { mat } from '../matrix/matrix';
import {det as mathjs_det} from 'mathjs';

function det(x:mat):number{
    return mathjs_det(x.val);
}

export {det};