(function() {
    'use strict'
    let nowurl = window.location.href;

    let nowcolor1;
    let nowcolor="";
    if(nowurl == 'https://www.luogu.com.cn/'){
        nowcolor1 = document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a').className;
        for(let i=0;i<nowcolor1.length;i++){
            if(nowcolor1[i]==' ') break;
            nowcolor = nowcolor + nowcolor1[i];
        }
    }

    function setcookie(name,value,days,path,domain,secure){
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

    function getcookie(name){
        const cookiestring = document.cookie;
        const cookies = cookiestring.split('; ');
        for(const cookie of cookies){
            const [cookiename, cookievalue] = cookie.split('=');
            if(cookiename === name) return cookievalue;
        }
        if(name == 'color'){
            setcookie('color',nowcolor,114514,'/','luogu.com.cn',true);
            return nowcolor;
        }
        else if(name == 'hanger'){
            setcookie('hanger','null',114514,'/','luogu.com.cn',true);
            return "null";
        }
        else if(name == 'version'){
            setcookie('version','1.0',114514,'/','luogu.com.cn',true);
            return "1.0";
        }
        else if(name == 'update'){
            setcookie('update','true',114514,'/','luogu.com.cn',true);
            return "true";
        }
        else if(name == 'background'){
            setcookie('background','null',114514,'/','luogu.com.cn',true);
            return "null";
        }
    }

    function deletecookie(name){
        document.cookie = name+ '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    function colorschange(changecolor){//emm，这个函数，额，可能要用吧
        if(changecolor == 'lg-fg-gray') return 'rgb\(191, 191, 191\)';
        else if(changecolor == 'lg-fg-blue') return 'rgb\(14, 144, 210\)';
        else if(changecolor == 'lg-fg-green') return 'rgb\(94, 185, 94\)';
        else if(changecolor == 'lg-fg-orange') return 'rgb\(230, 126 34\)';
        else if(changecolor == 'lg-fg-red') return 'rgb\(231, 76, 60\)';
        else if(changecolor == 'lg-fg-purple') return 'rgb\(142, 68, 173\)';
        else if(changecolor == 'lg-fg-brown') return 'rgb\(173, 139, 0\)';
    }

    function update(){
        swal("Better Luogu! 1.7.9","修复了不显示更新内容的bug",{
            buttons: {
                cancel: "取消",
                _continue: {
                    text: "继续",
                    value: "continue",
                },
            },
        })
        .then((value) => {
            if(value == "continue") swal("Better Luogu! 1.7.9","我什么时候把这个删了（bushi");
        });
    }

    let changecolor = getcookie('color');

    let tagchange = getcookie('tag');
    let tag = document.createElement("span");
    let tagcolor;
    if(changecolor != 'lg-fg-blue' && changecolor != 'lg-fg-orange'){
        tagcolor = changecolor.replace('fg','bg');
        tag.className = 'am-badge am-radius ' + tagcolor;
    }
    else if(changecolor == 'lg-fg-blue'){
        tagcolor = 'color-none';
        tag.className = 'am-badge am-radius ' + tagcolor;
        tag.style.background = 'rgb(52, 152, 219)';
    }
    else if(changecolor == 'lg-fg-orange'){
        tagcolor = 'color-none';
        tag.className = 'am-badge am-radius ' + tagcolor;
        tag.style.background = 'rgb(243, 156, 17)';
    }
    if(changecolor != 'lg-fg-brown') tag.textContent = tagchange;
    else tag.textContent = '作弊者';

    if(getcookie('version')!='1.7.9'&&nowurl=='https://www.luogu.com.cn/'){
        deletecookie('version');
        setcookie('version','1.7.9',114514,'/','luogu.com.cn',true);
        update();
    }

    //首页
    if(nowurl == 'https://www.luogu.com.cn/'){
        //日历
        const today=new Date();
        const year=today.getFullYear();
        const month=String(today.getMonth()+1);
        const day=String(today.getDate());
        let date_html='<h2>今天是 '+year+'-'+month+'-'+day+'</h2>';
        if(month==1&&day==1){
            date_html+='<h2>今天是元旦，新的一年，新的开始</h2>';
        }
        else if(month==2&&day==29){
            date_html+='<h2>今年是闰年</h2>';
        }
        else if(month==4&&day==1){
            date_html+='<h2>今天是愚人节</h2>';
        }
        else if(month==5&&day==1){
            date_html+='<h2>今天是劳动节</h2>';
        }
        else if(month==6&&day==1){
            date_html+='<h2>今天是儿童节</h2>';
        }
        else if(month==9&&day==10){
            date_html+='<h2>今天是教师节</h2>';
        }
        else if(month==10&&day==1){
            date_html+='<h2>今天是国庆节，七天小长假，启动！</h2>'
        }
        else if(month==12&&day==31){
            date_html+='<h2>明年见</h2>';
        }
        else date_html+='<h2>欢迎！</h2>';
        let date = document.createElement('div');
        date.className = 'lg-article';
        date.innerHTML = date_html;
        document.querySelector('div.lg-right > div:nth-child(1)').insertAdjacentElement('beforebegin', date);

        //更改用户名颜色
        let color = document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a');
        if(changecolor != 'null') color.className=changecolor;

        function removeDivWithText(text) {
            document.querySelectorAll('div').forEach(div => {
                if(div.textContent === text) div.remove();
            });
        }

        function findElement(element, text, cclass){
            document.querySelectorAll(element).forEach(E => {
                if(E.textContent === text) E.className = cclass;
            });
        }

        removeDivWithText('暂无推荐');
        removeDivWithText('洛谷根据您近期的做题情况，使用机器学习自动为您推荐符合您目前程度的题目。本列表每日更新一次。');

        
        
        let links = document.querySelector('.lg-article.am-hide-sm');
        links.insertAdjacentHTML('beforeend','<p><strong>Better Luogu!</strong><br><a href="https://www.volatiles.us.kg/" target="_blank">Better Luogu!</a><br><a href="https://greasyfork.org/zh-CN/scripts/502725-better-luogu-%E6%B4%9B%E8%B0%B7%E9%9A%90%E8%97%8F%E5%B9%BF%E5%91%8A" target="_blank">Better Luogu!-洛谷隐藏广告</a></p>');
    }
    window.onload=function(){
        let _hanger = getcookie('hanger');
        let __hanger = document.createElementNS('http://www.w3.org/2000/svg','svg');
        __hanger.setAttribute('width','16');
        __hanger.setAttribute('height','16');
        __hanger.setAttribute('viewBox','0 0 16 16');
        __hanger.setAttribute('style','margin-bottom: -3px;');
        if(_hanger == 'green')__hanger.setAttribute('fill','#5eb95e');
        else if(_hanger == 'blue') __hanger.setAttribute('fill','#3498db');
        else if(_hanger == 'golden') __hanger.setAttribute('fill','#f1c40f');
        if(_hanger != 'null'){
            let realhanger = document.getElementsByClassName('sb_amazeui')[0];
            if(realhanger != null) realhanger.remove();
        }

        let ___hanger = document.createElementNS('http://www.w3.org/2000/svg','path');
        ___hanger.setAttribute('d','M16 8C16 6.84375 15.25 5.84375 14.1875 5.4375C14.6562 4.4375 14.4688 3.1875 13.6562 2.34375C12.8125 1.53125 11.5625 1.34375 10.5625 1.8125C10.1562 0.75 9.15625 0 8 0C6.8125 0 5.8125 0.75 5.40625 1.8125C4.40625 1.34375 3.15625 1.53125 2.34375 2.34375C1.5 3.1875 1.3125 4.4375 1.78125 5.4375C0.71875 5.84375 0 6.84375 0 8C0 9.1875 0.71875 10.1875 1.78125 10.5938C1.3125 11.5938 1.5 12.8438 2.34375 13.6562C3.15625 14.5 4.40625 14.6875 5.40625 14.2188C5.8125 15.2812 6.8125 16 8 16C9.15625 16 10.1562 15.2812 10.5625 14.2188C11.5938 14.6875 12.8125 14.5 13.6562 13.6562C14.4688 12.8438 14.6562 11.5938 14.1875 10.5938C15.25 10.1875 16 9.1875 16 8ZM11.4688 6.625L7.375 10.6875C7.21875 10.8438 7 10.8125 6.875 10.6875L4.5 8.3125C4.375 8.1875 4.375 7.96875 4.5 7.8125L5.3125 7C5.46875 6.875 5.6875 6.875 5.8125 7.03125L7.125 8.34375L10.1562 5.34375C10.3125 5.1875 10.5312 5.1875 10.6562 5.34375L11.4688 6.15625C11.5938 6.28125 11.5938 6.5 11.4688 6.625Z');
        __hanger.appendChild(___hanger);
        let _hanger_ = document.createElement("a");
        _hanger_.href = 'https://www.luogu.com/discuss/142324';
        _hanger_.appendChild(__hanger);

        if(nowurl == 'https://www.luogu.com.cn/'){
            if(getcookie('hanger')!='null'){
                document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a').innerHTML += '&nbsp;';
                document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a').appendChild(_hanger_);
            }
            if(getcookie('tag')!=''){
                document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a').innerHTML += '&nbsp;';
                document.querySelector('#app-old > div.lg-index-content.am-center > div:nth-child(1) > div > div > div > div.am-u-md-4.lg-punch.am-text-center > h2 > a').appendChild(tag);
            }
        }
        else if(nowurl.includes('https://www.luogu.com.cn/user/')&&!nowurl.includes('https://www.luogu.com.cn/user/setting')){
            if(document.querySelector('#app > div.main-container > main > div > div.full-container > section.main > div > div:nth-child(2)').className == 'introduction marked') document.querySelector('#app > div.main-container > main > div > div.full-container > section.main > div > div:nth-child(2)').removeAttribute('style');
            else document.querySelector('#app > div.main-container > main > div > div.full-container > section.main > div > div:nth-child(2)').remove();
            let jieshao = document.querySelector('#app > div.main-container > main > div > div.full-container > section.main > div > div.introduction.marked');
            if(jieshao.style.display == 'none') jieshao.removeAttribute('style');
        }
    };
})();