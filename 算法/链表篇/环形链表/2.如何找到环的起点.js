// 两个结论：
// 1、设置快慢指针，假如有环，他们最后一定相遇。
// 2、两个指针分别从链表头和相遇点继续出发，每次走一步，最后一定相遇与环入口。
var detectCycle = function (head) {
    let dummyHead = new ListNode();
    dummyHead.next = head;
    let fast = slow = dummyHead;
    // 零个结点或者一个结点，肯定无环，fast.next 就是首节点，他的next是null就代表只有1个节点
    if (fast.next == null || fast.next.next == null)
        return null;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 两者相遇了
        if (fast == slow) {
            let p = dummyHead;
            while (p !== slow) {
                p = p.next;  // 链表头出发
                slow = slow.next; // 相遇点出发
            }
            return p;
        }
    }
    return null;
};