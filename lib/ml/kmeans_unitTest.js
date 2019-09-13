"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kmeansUnitTest = kmeansUnitTest;

var m = _interopRequireWildcard(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (function (_left, _right) { if (_left !== null && _left !== undefined && _left[Symbol.for("!=")]) return _left[Symbol.for("!=")](_right);else return _left != _right; }(obj, null)) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var assert = require('assert');

var dataset = m.read("\n1.658985\t4.285136\n-3.453687\t3.424321\n4.838138\t-1.151539\n-5.379713\t-3.362104\n0.972564\t2.924086\n-3.567919\t1.531611\n0.450614\t-3.302219\n-3.487105\t-1.724432\n2.668759\t1.594842\n-3.156485\t3.191137\n3.165506\t-3.999838\n-2.786837\t-3.099354\n4.208187\t2.984927\n-2.123337\t2.943366\n0.704199\t-0.479481\n-0.392370\t-3.963704\n2.831667\t1.574018\n-0.790153\t3.343144\n2.943496\t-3.357075\n-3.195883\t-2.283926\n2.336445\t2.875106\n-1.786345\t2.554248\n2.190101\t-1.906020\n-3.403367\t-2.778288\n1.778124\t3.880832\n-1.688346\t2.230267\n2.592976\t-2.054368\n-4.007257\t-3.207066\n2.257734\t3.387564\n-2.679011\t0.785119\n0.939512\t-4.023563\n-3.674424\t-2.261084\n2.046259\t2.735279\n-3.189470\t1.780269\n4.372646\t-0.822248\n-2.579316\t-3.497576\n1.889034\t5.190400\n-0.798747\t2.185588\n2.836520\t-2.658556\n-3.837877\t-3.253815\n2.096701\t3.886007\n-2.709034\t2.923887\n3.367037\t-3.184789\n-2.121479\t-4.232586\n2.329546\t3.179764\n-3.284816\t3.273099\n3.091414\t-3.815232\n-3.762093\t-2.432191\n3.542056\t2.778832\n-1.736822\t4.241041\n2.127073\t-2.983680\n-4.323818\t-3.938116\n3.792121\t5.135768\n-4.786473\t3.358547\n2.624081\t-3.260715\n-4.009299\t-2.978115\n2.493525\t1.963710\n-2.513661\t2.642162\n1.864375\t-3.176309\n-3.171184\t-3.572452\n2.894220\t2.489128\n-2.562539\t2.884438\n3.491078\t-3.947487\n-2.565729\t-2.012114\n3.332948\t3.983102\n-1.616805\t3.573188\n2.280615\t-2.559444\n-2.651229\t-3.103198\n2.321395\t3.154987\n-1.685703\t2.939697\n3.031012\t-3.620252\n-4.599622\t-2.185829\n4.196223\t1.126677\n-2.133863\t3.093686\n4.668892\t-2.562705\n-2.793241\t-2.149706\n2.884105\t3.043438\n-2.967647\t2.848696\n4.479332\t-1.764772\n-4.905566\t-2.911070\n");

function kmeansUnitTest() {
  var kmeans = new m.KMeans(); //setup the number of clusters

  kmeans.n_clusters = 4;
  kmeans.fit(dataset);
  console.log(kmeans.labels());
}

kmeansUnitTest();