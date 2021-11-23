// 输入: 1->2
// 输出: false

// 输入: 1->2->2->1
// 输出: true

// 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

var isPalindrome = function (head) {
    let slow = head;
    let fast = head;
    // 链表中间结点即为slow，因为fast总是slow的两倍
    // 至于这个循环的条件，因为在偶数条件下，fast为空是先出现的，而在奇数条件下，fast.next为空先出现，所以两者合并讨论
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 反转中间结点slow开始的后半链表
    let prev = null;
    while (slow) {
        let next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }

    // 对比链表前半部分和反转后的后半部分
    while (prev && head) {
        if (head.val !== prev.val) {
            return false;
        }
        prev = prev.next;
        head = head.next;
    }

    return true;
};

// 1->2->3->3->2->1 

// 找到中点3后，开始反转链表套路，把中点之后的链表全部反转，即1->2->3->1->2->3，最后pre为1

// 对比链表前半部分和反转后的后半部分，只要有不相等的情况，就不是回文链表了