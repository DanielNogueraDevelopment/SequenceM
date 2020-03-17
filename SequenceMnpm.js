/*
 *  SequenceM
 *  easy and fast sequence manipulation.
 *  https://github.com/DanielNogueraDevelopment/SequenceM
 *  Copyright (c) 2020 Daniel Noguera danielnoguera.com
 *  MIT Licence
 */
function Sequence(seq, options) {
  this.seq = seq;
  this.options = options;
  try{this.data=this.options.data;}catch(e){
    //NO OPTIONS
  }
  this.type="custom";
  this.cache = [];
    if (this.options) {
      if (this.options.initial != undefined) {
        this.cache[0] = this.options.initial;
      }
      if (this.options.values != undefined) {
        this.cache = this.options.values;
      }
  if (this.options.preload && this.options.preload >= 1) {
        for (var i = this.cache.length; i <= this.options.preload.length; i++) {
          this.cache[i] = this.seq(i, this.cache[i - 1]);
        }
      } else {

      }

    }
    //Preloading

  //get n function
  this.get = function(n, s) {
    if(s == undefined){
      if(this.cache[n] != undefined){
        return this.cache[n];
      }else{
      if (this.options) {


        if (this.options.recursive) {
          //is recursive function!

          if (this.cache.length > n) {
            return this.cache[n];
          } else {
            for (var i = this.cache.length; i <= n; i++) {
              this.cache[i] = this.seq(i, this.cache[i - 1], this.cache);
            }
            var result = this.cache[n]
            if(options.cache==false){
              this.cache=[];
            }
            return result;
          }
        } else {
          var result = this.seq(n);
          if(this.options.cache != false){
            this.cache[n]=result;
          }
          return result;
        }
      } else {
        var result = this.seq(n);
        this.cache[n]=result;
        return result;
      }
    }
  }else{
    var result=[];
    for (var i = n; i <= s; i++) {
      result[i]=this.get(i);
    }
    return result;
  }
  }

  this.sum = function(a,b){
      if(a !=undefined){
        if(b != undefined){
          var returner=0;
          for (var i = a; i <= b; i++) {
            returner=returner+this.get(i)
          }
          return returner;
        }else{
          var returner=0;
          for (var i = 0; i <= a; i++) {
            returner=returner+this.get(i)
          }
          return returner;
        }
      }else{
        var returner=0;
        if(this.cache.length==0){
          throw "You require arguments for the sum function if no values are cached yet!";
        }
        var pl=this.cache.length;
        for (var i = 0; i < pl; i++) {
          returner=returner+this.get(i);
        }
        return returner;
      }
  }
this.set = function(index, value){
  this.cache[index]=value;
}
this.load = function(a,b){
  if(a==undefined){
    throw "Arguments required!";
  }
  if(b == undefined){
    this.get(a);
  }else{
    for (var i = a; i <= b; i++) {
      this.get(i);
    }
  }
}

}


function ArithmeticSequence(base,add){
  this.type = "arithmetic";
  this.base = base;
  this.add = add;
  this.get = function(n) {
    return base + (add * n);
  }
  this.sum = function(a,b){
        //arithmetic
        if(a !=undefined){
            return (b !=undefined ? ((b-a+1)*(this.get(a)+this.get(b)))/2 : ((a+1)*(this.get(0)+this.get(a)))/2);
        }else{
          throw "Missing arguments!";
        }
    }
}

function GeometricSequence(base,multiply){
  this.type = "geometric";
  this.base = base;
  this.multiply = multiply;
  this.get = function(n){
      return this.base * Math.pow(this.multiply, n);
  }
  this.sum = function(a,b){
    if(a !=undefined){
        return (b !=undefined ? this.get(a)*((1-Math.pow(this.multiply, (b+1)-a))/(1-this.multiply)) : this.get(0)*((1-Math.pow(this.multiply, (a+1)-0))/(1-this.multiply)));
    }else{
      throw "Missing arguments!";
    }


  }
}


module.exports = {Sequence:Sequence,ArithmeticSequence:ArithmeticSequence,GeometricSequence:GeometricSequence};
