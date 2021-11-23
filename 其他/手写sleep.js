// 最low的方法：循环
function sleep(ms) {
    let endTime = now.getTime() + ms;
    while (true) {
        let now = new Date();
        if (now.getTime() > endTime)
            return;
    }
}

// 通过promise
function sleep1(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

sleep1(2000).then(() => {
    console.log('hi,hello')
})

// 通过async封装
function sleep2(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

async function run() {
    await sleep2(2000);
    console.log("hi,hello2222")
}

run()

// 通过generate封装
function* sleep3(ms) {
    yield new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

sleep3(2100).next().value.then(() => {
    console.log('hi,hello333333')
})
