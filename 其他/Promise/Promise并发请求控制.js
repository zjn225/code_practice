class Scheduler {
    list = []
    maxNum = 2  // 最大并发数
    workingNum = 0 // 当前工作的Promise数量
    // 生成Promise数组
    add(promiseCreator) {
        this.list.push(promiseCreator)
    }
    // 开始工作
    start() {
        for (var i = 0; i < this.maxNum; i++) {
            this.doNext()
        }
    }
    // 递归执行
    doNext() {
        if (this.list.length && this.workingNum < this.maxNum) {
            this.workingNum++
            this.list.shift()()
                .then(() => {
                    this.workingNum--
                    this.doNext()
                })
        }
    }
}

// sleep函数
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time))

const scheduler = new Scheduler()

// 生成Promise任务
const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

scheduler.start()