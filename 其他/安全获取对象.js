// 方法1
const safeGet = (o, p) => {
    try {
        return p.split('.').reduce((o, k) => o[k], o)
    } catch (e) {
        return undefined
    }
}

// 方法2
function getObjectValueByKeyStr(obj, key) {
    if (!key) return defaultVal;
    let namespace = key.toString().split(".");
    let value = '';
    namespace.forEach(item => {
        value = obj[item];
        obj = value;
    })
    return value;
}


var x = { y: { z: 100, }, };

var val = getObjectValueByKeyStr(x, "y.z");
// var val = getObjectValueByKeyStr(x, "zz");
console.log(val);

// 等价于x?.y?.z  ，es2020的写法