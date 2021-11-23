let timer = null
const interval = (func, wait) => {
    // 就是两次setTimeout
    let interv = function () {
        func();
        timer = setTimeout(interv, wait);
    };
    timer = setTimeout(interv, wait);
}

// test
interval(function () {
    console.log(Math.random() * 100)
}, 1000);

// 清除
window.clearTimeout(timer);
timer = 0;