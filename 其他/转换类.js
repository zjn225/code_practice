if ([] == false) { console.log(1) };
if ({} == false) { console.log(2) };
if ([]) { console.log(3) }
if ([1] == [1]) { console.log(4) }
if ({}) { console.log("5") }
if (new Boolean(0)) { console.log("6") }

// 会输出1 3 5，6

// 1、数组和布尔值比较，会被转换成数字！！！！所以空数组是0，也就是说这是==的强制类型转换结果，但是对象和布尔值比较，不会转换成数字
// 2、{}不能和布尔值比较，为false
// 3、if()括号里进行的运算是转换成Boolean，也就是会执行Boolean()，除了null、undefined、NaN、+0、-0、""是false，其他为true
// 4、地址不等


