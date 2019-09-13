"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KMeans = void 0;

function _classCallCheck(instance, Constructor) { if (!function (_left22, _right22) { if (_left22 !== null && _left22 !== undefined && _left22[Symbol.for("instanceof")]) return _left22[Symbol.for("instanceof")](_right22);else return _left22 instanceof _right22; }(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; function (_left20, _right20) { if (_left20 !== null && _left20 !== undefined && _left20[Symbol.for("<")]) return _left20[Symbol.for("<")](_right20);else return _left20 < _right20; }(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (function (_left21, _right21) { if (_left21 !== null && _left21 !== undefined && _left21[Symbol.for("in")]) return _left21[Symbol.for("in")](_right21);else return _left21 in _right21; }("value", descriptor)) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//KMeans is the implementation of K-Means algorithm
var KMeans =
/*#__PURE__*/
function () {
  //number of clusters
  //maximum iterations
  //tolerance
  //list of cluster centroids 
  //indexOfCentroid[i] is the centroid index of x[i]
  //distance[i] is the distance of  ||  x[i] - centroids of cluster of x[i] ||
  function KMeans() {
    _classCallCheck(this, KMeans);

    this.n_clusters = 8;
    this.max_iter = 300;
    this.tolerance = 0.0001;
  } //training 
  //input matrix: x_: M by N matrix
  //each row is a vector of N-dimension sample
  //and there are M samples in total


  _createClass(KMeans, [{
    key: "fit",
    value: function fit(x_) {
      //copy data into this.x
      this.x = x_.clone();
      var N = this.x.rows; //initialize N centroids 

      this.initializeNCentroids(); //start iteration

      var iter = 0;
      this.distanceToCentroid = Array(N).fill(0);
      this.indexOfCluster = Array(N).fill(0);
      var if_cluster_is_changed = true; //for each iteration

      while (function (_left, _right) {
        if (_left !== null && _left !== undefined && _left[Symbol.for("<")]) return _left[Symbol.for("<")](_right);else return _left < _right;
      }(iter, this.max_iter) && if_cluster_is_changed) {
        iter++; //for each sample data

        for (var i = 0; function (_left2, _right2) {
          if (_left2 !== null && _left2 !== undefined && _left2[Symbol.for("<")]) return _left2[Symbol.for("<")](_right2);else return _left2 < _right2;
        }(i, N); i++) {
          var minDistance = L2(this.x.val[i], this.centroids[0]);
          var minCentroidIndex = 0; //find the nearest centroid

          for (var centroidIndex = 1; function (_left3, _right3) {
            if (_left3 !== null && _left3 !== undefined && _left3[Symbol.for("<")]) return _left3[Symbol.for("<")](_right3);else return _left3 < _right3;
          }(centroidIndex, this.n_clusters); centroidIndex++) {
            var currentDistance = L2(this.x.val[i], this.centroids[centroidIndex]);

            if (function (_left4, _right4) {
              if (_left4 !== null && _left4 !== undefined && _left4[Symbol.for("<")]) return _left4[Symbol.for("<")](_right4);else return _left4 < _right4;
            }(currentDistance, minDistance)) {
              minDistance = currentDistance;
              minCentroidIndex = centroidIndex;
            }
          } //update the cluster information of data i


          if (function (_left5, _right5) {
            if (_left5 !== null && _left5 !== undefined && _left5[Symbol.for(">=")]) return _left5[Symbol.for(">=")](_right5);else return _left5 >= _right5;
          }(Math.abs(function (_left6, _right6) {
            if (_left6 !== null && _left6 !== undefined && _left6[Symbol.for("-")]) return _left6[Symbol.for("-")](_right6);else return _left6 - _right6;
          }(this.indexOfCluster[i], minCentroidIndex)), this.tolerance)) {
            if_cluster_is_changed = true;
            this.indexOfCluster[i] = minCentroidIndex;
            this.distanceToCentroid[i] = currentDistance;
          }
        } //updateh all centroids of each cluster


        for (var i = 0; function (_left7, _right7) {
          if (_left7 !== null && _left7 !== undefined && _left7[Symbol.for("<")]) return _left7[Symbol.for("<")](_right7);else return _left7 < _right7;
        }(i, this.n_clusters); i++) {
          //initialize a vector of X.cols zeros
          var mean_value = Array(this.x.cols).fill(0);
          var counterOfDataInCurrentCluster = 0;

          for (var indexofX = 0; function (_left8, _right8) {
            if (_left8 !== null && _left8 !== undefined && _left8[Symbol.for("<")]) return _left8[Symbol.for("<")](_right8);else return _left8 < _right8;
          }(indexofX, this.x.rows); indexofX++) {
            if (function (_left9, _right9) {
              if (_left9 !== null && _left9 !== undefined && _left9[Symbol.for("==")]) return _left9[Symbol.for("==")](_right9);else return _left9 == _right9;
            }(this.indexOfCluster[indexofX], i)) {
              mean_value = add(mean_value, this.x.val[indexofX]);
              counterOfDataInCurrentCluster++;
            }
          }

          this.centroids[i] = div(mean_value, counterOfDataInCurrentCluster);
        }
      }
    } //initialize N centroids by randomly picking N samples

  }, {
    key: "initializeNCentroids",
    value: function initializeNCentroids() {
      var n_indices = [];
      this.centroids = []; //pick up n random number

      for (var i = 0; function (_left10, _right10) {
        if (_left10 !== null && _left10 !== undefined && _left10[Symbol.for("<")]) return _left10[Symbol.for("<")](_right10);else return _left10 < _right10;
      }(i, this.n_clusters); i++) {
        //pick a number from 0 to x.rows
        n_indices.push(Math.floor(function (_left11, _right11) {
          if (_left11 !== null && _left11 !== undefined && _left11[Symbol.for("*")]) return _left11[Symbol.for("*")](_right11);else return _left11 * _right11;
        }(Math.random(), this.x.rows))); //push this data into the centroids vector

        this.centroids.push(this.x.val[n_indices[i]]);
      }

      console.log(this.centroids);
    } //get labels of sample data

  }, {
    key: "labels",
    value: function labels() {
      return this.indexOfCluster;
    } //todo: predict

  }, {
    key: "predict",
    value: function predict(x_) {//TODO
    }
  }]);

  return KMeans;
}(); //Euclidean distance (L2 norm)


exports.KMeans = KMeans;

function L2(x, y) {
  var sum = 0;

  for (var i = 0; function (_left12, _right12) {
    if (_left12 !== null && _left12 !== undefined && _left12[Symbol.for("<")]) return _left12[Symbol.for("<")](_right12);else return _left12 < _right12;
  }(i, x.length); i++) {
    sum += function (_left13, _right13) {
      if (_left13 !== null && _left13 !== undefined && _left13[Symbol.for("*")]) return _left13[Symbol.for("*")](_right13);else return _left13 * _right13;
    }(function (_left14, _right14) {
      if (_left14 !== null && _left14 !== undefined && _left14[Symbol.for("-")]) return _left14[Symbol.for("-")](_right14);else return _left14 - _right14;
    }(x[i], y[i]), function (_left15, _right15) {
      if (_left15 !== null && _left15 !== undefined && _left15[Symbol.for("-")]) return _left15[Symbol.for("-")](_right15);else return _left15 - _right15;
    }(x[i], y[i]));
  }

  return Math.sqrt(sum);
}

function add(x, y) {
  var z = Array(x.length).fill(0);

  for (var i = 0; function (_left16, _right16) {
    if (_left16 !== null && _left16 !== undefined && _left16[Symbol.for("<")]) return _left16[Symbol.for("<")](_right16);else return _left16 < _right16;
  }(i, x.length); i++) {
    z[i] = function (_left17, _right17) {
      if (_left17 !== null && _left17 !== undefined && _left17[Symbol.for("+")]) return _left17[Symbol.for("+")](_right17);else return _left17 + _right17;
    }(x[i], y[i]);
  }

  return z;
}

function div(x, s) {
  var z = Array(x.length).fill(0);

  for (var i = 0; function (_left18, _right18) {
    if (_left18 !== null && _left18 !== undefined && _left18[Symbol.for("<")]) return _left18[Symbol.for("<")](_right18);else return _left18 < _right18;
  }(i, z.length); i++) {
    z[i] = function (_left19, _right19) {
      if (_left19 !== null && _left19 !== undefined && _left19[Symbol.for("/")]) return _left19[Symbol.for("/")](_right19);else return _left19 / _right19;
    }(x[i], s);
  }

  return z;
}