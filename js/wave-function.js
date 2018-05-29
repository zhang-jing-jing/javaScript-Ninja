// 匿名函数

window.onload = function () {
    console.log('power1');
}

var ninjia = {
    shout: function () {
        console.log('Niajia');
    }
}

ninjia.shout();

// 定时器
setTimeout(function () {
    console.log('Forever!')
},1500)

// 递归
// 4.2.1普通命名函数中的递归

function isPalindrome(text) {
    if (text.length <= 1) return true;
    if (text.charAt(0) != text.charAt(text.length - 1)) return false;
    return isPalindrome(text.substr(1,text.length-2));
}

// 使用命名函数发出“啾啾”声
function chirp(n) {
    return n>1 ? chirp(n-1) + "-chirp": "chirp";
} 

console.log('function chirp()==>:' + chirp(3));

// 4.2.2 方法中的递归

var ninja = {
    chirp : function (n) {
        return n > 1 ? this.chirp(n - 1) + "-chirp" : "chirp";
    } 
}

console.log("ninja.chirp()==>:"+ ninja.chirp(3))

// 4.2.3 引用的丢失问题

var samurai = { chirp: ninja.chirp };
ninja = {};

try {
    if (samurai.chirp(3) == 'chirp-chirp-chirp') {
         console.log("is this going to work!");
    }
}
catch(e){
    console.log("uh,this isn't good!")
}

// 4.2.4 内联命名函数

// 使用内联函数进行递归的新方式

var ninja1 = function myNinja(){
    if (ninja1 == myNinja) {
        console.log('this function is named two things at once.');
    }
}

ninja1();

if ( typeof myNinja == 'undefined') {
    console.log("but myNinja isn't defined outside of the function.")
}

// callee属性{不推荐使用，因为新版的js上这个属性会被去除}

var ninja2 = {
    chirp : function (n) {
        return n > 1 ? arguments.callee(n - 1) + "-chirp" : "chirp";
    } 
}

if (ninja2,chirp(3)=='chirp-chirp-chirp') {
    console.log("arguments.callee is the function itself!")
}

// 4.3 将函数视为对象
// 4.3.1 函数存储

// e.g. 存储一组独立的函数

var store = {
    nextId:1,
    cache:{},
    add:function(fn){
        if (!fn.id) {
            fn.id = store.nextId++;
            return !!(store.cache[fn.id] = fn);
        }
    }
}

function ninja3(){}

if (store.add(ninja3)) {
    console.log("function was safely added." + store.nextId);
}
if (!store.add(ninja3)) {
    console.log('but it was only added once.' + store.nextId)
}

// 4.3.2 自记忆函数

// 记忆之前计算出的值

function isPrime(value){
    if (!isPrime.anwers) isPrime.anwers = {};
    if (isPrime.anwers[value] != null) {
        return isPrime.anwers[value];
    }
    var prime = value != 1;
    for(var i=2 ; i<value; i++){
        if (value%i == 0) {
            prime = false;
            break;
        }
    }
    return isPrime.anwers[value] = prime;
}
 console.log(isPrime(5));
 console.log(isPrime.anwers[5]);
 console.log(isPrime.anwers[6]);

 // 缓存记忆DOm元素

 function getElements(name){
    if (!getElements.cache) getElements.cache = {};
    return getElements.cache[name] = 
    getElements.cache[name] ||
    document.getElementsByTagName(name);
 }

 // 4.3.3 伪造数组的方法
 // 模拟类似数组的方法
 var elems = {
    length:0,
    add:function(elem){
        Array.prototype.push.call(this,elem);
    },
    gather:function(id){
        this.add(document.getElementById(id));
    },
 }

 elems.gather("first");

 if (elems.length == 1) {
    console.log('verify that we have an element in our stash');
 };

 elems.gather("second");
 if (elems.length == 2) {
    console.log('verify the other insertion');
 };

 // 4.4 可变长度的参数列表
 // 4.4.1 使用apply()支持可变参数 
 // 数组上通用的min() 和 max()函数

