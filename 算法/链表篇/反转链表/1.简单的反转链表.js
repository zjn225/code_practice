// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

// 来源: LeetCode 第 206 题


// 链表结构声定义如下:
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// 循环解决方案
/**
* @param {ListNode} head
* @return {ListNode}
*/
// 这里之所以不用new ListNode是因为直接赋值head给cur了
let reverseList = (head) => {
    if (!head)
        return null;
    let pre = null, cur = head;
    while (cur) {
        // 关键: 保存下一个节点的值，因为马上要修改cur.next了，而最后一步要把当前元素设为这个next
        let next = cur.next;
        cur.next = pre;
        pre = cur; // 前进
        cur = next; // 前进
    }
    return pre;
};

/*
    比如1->2
    pre = null. cur = 1
        let next = 2,
        cur.next = pre = null
        pre = cur = 1
        cur = next = 2
*/


// 递归解决方案

let reverseList = (head) => {
    let reverse = (pre, cur) => {
        if (!cur) return pre;
        // 保存 next 节点
        let next = cur.next;
        cur.next = pre;
        // 这里的参数传入相当于赋值啦，递归核心之一
        // 等价于 pre = cur
        // cur = next
        reverse(cur, next);
    }
    // 这里的参数传入相当于赋值啦，递归核心之一
    return reverse(null, head);
}


