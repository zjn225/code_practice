// 操作给定的二叉树，将其变换为源二叉树的镜像。

//直接递归交换
function invertTree(root) {
    if (root === null) {
        return root;
    }

    // 交换左右子树
    [root.left, root.right] = [root.right, root.left]

    // 左右子树传入，进行递归；递归的时候相当于root.left.left
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

