;(function () {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    tid,
    currentScript = document.currentScript

  if (!currentScript) {
    var els = document.getElementsByTagName('script')
    for (var i = 0, el; (el = els[i++]); ) {
      if (el.readyState === 'interactive') {
        currentScript = el
      }
    }
  }
  var designWidth = currentScript.dataset.designWidth || 750
  var maxWidth = currentScript.dataset.maxWidth
  var minWidth = 320
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    if (maxWidth) {
      width > maxWidth && (width = maxWidth)
    }
    width < minWidth && (width = minWidth)
    var rem = (width * 100) / designWidth
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;} body{font-size:16px}'
  }
  // 尽可能往前插入remStyle,第一选择head
  if (document.head) {
    document.head.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  //要等 viewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；

  refreshRem()

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid) //防止执行两次
      tid = setTimeout(refreshRem, 30)
    },
    false
  )

  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 30)
      }
    },
    false
  )
})()
