function getcookie(name){
    chrome.runtime.sendMessage({
        type: 'getCookies',
        domain: 'luogu.com.cn',
        name: name
    },function(response){
        console.log(response);
    });
}
function reloadmenu(){
    swal("Better Luogu!","更改成功","success",{button: "刷新"})
    .then((value) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {  
            chrome.tabs.reload(tabs[0].id);  
        });
    });
}
function deletecookie(name){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        chrome.cookies.remove({
            url: 'https://www.luogu.com.cn/',
            name: name,
            storeId: 'default'
        },function(cookie){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
            else{
                console.log('Cookie deleted:', cookie);
            }
        });
    });
    
}
function setcookie(name,value,days,path,domain,secure){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        var tabId = tabs[0].id;
        var details = {
            url: "https://www.luogu.com.cn/",
            name: name,
            value: value,
            domain: domain,
            path: path,
            secure: secure,
            httpOnly: false,
            expirationDate: Math.floor(Date.now()/1000)+(days*24*60*60)
        };
        chrome.cookies.set(details, function(cookie){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
            else{
                console.log("Cookie set:",cookie);
            }
        })
    });
    let expires = "";
    if(days){
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    var cookieString = name + "=" + (value || "") + expires;
    if(path) cookieString += "; path=" + path;
    if(domain) cookieString += "; domain=" + domain;
    if(secure && window.location.protocol === "https:") cookieString += "; secure";
    document.cookie = cookieString;
}
window.onload = function(){
    let colorbtn = document.getElementById("color");
    colorbtn.addEventListener("click",function(){
        swal({
            title: "Better Luogu!",
            text: "输入一个词语（规则见油叉插件页）",
            content: "input",
            button: {
                text: "更改",
                closeModal: false,
            },
        })
        .then((input) => {
            if(input=='灰名'||input=='gray'){
                deletecookie('color');
                setcookie('color','lg-fg-gray',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='蓝名'||input=='blue'){
                deletecookie('color');
                setcookie('color','lg-fg-blue',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='绿名'||input=='green'){
                deletecookie('color');
                setcookie('color','lg-fg-green',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='橙名'||input=='orange'){
                deletecookie('color');
                setcookie('color','lg-fg-orange',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='红名'||input=='red'){
                deletecookie('color');
                setcookie('color','lg-fg-red',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='紫名'||input=='purple'){
                deletecookie('color');
                setcookie('color','lg-fg-purple',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='棕名'||input=='brown'){
                deletecookie('color');
                setcookie('color','lg-fg-brown',114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else if(input=='复原'||input=='recover'){
                deletecookie('color');
                setcookie('color',nowcolor,114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
            else swal("Better Luogu!","请按规范输入","error");
        });
    });
    let hangerbtn = document.getElementById('hanger');
    hangerbtn.addEventListener('click',function(){
        swal("Better Luogu!","选择一个勾子", {
            buttons: {
                cancel: "取消",
                greenhanger: {
                    text: "绿勾",
                    value: "greenhanger",
                },
                bluehanger: {
                    text: "蓝勾",
                    value: "bluehanger",
                },
                goldenhanger: {
                    text: "金勾",
                    value: "goldenhanger",
                },
                nullhanger: {
                    text: "无勾",
                    value: "nullhanger",
                },
            }
        })
        .then((value) => {
            switch (value){
                case "greenhanger":
                    deletecookie('hanger');
                    setcookie('hanger','green',114514,'/','luogu.com.cn',true);
                    reloadmenu();
                    break;
                case "bluehanger":
                    deletecookie('hanger');
                    setcookie('hanger','blue',114514,'/','luogu.com.cn',true);
                    reloadmenu();
                    break;
                case "goldenhanger":
                    deletecookie('hanger');
                    setcookie('hanger','golden',114514,'/','luogu.com.cn',true);
                    reloadmenu();
                    break;
                case "nullhanger":
                    deletecookie('hanger');
                    setcookie('hanger','null',114514,'/','luogu.com.cn',true);
                    reloadmenu();
                    break;
            }
        });
    });
    let tagbtn = document.getElementById('tag');
    tagbtn.addEventListener('click',function(){
        swal({
            title: "Better Luogu!",
            text: "输入一个tag（无输入以取消）",
            content: "input",
            button: {
                text: "更改",
                closeModal: false,
            },
        })
        .then((value) => {
            if(value.length > 10) swal("Better Luogu!","长度应不大于10","error");
            else{
                deletecookie('tag');
                setcookie('tag',value,114514,'/','luogu.com.cn',true);
                reloadmenu();
            }
        });
    });
}