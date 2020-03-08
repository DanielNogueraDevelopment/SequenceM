/*
 *  SequenceM
 *  easy and fast sequence manipulation.
 *  https://github.com/DanielNogueraDevelopment/SequenceM
 *  Copyright (c) 2020 Daniel Noguera danielnoguera.com
 *  MIT Licence
 */
function Sequence(seq, more) {
  this.seq = seq;
  this.more = more;
  this.data=this.more.data;
  this.type="custom";
  this.cache = [];
    if (this.more) {
      if (this.more.initial != undefined) {
        this.cache[0] = this.more.initial;
      }
      if (this.more.values != undefined) {
        this.cache = this.more.values;
      }
  if (this.more.preload && this.more.preload >= 1) {
        for (var i = this.cache.length; i <= this.more.preload.length; i++) {
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
      if (this.more) {


        if (this.more.recursive) {
          //is recursive function!

          if (this.cache.length > n) {
            return this.cache[n];
          } else {
            for (var i = this.cache.length; i <= n; i++) {
              this.cache[i] = this.seq(i, this.cache[i - 1], this.cache);
            }
            var result = this.cache[n]
            if(more.cache==false){
              this.cache=[];
            }
            return result;
          }
        } else {
          return this.seq(n);
        }
      } else {
        return this.seq(n);
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
          throw "You require arguments for the sum function if no values are this.cached yet!";
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

//FACTORIAL: var factorial=new Sequence(function(a,b){return a*b}, {recursive:true, initial:1})
//FIBONACCI: var f = new Sequence(function(a,b,c){return c[a-2]+b}, {values:[0,1], recursive:true})
//Lazy Caterer's sequence var c=new Sequence(function(a){return (Math.pow(a,2)+a+2)/2})
//Natural Numbers (including zero) var n=new Sequence(0,1)
//Natural Numbers (excluding zero) var n=new Sequence(1,1)
//Arithmetic Hypersequence function ahs(f,s) {return new Sequence(function(a){return new Sequence(function(b){return a+b}).get(s)}).get(f)}
//Multiplicative Hypersequence function ahs(f,s) {return new Sequence(function(a){return new Sequence(function(b){return a*b}).get(s)}).get(f)}
//Subtraction Hypersequence function ahs(f,s) {return new Sequence(function(a){return new Sequence(function(b){return a-b}).get(s)}).get(f)}
//Division Hypersequence function ahs(f,s) {return new Sequence(function(a){return new Sequence(function(b){return a/b}).get(s)}).get(f)}
//function tetrate(f,s) {return Math.pow(f, new Sequence(function(a,b){return Math.pow(b, f)},{recursive:true, initial:f}).get(s-2))}
//
//
//
//
//
//
//
// var p=new Sequence(function(a){
//   var num=1; count=0; i;
//   while (count < a) {
//     num=num+1;
//     for (var i = 2; i <= num; i++) {
//       if(num % i==0){
//         break;
//       }
//     }
//     if(i == num){
//       count=count+1
//     }
//   }
//   return num;
// })
