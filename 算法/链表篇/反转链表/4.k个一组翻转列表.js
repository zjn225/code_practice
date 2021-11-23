/* 
给定这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5 
*/

// 递归法
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    let pre = null, cur = head;
    let p = head;
    // 下面的循环用来检查后面的元素是否能k个组成一组，不能的话就返回head，也就是后面的都不翻转了
    for (let i = 0; i < k; i++) {
        if (p == null) return head;
        p = p.next;
    }
    for (let i = 0; i < k; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // pre为本组最后一个节点，cur为下一组的起点
    head.next = reverseKGroup(cur, k);
    return pre;
};

/*
    1->2->3->4->5  ==>  3->2->1->4->5  , k = 3
    p = 1, cur = 1
    检查：[0,3) i = 2 时， p!==null, p = p.next = 4
    开始区间翻转：[0,3) ===>  3 -> 2 -> 1 , pre = 3, cur = 4

    准备递归：head(1).next = 递归(4, 3)

    检查, 不通过，return 4,即 3->2->1->4->5
*/


// 循环解法
var reverseKGroup = function (head, k) {
    let count = 0;
    // 看是否能构成一组，同时统计链表元素个数
    for (let p = head; p != null; p = p.next) {
        if (p == null && i < k) return head;
        count++;
    }
    let loopCount = Math.floor(count / k);
    let p = dummyHead = new ListNode();
    dummyHead.next = head;
    // 分成了 loopCount 组，对每一个组进行反转
    for (let i = 0; i < loopCount; i++) {
        let pre = null, cur = p.next;
        for (let j = 0; j < k; j++) {
            let next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
            // start 是该组首节点，cur 为下一组首节点，当前 pre 为该组的尾结点，
        }
        let start = p.next;
        p.next = pre; // 上一组的尾结点 连接 当前组尾结点
        start.next = cur; // 该组首节点（反转后的末尾节点） 连接 下一组首节点
        p = start; // (代表上一组的尾结点)
    }
    return dummyHead.next;
};

/*
    1->2->3->4->5->6  ==>  3->2->1->6-5->4  , k = 3
    count = 6; loopCount = 2,  p.next = dummyHead.next = 1, 即p和dummyHead是头指针

    // 又是区间反转，只不过又loopCount次反转

     1 <- 2 <- 3，pre=3, cur=4
    start = 1 
    p.next = 3，即  头指针 -->  3 -> 2 -> 1
    start(1).next = cur(4)  1 ——> 4 -> 5 -> 6
    p = 1 (代表上一组的尾结点)

    4 <- 5 <- 6 pre = 6, cur = null
    start = p.next = 4
    p.next = 6  头指针 -->  3 -> 2 -> 1 -> 6 -> 5 -> 4
    start(4).next = cur(null)  头指针 -->  3 -> 2 -> 1 -> 6 -> 5 -> 4 -> null
    p = 4

*/