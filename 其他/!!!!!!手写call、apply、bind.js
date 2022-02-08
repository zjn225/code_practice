Function.prototype.myApply = function (context = window, args = []) {
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    // ！！！用context里的一个属性保存一下调用者的this, 到时候直接执行context[key]取结果，就能达到执行调用者的同时， this是指向context的

    // context是传入的值，比如foo，是个对象，不能执行
    // this是调用者，是bar，可以执行
    // 为什么不直接context(...args)，对象不可能执行，只可能被绑定
    // 为什么不直接this(...args)，因为this就是指向调用者，直接return这玩意的话，到时候执行的时候this就指向执行者的bar了，但是实际上要指向的是context，也就是传入的foo，所以必须由context去执行
    // 为什么this要指向context？这样执行bar的时候，this取值的时候

    context[key] = this  // foo[key] = bar，也就是将调用者的构造函数绑定在传入的作用域/对象里的某个key里
    const result = context[key](...args) // 比如foo[key](...args), 也就是以传入作用域的前缀，去执行这个构造函数，这样就达到了改变this指向的作用了
    delete context[key]
    return result
}

var value = 2000;
var foo = {
    value: 1
};
function bar(name, age) {
    console.log("this.value", this.value);
    console.log("name", name);
    console.log("age", age);
}
bar.myApply(foo, ['zjn', 22])  // 1 zjn 22

// 唯一区别在于传参
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
    // ... 
}

Function.prototype.bind = function (objThis, ...params) {
    const thisFn = this; // //保存this值，指的调用bind的函数的this值
    // 比如bar，是肯定要执行的，到时候通过call去改变this指向
    // 因为bind是返回一个函数的，而不是像call、apply那种直接执行的，所以这里返回一个函数
    let fToBind = function (...secondParams) {
        // this（这个this是内部的this了）是否是fToBind的实例 也就是返回的fToBind是否通过new调用，所以可通过instanceof来判断， bindFn2.__proto__ = bindFn
        const isFromNew = this instanceof fToBind;
        const context = isFromNew ? this : Object(objThis) // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    };
    if (thisFn.prototype) {
        // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
        fToBind.prototype = Object.create(thisFn.prototype);
    }
    return fToBind;
};

var value = 2000;
var foo = {
    value: 1
};
function bar(name, age) {
    console.log("this.value", this.value);
    console.log("name", name);
    console.log("age", age);
}

var bindFn = bar.bind(foo, "zjn");

// 使用方法一：直接调用, this指向传入的foo
bindFn(21)
// 1  zjn  21

// 使用方法二：new调用，this指向实例出来的bindFn2
var bindFn2 = new bindFn("21");

function sup() {
    console.log(this)
}
sup()  //window
let sub = new sup();  //sup
