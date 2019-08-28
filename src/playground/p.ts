

import * as m from '../app'; 
import { log } from 'util';
import { LogisticRegression } from '../ml/logisticRegression';

var mat_str = `
    15    20     0
    20    30     1
    30    20     1
    25    25     0
    26     8     0
    36     8     0
    22    35     1
    24    30     1
    10    15     0
     8    60     1
    33    35     1
    18    18     0
    33    17     1
`;

var mat = m.read(mat_str);

var a = new m.mat([[1,2,3],[3,4,4], [7,8,9]]);

console.log(a*[1,2,3]);
console.log( a + a );

while(1){}

var x = mat.getCols(0, 2);
var y = mat.getCols(2, 3);

var lr = new LogisticRegression();
lr.fit(x, y);

while (1) { }