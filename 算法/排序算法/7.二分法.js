// 非递归方式
function binarySearch(arr, target) {
    let low = 0,
        high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((high + low) / 2);
        if (target == arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            low = mid + 1;
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
}

// 递归方式
function binary_search2(arr, target, low = 0, high = arr.length - 1, ) {
    let mid = Math.floor((high + low) / 2);
    if (arr[mid] == target) {
        return mid;
    } else if (target < arr[mid]) {
        high = mid - 1;
        return binary_search2(arr, target, low, high);
    } else if (target > arr[mid]) {
        low = mid + 1;
        return binary_search2(arr, target, low, high);
    }
}

let res = binary_search2([1, 2, 3, 4, 5, 6, 7, 8], 7)
console.log("res", res)
