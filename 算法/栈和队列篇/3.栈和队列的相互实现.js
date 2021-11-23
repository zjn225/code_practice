// 注意：栈方法（push,pop）,队列方法（push,shift）

// 一、使用两个栈实现队列，栈是先进后出, 想得到先进先出的效果

// push(x) -- 将一个元素放入队列的尾部。 pop() -- 从队列首部移除元素。 peek() -- 返回队列首部的元素。 empty() -- 返回队列是否为空。

var MyQueue = function () {
    // 这俩是栈
    this.stack1 = []; // 保存正序
    this.stack2 = []; // 保存逆序
};

// 实现队列的入队方法：这个都无所谓，栈和队列的区别主要在于出去的时候
MyQueue.prototype.push = function (x) {
    this.stack1.push(x);
};

// 实现队列的出队方法，栈是先进后出, 想得到先进先出的效果，方式就是逆序然后pop
MyQueue.prototype.pop = function () {
    // 将 stack1 的元素转移到 stack2，来实现逆序读取
    if (!this.stack2.length) {
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        }
    }
    return this.stack2.pop();
};

// 返回队列首部的元素
MyQueue.prototype.peek = function () {
    if (!this.stack2.length) {
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        }
    }
    return this.stack2[this.stack2.length - 1];
};

MyQueue.prototype.empty = function () {
    return !this.stack1.length && !this.stack2.length;
};

// ------------------------------------------------------------------------------

// 二、两个队列实现栈  队列是先进先出，想得到先进后出的效果
var MyStack = function () {
    this.queue1 = [];
    this.queue2 = [];
    this.topValue;
};

// push(x) -- 元素 x 入栈
MyStack.prototype.push = function (x) {
    this.topValue = x;
    this.queue1.push(x);
};

// pop() -- 移除栈顶元素； 一般来说在直接pop就行，但是就是要实现pop方法，如果逆序过来，再shift呢？因为在最前面，所以比较麻烦
MyStack.prototype.pop = function () {
    // 有queue1的时候，即push过的时候
    while (this.queue1.length) {
        // 之所以 === 1 作为边界条件，是因为执行pop的时候，栈顶元素不用更新
        if (this.queue1.length == 1) {
            const popValue = this.queue1.shift();
            this.queue1 = this.queue2; // queue1被shift没了，都到了queue2去了，可以把queue2当做缓存，之后要赋值回queue1去的
            this.queue2 = [];
            return popValue;
        }
        this.topValue = this.queue1.shift() // 相当于把除了栈顶的其他元素都移除掉，然后push进queue2
        this.queue2.push(this.topValue);
    }
    // queue1是空的时候，即没有push过的时候
    return -1;
};

// top() -- 获取栈顶元素
MyStack.prototype.top = function () {
    return this.topValue;
};

MyStack.prototype.empty = function () {
    return !this.queue1.length;
};

// push1 push2 push3 pop1   
// queue1 = [1,2,3] queue2 = [] 
    // queue1.length === 3 --> topValue = 1; queue1 = [2, 3] queue2 = [1];
    // queue1.length === 2 --> topValue = 2; queue1 = [3]  queue2 = [1, 2]
    // queue1.length === 1 -->  边界条件了, temp = 3; queue1 = []; queue1 = [1,2]  return 3; 不会走下面的逻辑了 topValue 依然是2
