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
<div>
  <pre>
    <code>
    aAjax({
            url:"xxx.php",
            data:{id:111, name:"lucy"},
            success:function(result){
                      console.log(result);
                    },
            dataType:"json"})
    </code>
  </pre>
</div>
<pre>
  <code>133sd</code>
</pre>
