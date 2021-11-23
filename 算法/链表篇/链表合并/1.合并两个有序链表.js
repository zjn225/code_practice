// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

// 其实递归就是程序内部维护了一个栈。这个题就是每次都把最小值压入栈，最后出栈的时候，将所有数连在一起就可以了。说白了，就是用一个栈维护了顺序。最后的连接，当然是小的连小的，所以l1 小，就连到 l1,l2 小就连到 l2，最后先返回的，就是最小的头结点。
// https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/hua-jie-suan-fa-21-he-bing-liang-ge-you-xu-lian-bi/

// 递归解法
var mergeTwoLists = function (l1, l2) {
    const merge = (l1, l2) => {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        // 谁的值小，就谁去连接, 小的值同时也传入merge中。作为参数，因为他还要去递归中连接
        if (l1.val > l2.val) {
            l2.next = merge(l1, l2.next);
            return l2
        } else {
            l1.next = merge(l1.next, l2);
            return l1;
        }
    }
    return merge(l1, l2);
};

// 循环解法
var mergeTwoLists = function (l1, l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    let cur = dummyHead = new ListNode();
    let p1 = l1, p2 = l2;
    while (p1 && p2) {
        if (p1.val > p2.val) {
            cur.next = p2;
            cur = cur.next;
            p2 = p2.next;
        } else {
            // p1 < p2 時， cur.next = 小的，cur向前走一步，取到小的值后，该链表也向前走一步（因为值已经取完了）
            cur.next = p1;
            cur = cur.next;
            p1 = p1.next;
        }
    }
    // 循环完成后务必检查剩下的部分
    if (p1) {
        cur.next = p1;
    } else {
        cur.next = p2;
    }
    return dummyHead.next;
};

// p1：1->2->3  p2：4->5->6
// null (cur) -> 1  --->   null -> 1 (cur)  ， p1 = 2 -> 3   p2 =  4->5->6
// null -> 1(cur) ->  2  -->   null -> 1 ->  2(cur) ,  p1 = 3  p2 = 4->5->6

// p只是个工具人，把所有节点调完后就没了，最终返回头指针.next，也就是首节点即可