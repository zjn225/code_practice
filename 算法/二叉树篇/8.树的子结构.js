// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
function HasSubtree(pRoot1, pRoot2) {
    if (pRoot1 == null || pRoot2 == null) {
        return false;
    }
    //短路运算符，一个为真，停止运算
    //先序遍历，根->左->右
    return isSubtree(pRoot1, pRoot2) ||       //以根节点为为起点判断是否包含Tree2
        HasSubtree(pRoot1.left, pRoot2) ||    //如果找不到，那么就再去root的左儿子当作起点，去判断是否包含Tree2
        HasSubtree(pRoot1.right, pRoot2);    //同理，判断右子树是否包含Tree2
}

function isSubtree(root1, root2) {
    if (root2 == null) return true;   //如果Tree2已经遍历完了都能对应的上，返回true，代表tree2就是tree1的子树
    if (root1 == null) return false; //如果Tree2还没有遍历完，Tree1却遍历完了。返回false
    if (root1.val == root2.val) {     //必须要每个节点都相同
        //如果根节点对应的上，那么就分别去子节点里面匹配
        return isSubtree(root1.left, root2.left) &&
            isSubtree(root1.right, root2.right);
    }
    return false;
}