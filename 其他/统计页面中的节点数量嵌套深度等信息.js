/*
DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）
 当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数，请用 JS 配合
 原生 DOM API 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，可以使用任意
 浏览器的最新特性；不用考虑 shadow DOM）。比如在如下页面中运行后：
 */

const obj = {}

class Ele {
    constructor(ele) {
        this.ele = ele;
        this.deep = 1;
    }
    //取当前节点的元素深度，每次取到当前ele的父节点，如果不是最顶级的document，则开始递归，让当前ele覆盖为当前父节点，同时deep++。然后进入递归
    getEleDepth() {
        let parentNode = this.ele.parentNode;
        if (parentNode !== document) {
            this.deep++;
            this.ele = parentNode;
            return this.getEleDepth();
        } else {
            return this.deep;
        }
    }
    //取每个元素的最大子元素个数
    getEleSubNum() {
        let childNum = 0;
        for (let i = 0; i < this.ele.children.length; i++) {
            childNum++;
        }
        return childNum;
    }
}

// 获取当前页面所有的DOM
const totalElements = document.getElementsByTagName("*")
//  节点数量总和
obj.totalElementsCount = totalElements.length;//dom中的所有节点数量

let eleDepthArr = []; // 最大嵌套深度
let eleSubArr = []; // 最大子元素个数

// 遍历所有节点，最后升序排序，第0个则为最大
for (let i = 0; i < totalElements.length; i++) {
    eleDepthArr.push(new Ele(totalElements[i]).getEleDepth())
    eleSubArr.push(new Ele(totalElements[i]).getEleSubNum())
}
eleDepthArr = eleDepthArr.sort((a, b) => (b - a))
eleSubArr = eleSubArr.sort((a, b) => (b - a))
obj.maxDOMTreeDepth = eleDepthArr[0]//元素节点的最大嵌套深度
obj.maxChildrenCount = eleSubArr[0]//最大子元素个数

console.log(obj)