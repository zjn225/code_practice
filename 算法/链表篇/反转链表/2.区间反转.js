// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

// 说明: 1 ≤ m ≤ n ≤ 链表长度。

// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

// 来源: LeetCode 第 92 题

// 将需要反转的 m到n 区间的链表反转，再重新连接首尾即可

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

var reverseBetween = function (head, m, n) {
    let count = n - m;
    let p = dummyHead = new ListNode();  // 注意p 和 dummyHead 是指向同一地址的，一起改变
    let pre, cur, front, tail;
    dummyHead.next = head;  // 代表p和dummyHead此时的next值被赋值给了头节点，这一步相当于创建头指针
    // 得到区间前节点：for循环结束后，p为区间前节点，即是区间的前一位，1
    for (let i = 0; i < m - 1; i++) {
        // 从p被赋值的这个时候开始，dummyHead就已经不跟p变化了，因为这里的赋值是基本类型了
        p = p.next;
    }
    // 保存区间前节点，即1
    front = p;
    // 同时保存区间首节点，这个也是区间反转的最后一个节点，所以赋值给tail，即2，
    tail = pre = p.next;
    cur = pre.next; // 当前节点3，初始值取区间的第二个
    // 区间反转
    for (let i = 0; i < count; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 首尾连接

    // 前节点1的 next 指向区间末尾
    front.next = pre;
    // 区间首节点2的 next 指向后节点(循环完后的cur就是区间后面第一个节点，即后节点5)，2也因为反转到最后面去了
    tail.next = cur;
    return dummyHead.next;  // 返回首节点，因为dummyHead.next = head，所以dummyHead是头指针
};


// front = 1, tail = pre = 2

// 待反转 2->3-4  =>  4->3->2   
//       i = 0；  i < 2 == >  pre(2) <== cur(3) ,  pre = 3  cur = 4    先反转指针，然后交换值   2 <- 3 -> 4
//       i = 1   i < 2 == >  pre(3) <== cur(4) , pre = 4, cur = 5                          2 <- 3 <- 4

// 1 -> 4 -> 3 -> 2  
// 1 -> 4 -> 3 -> 2 -> 5 


// 递归解法
var reverseBetween = function (head, m, n) {
    // 递归反转函数 -- 工具函数
    let reverse = (pre, cur) => {
        if (!cur) return pre;
        // 保存 next 节点
        let next = cur.next;
        cur.next = pre;
        return reverse(cur, next); // 相当于赋值过程pre = cur, cur = next
    }
    let p = dummyHead = new ListNode(); // p只是跟随dummyHead一起创建，除非p或dummyHead赋被基本类型赋值了，否则是一起变化的
    dummyHead.next = head;  // 这一步相当于创建p和dummyHead这两个头指针
    let start, end; //区间首尾节点，和非递归解法的pre和cur不同
    let front, tail; //前节点和后节点
    for (let i = 0; i < m - 1; i++) {
        p = p.next;     // 这个时候的p为区间前节点，即是区间的前一位，1
        // 从p被赋值的这个时候开始，dummyHead就已经不跟p变化了，因为这里的赋值是基本类型了
    }
    front = p; //保存前节点 1
    start = front.next; // 区间首节点 2，反转后即为区间最后一个了，做连接使用
    for (let i = m; i <= n; i++) {  // 遍历区间
        p = p.next;  // 这个时候的p是区间最后那个节点，4
    }
    end = p;
    tail = end.next; //保存后节点
    end.next = null;
    // 开始穿针引线啦，前节点指向区间首，区间首指向后节点
    front.next = reverse(null, start);
    start.next = tail;
    return dummyHead.next; // 返回首节点，因为dummyHead.next = head，所以dummyHead是头指针
}

// 递归前先获取四个关键变量  front = 1 , start = 2 , end = 4, tail = 5
// 进入递归：pre = null , cur = start = 2, next = 3, cur.next = null  ==> reverse(2, 3) => ...直到 cur 不存在
// 穿针引线， front.next ==  1 --> 4 -->3 -->2 
 //         start.next ==   2 --> 5