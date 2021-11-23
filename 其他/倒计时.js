function outputTime(startTimeStamp) {
    if (!startTimeStamp) {
        return;
    }
    typeof startTimeStamp === "string" ? startTimeStamp = parseInt(startTimeStamp) : startTimeStamp // 类型处理
    let startTime = new Date(startTimeStamp); // 将输入参数格式转换
    let endTime = new Date()  // 当前时间
    let result = diffTime(startTime, endTime); // 获取时间差
    let [diffDays, diffHours, diffMinutes, diffSeconds] = result // 解构获取相差的天数、小时数、分钟数、秒数

    // 大于2天，直接显示日期
    if ((diffDays > 2) || (diffDays === 2 && (diffMinutes > 0 || diffSeconds > 0))) {
        console.log("直接显示日期：", transformTime(endTime));
        // 小于2天
    } else if (diffDays < 2 && diffDays > 1 || (diffDays === 1 && diffHours > 0 || diffMinutes > 0)) {
        console.log("1天前")
        // 1小时前
    } else if (diffDays === 0 && diffHours > 0 && diffHours <= 1) {
        console.log("1小时前")
        // 1分钟前
    } else if (diffDays === 0 && diffHours === 0 && diffMinutes <= 1) {
        console.log("1分钟前")
    }
}

// 工具函数：时间差计算
function diffTime(startTime, endTime) {
    let delta = endTime - startTime; // 时间差，毫秒
    // 1、相差的天数
    let days = Math.floor(delta / (24 * 3600 * 1000));

    // 2、相差的小时
    let tempHours = delta % (24 * 3600 * 1000); //计算天数之后剩余的毫秒数
    let hours = Math.floor(tempHours / (3600 * 1000));

    //3、计算相差分钟数
    let tempMinutes = tempHours % (3600 * 1000);  //计算小时数之后剩余的毫秒数
    let minutes = Math.floor(tempMinutes / (60 * 1000));

    //4、计算相差秒数
    let leave3 = tempMinutes % (60 * 1000); //计算分钟数之后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);

    // 以数组形式返回
    return [days, hours, minutes, seconds]
}

// 工具函数：时间戳转日期
function transformTime(timestamp = +new Date()) {
    if (timestamp) {
        let time = new Date(timestamp);
        let y = time.getFullYear();
        let M = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    } else {
        return '';
    }
}
// 补0函数
function addZero(m) {
    return m < 10 ? '0' + m : m;
}

outputTime("1589172680000")