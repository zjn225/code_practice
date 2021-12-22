const data = [
    {
        id: '1',
        name: '广东省',
        children: [
            {
                id: '11',
                name: '广州市',
                children: [
                    {
                        id: '111',
                        name: '海珠区'
                    },
                    {
                        id: '112',
                        name: '天河区',
                        children: [
                            {
                                id: '1121',
                                name: '赤岗街道'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const value = '112'
const fn = (data, value) => {
    let res = []
    const dfs = (arr, temp = []) => {
        for (const node of arr) {
            if (node.children) {
                // 每次递归的时候都记录当前的id到temp
                dfs(node.children, temp.concat(node.id))
            } else {
                if (node.id === value) {
                    temp.push(node.id)
                    res = temp
                    return
                }
            }
        }
    }
    dfs(data)
    return res
}
const res = fn(data, value) // 输出 [1， 11， 112]
console.log('res', res);