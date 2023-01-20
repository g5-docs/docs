import{_ as s,c as n,o as a,d as l}from"./app.b93e8232.js";const u=JSON.parse('{"title":"플러그인 (extend)","description":"","frontmatter":{},"headers":[{"level":3,"title":"extend 폴더 이용하기","slug":"extend-폴더-이용하기","link":"#extend-폴더-이용하기","children":[]},{"level":3,"title":"plugin 폴더로 더 확장하기","slug":"plugin-폴더로-더-확장하기","link":"#plugin-폴더로-더-확장하기","children":[]},{"level":2,"title":"이름 중복 문제 피하기","slug":"이름-중복-문제-피하기","link":"#이름-중복-문제-피하기","children":[]}],"relativePath":"developers/extend.md","lastUpdated":1674254694000}'),p={name:"developers/extend.md"},e=l(`<h1 id="플러그인-extend" tabindex="-1">플러그인 (extend) <a class="header-anchor" href="#플러그인-extend" aria-hidden="true">#</a></h1><p><code>/extend</code> 폴더에 <code>*.php</code> 파일을 두면 자동으로 include 한다.</p><p><code>/plugin</code> 폴더도 있지만 이곳에 있는 파일들을 자동으로 로드하거나 호출하지 않는다. plugin 폴더에는 JS, PHP 라이브러리들이 이미 몇 가지 포함되어 있고 필요 시 이것들을 사용하고 있다.</p><p>플러그인을 위한 인터페이스는 따로 없고 <code>/extend</code> 폴더에 파일을 넣으면 include 해주는 것과 <a href="/docs/developers/hook.html">Hook</a>을 이용해 기능을 확장할 수 있다.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>다른 CMS나 프레임워크 등에서 가리키는 플러그인에 기대하는 것과는 많이 다르다. plugin 폴더는 라이브러리들을 모아둔 폴더일 뿐이고 <code>/extend</code> 폴더에 있는 파일을 로드해줄 뿐이다.</p><p><code>/lib</code> 폴더에는 그누보드의 내장 라이브러리, <code>/plugin</code> 폴더에는 외부에서 가져온 라이브러리라고 봐도 틀리지 않다.</p></div><h3 id="extend-폴더-이용하기" tabindex="-1">extend 폴더 이용하기 <a class="header-anchor" href="#extend-폴더-이용하기" aria-hidden="true">#</a></h3><p><code>/extend</code> 폴더에 <code>*.php</code> 파일을 만들면 그누보드가 동작 시 파일을 자동으로 include하며 즉시 실행 된다.</p><p><code>.php</code> 확장자인 PHP 파일이면 되지만 관습을 따라 <code>*.extend.php</code>와 같은 파일명을 사용하자.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-5xkBb" id="tab-9kk6sJa" checked="checked"><label for="tab-9kk6sJa">/extend/my_plugin.extend.php</label></div><div class="blocks"><div class="language-php active"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">add_event</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tail_sub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myPluginListenerTailSub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">myPluginListenerTailSub</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></div></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>파일명으로 로드 순서가 결정된다.</p><p>extend 폴더에 있는 파일명을 <a href="https://www.php.net/manual/en/function.natsort.php" target="_blank" rel="noreferrer"><code>natsort()</code></a> 함수로 정렬한 후 로드한다. 다른 확장보다 먼저 로드해야한다면 파일명을 변경해서 순서를 조정할 수 있다.</p></div><h3 id="plugin-폴더로-더-확장하기" tabindex="-1">plugin 폴더로 더 확장하기 <a class="header-anchor" href="#plugin-폴더로-더-확장하기" aria-hidden="true">#</a></h3><p><code>extend</code> 폴더에 파일 하나만 두면 되지만 구현할 기능이 커져 파일을 나누거나 JS, CSS 및 이미지 파일 등을 모두 담아야할 때는 plugin 폴더에 두는 게 좋다.</p><p>extend 폴더에서 PHP 파일을 나눠야 한다면 따로 include 되므로 폴더를 만들어 나눠야하는데 역시 관습을 따라 extend 폴더에 두지않고 plugin 폴더로 분리하는 게 좋다.</p><p>앞에서 만든 <code>/extend/my_plugin.extend.php</code> 파일을 분리해보자.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-D3t2R" id="tab-gxICk0O" checked="checked"><label for="tab-gxICk0O">/extend/my_plugin.extend.php</label></div><div class="blocks"><div class="language-php active"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-palenight has-diff"><code><span class="line diff remove"><span style="color:#82AAFF;">add_event</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tail_sub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myPluginListenerTailSub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">);</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff remove"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">myPluginListenerTailSub</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff remove"><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff remove"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ... </span></span>
<span class="line diff remove"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff add"><span style="color:#89DDFF;font-style:italic;">include_once</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../plugin/my_plugin/bootstrap.php</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div></div></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-R0eRy" id="tab-ZT9y2yW" checked="checked"><label for="tab-ZT9y2yW">/plugin/my_plugin/bootstrap.php</label><input type="radio" name="group-R0eRy" id="tab-tGNgr-d"><label for="tab-tGNgr-d">/plugin/my_plugin/assets/css/style.css</label></div><div class="blocks"><div class="language-php active"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># /plugin/my_plugin/bootstrap.php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// CSS 파일 로드</span></span>
<span class="line"><span style="color:#82AAFF;">add_stylesheet</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&lt;link rel=&quot;stylesheet&quot; href=&quot;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;"> G5_PLUGIN_URL </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/my_plugin/assets/css/style.css&quot; /&gt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Hook 리스너 등록</span></span>
<span class="line"><span style="color:#82AAFF;">add_event</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tail_sub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myPluginListenerTailSub</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">myPluginListenerTailSub</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">my-element</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  // ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></div></div><details class="details custom-block"><summary>폴더를 펼쳐보면</summary><div class="language-plain"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki material-palenight has-highlighted-lines"><code><span class="line"><span style="color:#A6ACCD;">├── extend</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">│   └── my_plugin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">extend</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">php </span></span>
<span class="line"><span style="color:#A6ACCD;">└── plugin</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── my_plugin</span></span>
<span class="line"><span style="color:#A6ACCD;">        ├── assets</span></span>
<span class="line"><span style="color:#A6ACCD;">        │   └── css</span></span>
<span class="line"><span style="color:#A6ACCD;">        │      └── style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">css</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">        └── my_plugin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">extend</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">php </span></span>
<span class="line"></span></code></pre></div></details><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>plugin 폴더로 파일을 분리했다면 extend 폴더에 있는 파일은 최소한의 코드만 담는 게 좋다.</p><p>extend, plugin 폴더가 서로 분리되어있기 때문에 양쪽 파일을 모두 관리하기는 귀찮고 플러그인을 배포할 때도 두 파일을 모두 업데이트하기 귀찮아진다.</p><p><code>my_plugin.extend.php</code> 파일의 예시처럼 <code>include_once</code> 구문이나 최소한의 버전 체크 등의 코드만 두는 게 좋다.</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// PHP 7.4 미만에서는 동작하지 않으니 return</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">version_compare</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">phpversion</span><span style="color:#89DDFF;">(),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">7.4</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&lt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">))</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 앞에서 return 했으으로 PHP 7.4 미만에서는 로드하지 않는다</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">include_once</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../plugin/my_plugin/bootstrap.php</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>플러그인이 특정 PHP 버전 이상에서만 동작해야할 때 구문 오류를 내지않고 플러그인 동작을 멈출 수 있다.</p></div><h2 id="이름-중복-문제-피하기" tabindex="-1">이름 중복 문제 피하기 <a class="header-anchor" href="#이름-중복-문제-피하기" aria-hidden="true">#</a></h2><p>이러한 확장 방법을 사용하다보면 변수나 함수의 이름이 중복될 수 있다. 글로벌 스코프에서 동작하기 때문이다. 클래스 이름이나 <code>*.extend.php</code> 파일 및 플러그인 폴더의 이름도 마찬가지다.</p><p>앞의 예시에서 <code>myPluginListenerTailSub()</code> 이름을 사용한 것처럼 함수 이름 앞에 자신만의 특정한 이름을 붙여 사용하는 게 좋다. 또는, <code>onTailSub_82f12ff9()</code>, <code>$result_82f12ff9</code> 이처럼 이름을 간략하게 짓고 임의의 난수를 뒤에 붙여쓰는 등 중복을 피하도록 노력해야한다.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>모든 함수나 변수 이름에 이런 규칙을 사용할 필요는 없다. 글로벌 스코프에 노출되는 것에 주의하자는 것이다.</p></div><p>이름이 겹치면 다른 플러그인이나 그누보드의 주요 동작을 방해할 수 있고, 내 플러그인이 영향을 받을 수 있으므로 방어적으로 작성하는 게 좋다.</p><p><a href="https://www.php.net/manual/en/language.namespaces.rationale.php" target="_blank" rel="noreferrer">Namespace</a>를 적극 활용하자. PHP 5.3(2014년 출시)부터 지원한다.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>이름 중복문제를 피하고 <a href="/docs/developers/security.html#오염된-글로벌-변수">오염된 글로벌 변수</a> 문제에서 벗어나기위해 아래와 같이 include하는 파일이 글로벌 스코프의 영향을 받지 않도록 간단한 방법을 사용할 수 있다(PHP 7 버전 이상).</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">include_once</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../plugin/my_plugin/bootstrap.php</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">})();</span></span>
<span class="line"></span></code></pre></div></div>`,25),o=[e];function t(c,i,r,d,y,D){return a(),n("div",null,o)}const C=s(p,[["render",t]]);export{u as __pageData,C as default};
