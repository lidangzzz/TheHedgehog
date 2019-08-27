class ndarray{
    val : any;
    dim: number[];
    constructor(){ this.dim = [], this.val = null; }
    init(inputArray: any): ndarray{
        //this.val[0] = inputArray;
        return this;
    }

}