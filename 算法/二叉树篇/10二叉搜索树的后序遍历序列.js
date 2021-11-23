// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

// 遍历每一个节点，然后看该节点的左右子树是否满足二叉搜索树
function VerifySquenceOfBST(sequence) {
    if (!sequence.length) return false;
    let count = 0;
    let len = sequence.length;
    while (len) {
        len--;
        let root = sequence[len];                //后序遍历的最后一个是根节点，然后根节点随len变化
        while (sequence[count] < root) count++; //左子树上所有结点的值均小于它的根结点的值
        while (sequence[count] > root) count++;//右子树上所有结点的值均大于它的根结点的值；
        if (count < len) {
            return false;   //左右子树所有大于或小于根节点的值和count===0才能代表是二叉搜索树
        }
    }
    return true;
}