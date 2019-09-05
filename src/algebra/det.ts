import * as m from '../app';
import * as mathjs from 'mathjs';

function det(x:m.mat):number{
    return mathjs.det(x.val);
}

export {det};