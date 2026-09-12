(function () {
  function bind() {
    var btn = document.getElementById("btn-see-us");
    if (!btn) return;
    if (btn.parentElement !== document.body) document.body.appendChild(btn);
    var lock = 0;
    function open() {
      var now = Date.now();
      if (now - lock < 500) return;
      lock = now;
      if (typeof window.claireOpenAlbum === "function") window.claireOpenAlbum();
    }
    btn.onclick = function (e) {
      if (e) e.stopPropagation();
      open();
    };
    btn.ontouchend = function (e) {
      if (e && e.cancelable) e.preventDefault();
      if (e) e.stopPropagation();
      open();
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
