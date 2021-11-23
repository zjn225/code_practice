// 方法1: 快慢指针
var hasCycle = function (head) {
    let dummyHead = new ListNode();
    dummyHead.next = head;
    let fast = slow = dummyHead; // 两个头指针
    // 零个结点或者一个结点，肯定无环
    if (fast.next === null || fast.next.next === null) {
        return false;
    }
    while (fast && fast.next) {
        fast = fast.next.next; // 快指针走两步
        slow = slow.next;   // 慢指针走一步
        // 两者相遇了
        if (fast === slow) {
            return true;
        }
    }
    return false;
};

// 方法2: Set 判重
// 用 Set 数据结构保存节点，利用节点的内存地址来进行判重，如果同样的节点走过两次，则表明已经形成了环。
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = (head) => {
    let set = new Set();
    let p = head;
    while (p) {
        // 同一个节点再次碰到，表示有环
        if (set.has(p)) return true;
        set.add(p);
        p = p.next;
    }
    return false;
}