function smallest(array){
    return Math.min.apply(Math,array);
}
function largest(array){
    return Math.max.apply(Math,array);
}

if (smallest([0,1,2,3,4]) == 0) {
    console.log("Located the smallest value.")
}

if (largest([0,1,2,3,4,5]) == 5) {
    console.log("Located the largest value.")
}

// 4.4.2 函数重载

// 遍历可变长度的参数列表

function merge(root){
    for (var i = 1; i < arguments.length; i++) {
        for(var key in arguments[i]){
             root[key] = arguments[i][key];
        }
        return root;
        }
}

var merged = merge(
    {name:"Batou"},
    {city:"Niihama"});

if (merged.name == "Batou") {
    console.log("The original name is intact.");
}
if (merged.city == "Niihama") {
    console.log("and the city has been copied over.");
}

 
// 对arguments列表进行切片
/*
    arguments参数引用的不是真正的数组。
    尽管他看起来很像，但是他缺乏基本数组应该有的所有方法，例如slice()
*/
function multiMax1(multi){
    return multi * Math.max.apply(Math,
        Array.prototype.slice.call(arguments,1));//强制将argument参数视为数组
}
if (multiMax1(3,1,2,3) == 9) {
    console.log("3*3=9");
}
// function multiMax(multi){
//     return multi * Math.max.apply(Math,arguments.slice(1));
// }

// if (multiMax(3,1,2,3) == 9) {
//     console.log("3*3=9");
// }

/* 基于传入的参数，有很多种方法可以判断并进行函数重载。
一种通用的方法是，根据传入参数的类型执行不同的操作。
另一种方法是，可以通过某些特定参数是否存在来进行判断。
还有一种方法是通过传入参数的个数进行判断。*/
// 通过传入参数的个数来执行不同的操作

var ninja4 = {
    whatever:function(){
        switch(arguments.length){
            case 0:
                /*do something*/
                break;
            case 1:
                /*do something*/
                break;
            case 2:
                /*do something*/
                break;
            // and so on
        }
    }
}
// 重载函数的方法

var ninja5 = {};
addMethod(ninja5,'whatever',function(){ /*do something*/});
addMethod(ninja5,'whatever',function(a){ /*do something*/});
addMethod(ninja5,'whatever',function(a,b){ /*do something*/});

function addMethod(object,name,fn){
    var old = object[name];
    object[name] = function(){
        if (fn.length == arguments.length) 
            return fn.apply(this,arguments)
        else if (typeof old == 'function') 
            return old.apply(this,arguments);
    }
}

// 测试addMethod()函数

var ninjas = {
    values:["Dean Edwwards","San Stephenson","Alex Russell"]
};
addMethod(ninjas,"find",function(){
    return this.values;
})
addMethod(ninjas,"find",function(name){
    var ret = [];
    for (var i = 0; i < this.values.length; i++) {
        if(this.values[i].indexOf(name) == 0)
            ret.push(this.values[i]) };
        return ret;
})
addMethod(ninjas,"find",function(first,last){
    var ret=[];
    for (var i = 0; i < this.values.length; i++) {
          if(this.values[i] == (first + " " + last))
            ret.push(this.values[i]) };
        return ret;
}) 
if (ninjas.find().length==3) {
    console.log("found all niajas");
}
if (ninjas.find('San').length==1) {
    console.log("found niaja by first name.");
}
if (ninjas.find('Dean','Edwwards').length == 1) {
    console.log("found niaja by first and last name.");
}
if (ninjas.find('Alex','Russell','Jr') == null) {
    console.log("found nothing.");
}

// 函数判断
/*使用 typeof 可以实现函数判断但是有跨浏览器的问题
  将函数转换为一个字符串，根据其序列化值判断其类型
*/
function isFunction(fn){
    return Object.prototype.toString.call(fn) == "[object Function]"
}
console.log("hello"+isFunction(ninja4.whatever));