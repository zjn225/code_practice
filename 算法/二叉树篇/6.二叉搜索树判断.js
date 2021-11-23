// 输入:
//     2
//    / \
//   1   3
// 输出: true

var isValidBST = function (root) {
    // 中序遍历
    let arr = [];
    let traverse = (root) => {
        if (root == null) return;
        traverse(root.left);
        arr.push(root.val);
        traverse(root.right);
    }
    traverse(root);

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] >= arr[i + 1]) return false  // 左子树要小于根节点
        if ((i - 1) && arr[i] <= arr[i - 1]) return false // 右子树要大于根节点
    }

    return true
};
