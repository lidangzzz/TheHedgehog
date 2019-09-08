import * as m from '../app';
declare class LogisticRegression {
    alpha: number;
    max_iteration: number;
    x: m.mat;
    y: m.mat;
    init_weights: m.mat;
    weight: m.mat;
    constructor();
    fit(x_: m.mat, y: m.mat): void;
    solver(): void;
    predict(x_: m.mat): m.mat;
}
export { LogisticRegression };
