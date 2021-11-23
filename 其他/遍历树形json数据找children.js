let array = [
    {
        id: 1,
        children: [{
            id: 2,
            children: []
        }]
    },

    {
        id: 3,
        children: []
    },

    {
        id: 4,
        children: [
            {
                id: 5,
                children: [
                    {
                        id: 6,
                        children: []
                    },

                    {
                        id: 7,
                        children: []
                    }
                ]
            }
        ]
    }
]

// 因
let returnedItem;
let find = function (arr, id) {
    arr.forEach((item) => {
        if (item.id == id) {//判断递归结束条件
            returnedItem = item;
        } else if (item.children.length > 0) {  //判断children是否有数据
            find(item.children, id);  //递归调用                      
        }
    })
}

find(array, 7);
console.log(returnedItem)