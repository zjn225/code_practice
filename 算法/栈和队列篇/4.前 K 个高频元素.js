// 输入: nums = [3,2,2,1,1,1], k = 2
// 输出: [1,2]

var topKFrequent = function (nums, k) {
    //存储结果数组，{1: 3, 2: 2, 3: 1}
    const results = [];
    const map = {};
    nums.forEach(n => {
        return map[n] ? (map[n] = map[n] + 1) : (map[n] = 1);
    });
    //获取所有的key
    const mapKey = Object.keys(map);
    // 进行map的值的降序排序，注意这里是根据map的值而不是key的值
    const sortedKeys = mapKey.sort((a, b) => map[b] - map[a]);

    //取前几个的k的结果
    for (let i = 0; i < k; i++) {
        results.push(sortedKeys[i]);
    }

    return results;
};

topKFrequent([3, 2, 2, 1, 1, 1], 2)