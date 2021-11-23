
// 连续赋值
var a = { n: 1 };
var b = a; // 持有a，以回查 
a.x = a = { n: 2 };
alert(a.x);// --> undefined 
alert(b.x);// --> {n:2}

// 连续赋值、全局局部变量
(function () {
    var x = c = b = { a: 1 }
})()

console.log(x.a); // error , x is not defined
console.log(c.b) // {a: 1} {a: 1}

// 等价于：
var x = { a: 1 }
c = { a: 1 }
b = { a: 1 }
// 使用了var关键字，这个变量将只在定义它的函数内生效。 没有使用var关键字，这个变量将提升为全局变量。


// !!三目运算符
var count = 0;

console.log(typeof count === "number"); // true , 这个不用解释了

console.log(!!typeof count === "number"); // false

// 这里涉及到就是优先级和布尔值的问题
// typeof count 就是字符串"number"
// !!是先把眼前的typeof count转为布尔值(三目运算符的变种),非空字符串布尔值为 true
// 最后才=== 比较 , true === "number" , return false


