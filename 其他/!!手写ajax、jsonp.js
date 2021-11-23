// ajax基本版
function myAjax(url) {
    let xhr = new XMLHttpRequest();  //1、创建xhr对象
    if (!xhr) return;
    //2、指定响应函数，以及获取数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = (xhr.responseText)
        } else {
            return;
        }
    };
    //3、创建请求，第三个参数false是同步，true是异步
    xhr.open("GET", url, true);
    //4、发送请求
    xhr.send()
}

// 完美ajax版:  定义默认参数---->合并参数---->处理url--->处理请求头
function myAjax2(options) {
    let opt = {
        url: '',
        type: '',
        data: {},
        success: function () { },
        error: function () { }
    }
    // 合并参数
    for (let i in options) {
        if (options.hasOwnProperty(i)) {
            opt[i] = options[i]
        }
    }
    let xhr = new XMLHttpRequest();
    // 获得请求参数
    let data = opt.data,
        url = opt.url,
        type = opt.type,
        params = ""
    // 拼接参数为数组，如{name:"zjn",age:21}   ==>   ["name=zjn","age=21"]
    url += url.includes('?') ? '&' : '?';
    for (var key in data) {
        params += `${key}=${data[key]}&`
    }
    url += params;
    // 开始请求
    if (type === "GET") {
        xhr.open(type, url, true)
        xhr.send()
    } else if (type === "POST") {
        xhr.open(type, url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(params.split("&"))
    }

    xhr.onreadystatechange = function () {
        //获取数据操作.
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res;
            if (opt.success) {
                res = xhr.responseText;
                opt.success.call(xhr, res)
            }
            if (opt.error) {
                opt.error.call(xhr, res)
            }
        } else {

        }
    }
}


// 手写jsonp，也一样要服务端配合，只是服务端就不用CORS了
const jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
        // 初始化url
        let dataString = url.indexOf('?') === -1 ? '?' : '&'
        let callbackName = `jsonpCB_${Date.now()}`
        url += `${dataString}callback=${callbackName}`
        if (data) {
            // 有请求参数，依次添加到url
            for (let k in data) {
                url += `&${k}=${data[k]}`
            }
        }
        let jsNode = document.createElement('script')
        jsNode.src = url
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode)

        // 定义好callback的函数体，scrip请求src后返回类似callback({"name":"jifeng","company":"taobao"})
        // 触发下面这个定义的方法，触发后删除js标签和绑定在window上的callback
        window[callbackName] = result => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            if (result) {
                resolve(result)
            } else {
                reject('没有返回数据')
            }
        }
        // js加载异常的情况
        jsNode.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            reject('JavaScript资源加载失败')
        }, false)

    })
}
jsonp('http://192.168.0.103:8081/jsonp', { a: 1, b: 'heiheihei' })
    .then(result => { console.log(result) })
    .catch(err => { console.error(err) })