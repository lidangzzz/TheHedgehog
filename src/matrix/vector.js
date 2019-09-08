//mean of vector x
function mean(x) {
    var sum = 0;
    x.forEach(function (value) { sum += value; });
    return sum / (x.length);
}
//standard deviation of vector x
function std(x) {
    var ret = 0;
    var meanOfX = mean(x);
    x.forEach(function (value) { ret += (meanOfX - value) * (meanOfX - value); });
    ret = Math.sqrt(ret / (x.length - 1));
    return ret;
}
function zScore(x) {
    var meanX = mean(x);
    var stdX = std(x);
    var ret = [];
    x.forEach(function (eachX) { ret.push((eachX - meanX) / stdX); });
    return ret;
}
export { mean, std, zScore };
