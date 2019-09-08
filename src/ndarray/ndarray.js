var ndarray = /** @class */ (function () {
    function ndarray() {
        this.dim = [], this.val = null;
    }
    ndarray.prototype.init = function (inputArray) {
        //this.val[0] = inputArray;
        return this;
    };
    return ndarray;
}());
