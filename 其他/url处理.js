// http://example.com:1234/test.html?id=1&name="zjn"：

// 完整url
var href = location.href //http://example.com:1234/test.htm#part2： 
// hash值
var hash = location.hash //#part2           
// 主机
var host = location.host //example.com:1234     
// 主机（不包端口）
var hostname = location.hostname //example.com  
// 端口号
var port = location.port            
// 路径
var pathname = location.pathname   //  /后面的 
// url协议
var protocol = location.protocol
// url查询参数  很重要！！！！！
var search = location.search  