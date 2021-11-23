// 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 
// 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

function deleteDuplication(pHead) {
    let dummyHead = new ListNode('head');
    dummyHead.next = pHead;

    let pHead = dummyHead;   // 复制一份头指针
    let qHead = pHead.next; // 第一个节点
    // 遍历每个节点
    while (qHead) {
        // 判断当前节点和下一个节点的值是否相等, 比如1-1-1-1-2, 则qHead = 1 (2前面)
        while ((qHead.next !== null) && (qHead.val === qHead.next.val)) {
            qHead = qHead.next;
        }
        // qHead没移动（代表qHead !== qHead.next, 即没有重复）
        // 没有重复的话则p和q正常前进
        if (pHead.next === qHead) {
            qHead = qHead.next;
            pHead = qHead;
        }
        // qHead移动了（有重复）
        // 有重复的话q快进一格，然后p和q相连，相当于把中间的给忽略了，也就达到了删除的目的
        else {
            qHead = qHead.next;
            pHead.next = qHead;
        }
    }
    return dummyHead.next;
}
