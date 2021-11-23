let oUl = document.getElementById("ul1");
oUl.onClick = (e) => {
    let event = e || window.event;
    let target = event.target || event.srcElement;
    if (target.nodeName.toLowerCase() == "li") {
        target.style.background = "red"
    }
}

