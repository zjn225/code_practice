// 注意sort默认的排序就是针对字典序
function func1(str){
    let arr = str.split("");
    arr.sort()
    console.log("arr",arr)
}

func1("cdbiqodjjz")


function func2(arr){
    return arr.sort()
}

func2(["bc","bz","bk","ba"])