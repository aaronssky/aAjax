/**
 * Created on 2015/04/23
 * author aron_阿伦
 * QQ:398155437
 * [aAjax 封装ajax和jsonp，用法类似jQuery的ajax]
 */
(function(window,undefined){
    function creatXHR(){
        var xhr = null;
        try {
            //IE系列浏览器
            xhr = new ActiveXObject("microsoft.xmlhttp");
        } catch (e1) {
            try {
                //非IE浏览器
                xhr = new XMLHttpRequest();
            } catch (e2) {
                window.alert("您的浏览器不支持ajax，请更换！");
            }
        }
        return xhr;
    }

    function setConfig(config){
        var ajaxSettings = {
            type : "get",
            url : "",
            data : "",
            processData: true,
            dataType : "text",
            contentType: "application/x-www-form-urlencoded",
            async : true,
            success : function(data){
                console.log("默认成功回调事件");
            },
            error : function(data){
                console.log("默认失败回调事件");
            },
            timeout : 0,
            jsonp : "",
            jsonpCallback : ""
        };
        for(var key in ajaxSettings){
            if( key in config && typeof ajaxSettings[key] == typeof config[key])
            {
                ajaxSettings[key] = config[key];
            }
        }
        //ajaxSettings.data = formatAjaxData(ajaxSettings.processData, config.data);
        if(ajaxSettings.processData)
        {
            if( typeof config.data == "object")
            {
                ajaxSettings.data = formatAjaxData(config.data);
            }
            
        }
        return ajaxSettings;
    }

    //递归格式化Object类型data
    function formatAjaxData(oriData)
    {
        var prefix = "",_arr=[],oriPrefix;
        if(arguments[1] != undefined && typeof arguments[1] === "string"){
            prefix = arguments[1];
        }
        if(arguments[2] != undefined && arguments[2] instanceof Array){
            _arr = arguments[2];
        }
        oriPrefix = prefix;
        if(typeof oriData === "object")
        {   
            for(var key in oriData)
            {
                prefix = oriPrefix;
                if(typeof oriData[key] != "object"){
                    if(prefix == ""){
                        _arr[_arr.length] = key + "=" + oriData[key];
                    }
                    else
                    {
                        _arr[_arr.length] = prefix +"[" + key + "]" + "=" + oriData[key];
                    }
                }
                else
                {
                    if(prefix == "")
                    {
                        prefix = key;
                    }
                    else
                    {
                        prefix = prefix +"[" + key + "]";
                    }
                    formatAjaxData(oriData[key],prefix,_arr);
                }
            }
        }
        return encodeURI(_arr.join("&"));
    }

    function readyStateChange(config){
        var xhr = this;
        var success = config.success;
        var dataType = config.dataType;
        var error = config.error;
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                if(dataType.toUpperCase()=="XML") {
                    if (success != null){
                        //接收xml文档
                        success(xhr.responseXML);
                    }  
                }else if(dataType.toUpperCase()=="JSON") {
                    if (success != null){
                        //将json字符串转换为js对象
                        success(eval("("+xhr.responseText+")"));
                    }
                }else{
                    if (success != null){
                        //普通文本
                        success(xhr.responseText);
                    }
                }
            }
            else
            {
                error(xhr,"error",xhr.status);
            }
            clearTimeout( config.timer );
        }
    }

    function setAjaxTimeout(xhr,config){
        var statusText = "timeout", errorMsg = "timeout";
        config.timer = setTimeout(function(){
            xhr.abort();
            config.error(xhr,statusText,errorMsg);
        },config.timeout);
    }

    

    //ajax请求
    function openAjax(settings){
        var type = settings.type;

        var url = settings.url;

        var data = settings.data;

        var dataType = settings.dataType;

        var success = settings.success;

        var async = settings.async;

        // 创建ajax引擎对象
        var xhr = creatXHR();
        window["xhr"] = xhr;
        xhr.onreadystatechange = function() {
            readyStateChange.call(xhr,settings);
        };

        //是否设置超时
        if(settings.timeout != 0)
        {
           setAjaxTimeout(xhr,settings);
        }

        if (type.toUpperCase() == "GET") {
            xhr.open(type, !!data?url + (url.indexOf("?")!= -1?(url[url.length-1]=="?"?"":"&"):"?") + data : url, async);
            xhr.send(null);
        } else if (type.toUpperCase() == "POST") {
            xhr.open(type, url, async);
            xhr.setRequestHeader("content-type",
                        "application/x-www-form-urlencoded");
            xhr.send(data);
        }
    }

    //jsonp请求
    function openJsonp(settings){
        var url = settings.url;
        var cbName = settings.jsonp;
        var callbackName =  !!settings.jsonpCallback?settings.jsonpCallback : (function getName(index){
            //防止加载时间相同时候生成重复函数名，造成一旦delete后会报错
            var fnName = "aJsonp_" + new Date().getTime()+"_"+index;
            if(!!window[fnName])
            {
                index++;
                return getName(index);
            }
            return fnName;
        })(0);
        var cbStr = cbName + "=" + callbackName;
        var data = settings.data;
        var connectChar = (url.indexOf("?")!= -1?(url[url.length-1]=="?"?"":"&"):"?");
        var finalUrl = (!!data?url + connectChar + data + "&" + cbStr: url + connectChar + cbStr);
        var fn_cb,jsonpData = {};
        if(!!settings.jsonpCallback)
        {
            fn_cb = window[settings.jsonpCallback];
        }
        function _callback(data){
            if(!!fn_cb && typeof fn_cb === "function")
            {
                fn_cb(data);
                window[callbackName] = fn_cb;
            }else{
                //删除无填写jsonpCallback参数或者有填写但没同名全局方法时候创建的全局方法
                delete window[callbackName];
            }
            jsonpData = data;
        }

        window[callbackName] = _callback;
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.onload = script.onreadystatechange = function(){
            if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                script.onload = script.onreadystatechange = null;//避免IE9,10会触发2次,若放后面，alert会重复触发
                settings.success(jsonpData);
            }
        }
        script.onerror =  function(msg,url,l){
            settings.error(msg,url,l);
            return true;
        }
        script.setAttribute('src', finalUrl);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function aAjax(config) {
        var settings = setConfig(config);
        if(settings.dataType.toUpperCase() != "JSONP"){
            openAjax(settings);
        }
        else{
            openJsonp(settings);
        }
    };

    window.aAjax = aAjax;
})(window,undefined);