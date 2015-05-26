# <a href=";;">aAjax</a>

<h2>Introduction</h2>
<p>A plugin for ajax, including JSONP, you may use it just like jQuery ajax.</p>

<h2>Usage</h2>
<h3>Including file:</h3>
<div class='highlight highlight-html'>
  <pre>
    <code><<span class="pl-ent">script</span> <span class="pl-e">src</span>=<span class="pl-s"><span class="pl-pds">"</span>../aAjax.min.js<span class="pl-pds">"</span></span>></<span class="pl-ent">script</span>></code>
  </pre>
</div>
<h3>JS code</h3>
<strong>Grammar</strong>

<p><pre><code>
    aAjax([settings]) // settings : not required( to set the AJAX params by Key-Value ).
    
</code></pre></p>
<p>A simple <strong>AJAX</strong> demo:</p>
<div>
  <pre>
    <code>
    aAjax({
            type : "get",//or "post"
            url : "xxx.php",
            data : {id:111, name:"lucy"},
            success : function(result){
                      console.log(result);
                    },
            error : function(){a
                      lert("error");
                    })
    </code>
  </pre>
</div>
<p>A simple <strong>JSONP</strong> demo:</p>
<div>
  <pre>
    <code>
    aAjax({
            url : "xxx.php",
            data : {id:111, name:"lucy"},
            success : function(result){
                      console.log(result);
                    },
            error : function(){a
                      lert("error");
                    },
            dataType : "jsonp", //must be "jsonp"
            jsonp : "cb"})
    </code>
  </pre>
</div>
<h3>More Parameters</h3>
<strong>async</strong>
<pre><code>类型：Boolean
默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。</code>
</pre>

<strong>data</strong>
<pre><code>类型：String
发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。
如果为数组，jQuery 将自动为不同值对应同一个名称。
如 {foo:["bar1", "bar2"]} 转换为 '&foo[0]=bar1&foo[1]=bar2'。</code>
</pre>

<strong>dataType</strong>
<pre><code>类型：String
默认值: "text"。预期服务器返回的数据类型。
可用值如下：
  "xml" : 返回xml文档
  "json" : 返回JSON数据
  "jsonp" : 应用JSONP 格式
  "text" : 返回纯文本字符串
</code>
</pre>

