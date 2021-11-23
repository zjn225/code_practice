// 输入两个链表，找出它们的第一个公共结点

// 思路：找出2个链表的长度，然后让长的先走完两个链表的长度差，然后再一起走（其中两链表从公共节点开始节点都是相同的）

function FindFirstCommonNode(pHead1, pHead2) {
    let len1, len2, diff, pShort, pLong;
    // 得到两个链表的长度
    len1 = GetLinkedListLength(pHead1);
    len2 = GetLinkedListLength(pHead2);

    // 取链表长度的差值，然后给pHead1和pHead2拷贝一份
    if (len1 > len2) {
        diff = len1 - len2;
        pShort = pHead2;
        pLong = pHead1;
    } else {
        diff = len2 - len1;
        pShort = pHead1;
        pLong = pHead2;
    }

    // 长的链表先把长度差跑完
    for (let i = 0; i < diff; i++) {
        pLong = pLong.next;
    }

    // 然后一起走
    while (pLong !== null && pShort !== null && pLong !== pShort) {
        pLong = pLong.next;
        pShort = pShort.next;
    }

    return pLong;
}

// 得到链表长度
function GetLinkedListLength(pHead) {
    let node = pHead,
        len = 0;
    while (node !== null) {
        node = node.next;
        len++;
    }
    return len;
}