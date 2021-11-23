// 寻找左侧
const findLeft = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else if (arr[mid] > target) {
            right = mid - 1;
            // 关键，匹配到之后开始往mid的左边走，直到匹配到最左边
        } else if (arr[mid] === target) {
            right = mid - 1;
        }
    }
    return left;
}

findLeft([1, 2, 3, 6, 6, 6, 6], 6) // 3


// 寻找右侧
const findRight = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] < target) {
            left = mid + 1;
        } else if (arr[mid] > target) {
            right = mid - 1;
            // 关键
        } else if (arr[mid] === target) {
            left = left + 1;
        }
    }
    return left;
}

findRight([1, 2, 3, 6, 6, 6, 6], 6) // 7
