// https://github.com/Alex660/Algorithms-and-data-structures/blob/master/demos/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E4%B8%89%E5%BA%8F%E9%81%8D%E5%8E%86.md
function GetNext(pNode) {
    if (pNode === null) return null;
    //如果该节点有右子树，那么遍历的下一个节点，就是右子树最左的节点（叶子结点）
    if (pNode.right) {
        let node = pNode.right;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    //没右子树，分两种情况，分别是其父子节点的左孩子或者右孩子，这种情况的next都是向上遍历的，p.next指父节点，而不是说next就是向下遍历
    while (pNode.next !== null) {
        if (pNode.next.left === pNode) //该节点是父节点的左孩子，直接返回父节点，情景：pNode=2
            return pNode.next;
        pNode = pNode.next; //否则继续向上遍历,直到pNode.next.left === pNode，情景：pNode=1
    }
    // 尾节点
    return null;
}