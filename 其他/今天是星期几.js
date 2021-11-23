function getDate(){
    var now = new Date().getDay();  //一周的哪一天0-6    注意getDate()是一个月的第几天0-31
    var str = "今天是星期"+"日一二三四五六".charAt(now);
}

function getDate2(){
    var now = new Date().getDay();  //一周的哪一天0-6    注意getDate()是一个月的第几天0-31
    var res = ["日", "一", "二", "三", "四", "五", "六"];
    var str = res[now];
}