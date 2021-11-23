// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 思想：前序遍历可以知道根节点，但是不知道这个根节点的左右子树，因此需要中序遍历作为辅助，根据根节点找出前序和中序的左右子树
function reConstructBinaryTree(pre, vin) {
    //边界值一定要处理，也是离开递归的条件, 返回null就行了，因为每次递归就会new TreeNode
    if (pre.length == 0 || vin.length == 0) {
        return null;
    };
    let root = pre[0];   //先序遍历的第一个节点为根节点
    let node = new TreeNode(root);  //每次遍历都会创建节点

    let index = vin.indexOf(root);  //根节点在中序遍历中的位置，以此来分割左右子树

    // 中序的左右子树
    let vinLeft = vin.slice(0, index);
    let vinRight = vin.slice(index + 1);

    // 前序的左右子树
    // 1是因为避开第0个根节点，index+1是因为保证个数和中序的一样，即index个
    let preLeft = pre.slice(1, index + 1);
    let preRight = pre.slice(index + 1);

    //递归得到最终的左右子树，两个参数分别是前序和中序的左右子树，个数都是一样的
    node.left = reConstructBinaryTree(preLeft, vinLeft);
    node.right = reConstructBinaryTree(preRight, vinRight);

    return node;
}