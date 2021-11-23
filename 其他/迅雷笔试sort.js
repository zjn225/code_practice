
// 给定一个学生列表，学生信息由班级、分数、姓名等组成。请按下列规则对学生列表进行排序：
// 1. 按班级从小到大排
// 2. 班级相同时，按成绩从大到小排序
// 班级和成绩相同时，按原学生列表中的先后顺序排序
var students = [{ "name": "张三", "class": 2, "score": 64 },
{ "name": "李四", "class": 1, "score": 80 },
{ "name": "王五", "class": 5, "score": 80 },
{ "name": "赵六", "class": 4, "score": 94 },

{ "name": "王五", "class": 3, "score": 99 },
{ "name": "王五2", "class": 3, "score": 66 },
{ "name": "王五3", "class": 3, "score": 120 },

{ "name": "王五4", "class": 3, "score": 120 },
{ "name": "王五5", "class": 3, "score": 120 },
{ "name": "王五6", "class": 3, "score": 120 },
]

// 解法一
function sortStudents(obj1, obj2) {
    // sort方法的核心就是两两比较
    if (obj1["class"] === obj2["class"]) {
        return obj2["score"] - obj1["score"];
    } else if (obj1['class'] === obj2['class'] && obj1["score"] === obj2["score"]) {
        return 0;
    } else {
        return obj1["class"] - obj2["class"]
    }
}

// let result = JSON.stringify(students.sort(sortStudents))
console.log("22222", students.sort(sortStudents));


// 解法二
function studSort(jsonobj) {
    // 两个sort反过来就GG了
    jsonobj.sort(function (a, b) {
        return b.score - a.score
    })
    jsonobj.sort(function (a, b) {
        return a.class - b.class;
    })
    return jsonobj
}

console.log("12", studSort(students))

// 如果涉及到文字，a.name.localeCompare(b.name);

function a(){
    this.nameA = "zjnA"
}

function b(){
    this.nameB = "zjnB"
}

