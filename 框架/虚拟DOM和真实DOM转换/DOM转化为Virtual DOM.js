// 只关心两种Node类型：Node.TEXT_NODE和Node.ELEMENT_NODE

// 创建虚拟DOM
function createVirtualDom(element) {
    switch (element.nodeType) {
        case Node.TEXT_NODE:
            return createVirtualText(element);
        case Node.ELEMENT_NODE:
            return createVirtualElement(element);
        default:
            return null;
    }
}

// 创建Text（文本）类型的虚拟DOM
function createVirtualText(element) {
    const vText = {
        type: 'VirtualText',
        text: element.nodeValue,
    };
    if (typeof element.__flow !== 'undefined') {
        vText.__flow = element.__flow;
    }
    return vText;
}

// 创建元素类型的虚拟DOM
function createVirtualElement(element) {
    const tagName = element.tagName.toLowerCase();
    // 获取children和属性
    const children = getNodeChildren(element);
    const attr = getNodeAttributes(element);
    const vElement = {
        type: 'VirtualElement',
        attributes: attr,
        tagName,
        children,
    };
    // __flow用来记录一些参数，包括标记ID等
    if (typeof element.__flow !== 'undefined') {
        vElement.__flow = element.__flow;
    }
    return vElement;
}

// 核心方法：获取children
function getNodeChildren(element) {
    const childNodes = element.childNodes ? [...element.childNodes] : []; // NodeList转换成数组
    const children = [];
    childNodes.forEach((cnode) => {
        // 很核心了，children加进去的是经过createVirtualDom的，而createVirtualDom最终又会经过以上所有方法，包括当前函数，很巧妙的“递归“
        children.push(createVirtualDom(cnode));
    });
    return children
}

function getNodeAttributes(element) {
    const attributes = element.attributes ? [...element.attributes] : [];// NodeList转换成数组
    const attr = {};
    attributes.forEach(({ nodeName, nodeValue }) => {
        attr[nodeName] = nodeValue;
    });
    return attr;
}

// --------------------------------------
const rootDom = document.querySelector('#root')
console.log('>>>>', createVirtualDom(rootDom));