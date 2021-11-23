// nodeFilter是为了过滤script元素，因为我们不需要JS脚本的执行
function createElement(vdom) {
    let node;
    if (vdom.type === 'VirtualText') {
        node = document.createTextNode(vdom.text);
    } else {
        node = document.createElement(vdom.tagName)
        for (let name in vdom.attributes) {
            node.setAttribute(name, vdom.attributes[name]);
        }
        // 递归
        vdom.children.forEach((cnode) => {
            const childNode = createElement(cnode);
            if (childNode) {
                node.appendChild(childNode);
            }
        });
    }
    if (vdom.__flow) {
        node.__flow = vdom.__flow;
    }
    return node;
}

// ---------------------------------------------------
const testVirtualDom = {
    type: 'VirtualElement',
    tagName: 'span',
    attributes: {
        class: "bg s_ipt_wr quickdelete-wrap",
        id: "s_kw_wrap",
    },
    children: [
        {
            type: 'VirtualText',
            text: 'i am text',
        }, {
            type: 'VirtualElement',
            tagName: 'span',
            attributes: { class: "soutu-btn" },
            children: []
        }
    ]
}

createElement(testVirtualDom);