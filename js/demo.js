    // 函数的上下文以及函数的name

    function isNimble() {
        return true;
    }
    // console.log('isNimble() type:  '+typeof window.isNimble);
    // console.log('isNimble() name:  '+isNimble.name);
    // console.assert(typeof window.isNimble !== "function",
    // "isNimble() defined"
    // );
    // console.assert(isNimble.name !== "isNimble",
    //     "isNimble() has a number!"
    // );
    var canFLy = function(){ return true; }
    // console.log('canFLy() type:   '+ typeof window.canFLy);
    // console.log('canFLy() name:   ' + canFLy.name);
    // console.assert(typeof window.canFLy !== "function",
    //     "canFLy() defined"
    // );
    // console.assert(canFLy.name === " ",
    //     "canFLy().name not empty!"
    // );

    // 函数的作用域
    function outer() {
        var a = 1;

        console.log(a);
        console.log(b);
        console.log(c);
        inner(); 

        function inner(){
            console.log('这是inner方法');
        }  

        console.log(a);
        console.log(b);
        console.log(c);
        inner(); 

        var b = 2;

        console.log(a);
        console.log(b);
        console.log(c);
        inner(); 

        if (a===1) {
            var c = 3;
        }

        console.log(a);
        console.log(b); 
        console.log(c);
        inner(); 
    }
     outer();
    
    // “作为方法” 和 “作为函数” 调用的区别
    
    function creep(){
        return this;
    }
    console.log( creep() === window );
    var sneek = creep;
    console.log( sneek() === window );
    var najia = {
        sneek: creep
    }
    // 这就是面向对象
    console.log(najia.sneek() === najia );
    
    // 作为构造器进行调用
    new creep();
    function Niajia(){
        this.skulk = function () {
            return this;
        }
    }
    
    var niajia1 = new Niajia();
    var niajia2 = new Niajia();

    console.log(niajia1.skulk() === niajia1 );
    console.log(niajia2.skulk() === niajia2 );

    // 使用apply() 和 call() 方法进行调用
    function jungle(){
        var result = 0;
        for (let n = 0; n < arguments.length; n++) {
            result += arguments[n];
        }
        this.result = result;
    }
    
    var ninjia1 = {};
    var ninjia2 = {};

    jungle.apply(ninjia1, [1,2,3.4,5,6]);
    jungle.call(ninjia2, 1, 2, 3.4);
    console.log(ninjia1.result);
    console.log(ninjia2.result);