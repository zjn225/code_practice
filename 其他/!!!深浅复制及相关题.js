// 1、浅复制
function shallowClone(obj) {
  let newObj = {};
  for (let i in obj) {  //for...in 数组和对象都能遍历
    if (obj.hasOwnProperty(i)) {
      newObj[i] = obj[i]; //如果是对象，那么i就是key，newObj.age = obj.age，同时赋值了key和value
    }
  }
  return newObj;
}

// Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
let obj1 = { person: { name: "kobe", age: 41 }, sports: 'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

// 展开运算符...  与 Object.assign ()的功能相同
let obj1 = { name: 'Kobe', address: { x: 100, y: 100 } }
let obj2 = { ...obj1 }
obj1.address.x = 200;
obj1.name = 'wade'
console.log('obj2', obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }

// Array.prototype.concat()、Array.prototype.slice()
let arr = [1, 3, {
  username: 'kobe'
}];
let arr2 = arr.concat();
arr2[2].username = 'wade';
console.log(arr); //[ 1, 3, { username: 'wade' } ]




/* 深复制1 递归 + 遍历
缺点：无法拷贝Symbol和不可枚举的属性
*/

function cloneDeep(source, hash = new Map()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 循环检测，我们设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表
  let target = Array.isArray(source) ? [] : {}; // source拷贝到target
  hash.set(source, target); // 新增代码，哈希表设值

  for (let key in source) {
    const value = source[key];
    if (source.hasOwnProperty(key)) {
      // value是Object或Array，且不是null（因为typeof null也是object）
      if (typeof value === 'object' && value) {
        target[key] = cloneDeep(value, hash); // 传入哈希表
      } else {
        target[key] = value;
      }
    }
  }
  return target;
}

// 每进入一次cloneDeep函数，就会有一个，因为进了一次递归，所以有2个
// 处理a.circleRef时，也会进入递归，但是判断到已经存在了，就不会执行以下的赋值了，直接就返回了
/**
  0: {Object => Object}
  key: {name: "muyiy", book: {…}, a1: undefined, a2: null, a3: 123, …}
  value: {name: "muyiy", book: {…}, a1: undefined, a2: null, a3: 123, …}

  1: {Object => Object}
  key: {title: "You Don't Know JS", price: "45"}
  value: {title: "You Don't Know JS", price: "45"}
 */

var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
}
a.circleRef = a; // 循环引用

let b = cloneDeep(a)
console.log(b);

// 深复制方法2 但是对于对象或数组里有unction、symbol、正则之类的值等无法进行深复制(而且会直接丢失相应的值)
function deepClone2(obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
}


// 三、衍生例子1
const testData = {
  a_v: 123,
  a_y: [1, 2, 3, 4],
  a_d: {
    s: 2,
    s_3: 3
  },
  a_f: [{
    a_g: 5
  }],
  a_a_d: 1
}
// a_d => aD
// a_a_d =>aAD   也就是将对象的key名称改为驼峰式

function underscoreToHump(data) {
  let newObj = data instanceof Object ? {} : [];
  for (let i in data) {
    let key = i.toString(); // a_v
    if (key.indexOf("_")) {
      let keyArr = key.split("_")
      let firstArr = keyArr.shift(); //第一个不变,之后的变为大写
      let secondArr = keyArr.map(item => item.toUpperCase()).join("")
      let newKey = firstArr.concat(secondArr)
      if (typeof data[key] === "object") { //需要深复制
        newObj[newKey] = underscoreToHump(data[key])
      } else {
        newObj[newKey] = data[key]
      }
    } else { //没有_，直接赋值
      newObj[key] = data[key]
    }
  }
  return newObj
}

console.log(underscoreToHump(testData))

// Object.assign只能实现一层对象的深复制，对象里再有对象就不能深复制了