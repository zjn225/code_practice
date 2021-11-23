['1', '2', '3'].map(parseInt); // [1,NaN,NaN]

// 刨析

// map里的回调有三个参数:数组元素，元素索引，原数组本身   v i a
// parseInt有两个参数,元素本身string以及进制radix，会把第一个参数看作是一个数的n进制表示，而返回的值则是十进制的
// ['1','2','3'].map(parseInt); 等于如下
['1', '2', '3'].map(function (value, index, array) {
    return parseInt(value, index, array); // map的参数会原封不动的传进去第一个参数parseInt里
});

// parseInt("1",0); => 1      字符串会默认转化，0就是10进制
// parseInt("2",1); => NaN    进制范围在2-32，否则返回NaN
// parseInt("3",2); => NaN    注意！！第二个参数是表示第一个参数是什么进制，至于输出是什么进制要看第一个参数


// 关于结果，0x开头输出十六进制，0开头解析成八进制或十六进制，1-9开头输出十进制
