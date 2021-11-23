// 求100~999的所有"水仙花"数, 就是三位数中各数字的立方和等于自身,比如153=1^3+5^3+3^3
function threeWaterFlower(start = 100, end = 900) {
    let result = [];
    for (let i = start; i <= end; i++) {
        let t = i.toString().split(''); //分解数字-->数组，如100 --> ["1", "0", "0"]
        Math.pow(t[0], 3) + Math.pow(t[1], 3) + Math.pow(t[2], 3) === i && result.push(i);
    }
    return result;
}

threeWaterFlower(100, 999); // [153, 370, 371, 407]

// 不定花数，es6写法
let manyWaterFlower = (start = 100, end = 999, flower = 3) => {
    let result = [];
    for (let i = start; i <= end; i++) {
        let t = i
            .toString()
            .split('')
            .map(item => Math.pow(item, flower))  // 先执行立方的计算 [1,2,3] map之后 [1, 8, 27]
            .reduce((cur, next) => parseInt(cur) + parseInt(next)); // 执行立方和的累加， 1 + 8 + 27
        t === i && result.push(i);
    }
    return result;
}

manyWaterFlower(100, 10000, 4); // [1634, 8208, 9474]
manyWaterFlower(100, 10000, 5); // [4150, 4151]


