import * as m from '../app';
import { xT_mul_x } from '../matrix/operator';

//KMeans is the implementation of K-Means algorithm
export class KMeans
{
    //number of clusters
    n_clusters: number;

    //maximum iterations
    max_iter:number;

    //tolerance
    tolerance:number;

    //list of cluster centroids 
    centroids: number[][];

    //indexOfCentroid[i] is the centroid index of x[i]
    indexOfCluster: number[];
    
    //distance[i] is the distance of  ||  x[i] - centroids of cluster of x[i] ||
    distanceToCentroid:number[];

    x: m.mat;

    constructor(){ 
        this.n_clusters = 8;
        this.max_iter = 300;
        this.tolerance = 0.0001;
    }

    //training 
    //input matrix: x_: M by N matrix
    //each row is a vector of N-dimension sample
    //and there are M samples in total
    fit(x_:m.mat){

        //copy data into this.x
        this.x = x_.clone(); var N = this.x.rows; 

        //initialize N centroids 
        this.initializeNCentroids();


        //start iteration
        var iter = 0;
        this.distanceToCentroid = Array(N).fill(0);
        this.indexOfCluster = Array(N).fill(0);

        var if_cluster_is_changed = true;
        //for each iteration
        while (iter < this.max_iter && if_cluster_is_changed){
            iter++;

            //for each sample data
            for (var i=0;i<N;i++){
                var minDistance = L2(this.x.val[i], this.centroids[0]);
                var minCentroidIndex = 0;

                //find the nearest centroid
                for(var centroidIndex = 1; centroidIndex < this.n_clusters; centroidIndex++){
                    var currentDistance = L2(this.x.val[i], this.centroids[centroidIndex]);
                    if (currentDistance < minDistance){
                        minDistance = currentDistance;
                        minCentroidIndex = centroidIndex;
                    }
                }

                //update the cluster information of data i
                if (Math.abs(this.indexOfCluster[i] - minCentroidIndex) >= this.tolerance)
                {
                    if_cluster_is_changed = true;
                    this.indexOfCluster[i] = minCentroidIndex;
                    this.distanceToCentroid[i] = currentDistance;
                }

            }

            //updateh all centroids of each cluster
            for (var i =0;i< this.n_clusters;i++){

                //initialize a vector of X.cols zeros
                var mean_value = Array(this.x.cols).fill(0);
                var counterOfDataInCurrentCluster =0;
                for (var indexofX =0;indexofX < this.x.rows;indexofX++){
                    if (this.indexOfCluster[indexofX] == i) {
                        mean_value = add(mean_value, this.x.val[indexofX] );
                        counterOfDataInCurrentCluster++;
                    }
                }

                this.centroids[i] = div(mean_value, counterOfDataInCurrentCluster);
            }

        }

    }

    //initialize N centroids by randomly picking N samples
    initializeNCentroids(){
        var n_indices = [];
        this.centroids = [];
        //pick up n random number
        for (var i=0;i<this.n_clusters;i++)
        {
            //pick a number from 0 to x.rows
            n_indices.push( Math.floor(Math.random() * this.x.rows) );
            
            //push this data into the centroids vector
            this.centroids.push(this.x.val[n_indices[i]]);
        }

        console.log(this.centroids);
    }

    //get labels of sample data
    labels(): number[]{ return this.indexOfCluster; }

    //todo: predict
    predict(x_: m.mat){
        //TODO
    }
    
}

//Euclidean distance (L2 norm)
function L2(x: number[], y:number[]): number{
    var sum = 0;
    for (var i=0;i<x.length;i++) {sum+= (x[i]-y[i])*(x[i]-y[i]);}
    return Math.sqrt(sum);
}

function add(x:number[], y:number[]):number[]{
    var z = Array(x.length).fill(0);
    for (var i=0;i<x.length;i++) z[i] = x[i] + y[i];
    return z;
}

function div(x:number[], s:number):number[]{
    var z = Array(x.length).fill(0);
    for(var i=0;i<z.length;i++) z[i] = x[i] /s;
    return z; 
}