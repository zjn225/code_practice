// 给定 1->2->3->4, 你应该返回 2->1->4->3.

// 来源: LeetCode 第 24 题


// 循环方式
var swapPairs = function (head) {
    // 确认 head 大于等于两个，否则返回;
    if (!head || !head.next) return head; 
    let dummyHead = p = new ListNode();  // p只是跟随dummyHead一起赋值
    let node1, node2;
    dummyHead.next = head;  // 注意p.next 也指向head了，也就是说dummyHead和p此时是头指针，这一步相当于创建头指针
    // 接下来下个节点和下下个节点是否为空，因为是一组一组交换的
    while ((node1 = p.next) && (node2 = p.next.next)) {
        node1.next = node2.next; 
        node2.next = node1;  // 赋值的node1，在上面更改之后再赋值，注意顺序
        p.next = node2;
        p = node1; // p更新到交换后的最后一个的位置，即1处
    }
    return dummyHead.next;
};

/**
 * node1 = 1, node2 = 2
 * 1 -> 3;  2 -> 1;
 * p -> 2  => p -> 2 -> 1 -> 3
 * 
 * p = 1, node1 = 3 （注意node1是3了不是2）node2 = 4
 * 3 -> null;  4 -> 3
 * p-> 4   =>   p -> 4 -> 3   =>   1 -> 4 -> 3   =>   1 -> 4 -> 3 -> 2
 */