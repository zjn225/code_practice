// - 去掉字符串中的 a,b,c 字符 ,形成结果'345efg';
test.replace(/[abc]/g, ''); // "345efg"


// - 将字符串的数字用括号括起来, 形成结果: abc[3][4][5]efg....'
test.replace(/\d/g, '[$&]');  // "abc[3][4][5]efgabcab"
// 若是有分组则按照$1, $2, $3的形式进行引用，而 $& 则表示的是整个正则表达式匹配的内容。


// - 将字符串中的每个数字的值分别乘以2,输出:'abc6810....'
var temp = test.split('').map(function (item) {
  return /\d/g.test(item) ? item * 2 : item;
}).join('');
// "abc6810efgabcab"


// 使用不少于三种方式替换文本"dream"改成"package",提供字符串"I have a dream";

// 1）正则替换
var str = "I have a dream";
str.replace(/dream/g, "package");
// 不用正则也可以直接字符串替换
str.replace("dream", "package")

// 2）数组遍历更改
var str = "I have a dream";
str.split(" ").map(function (item) {
  return item === "dream" ? item = "package" : item;
}).join(" ");

// 3）数组查询切割法
var str = "I have a dream";
var tempArr = str.split(" "); // ["I", "have", "a", "dream"]
var removeIndex = tempArr.indexOf('dream'); // 3
tempArr.splice(removeIndex, 1, "package");
var transStr = tempArr.join(" "); // "I have a package";

 