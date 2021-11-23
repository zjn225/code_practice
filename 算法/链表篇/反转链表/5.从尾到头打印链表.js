function printListFromTailToHead(head) {
    var res = [], pNode = head;
    while (pNode != null) {
        res.unshift(pNode.val); //从尾到头加
        pNode = pNode.next; //加完之后pNode立刻指向下一个节点
    }
    return res;
}