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
<pre>
async
    类型：Boolean
    默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
    注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
  <code>
  async
    类型：Boolean
    默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
    注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。</code>
</pre>
