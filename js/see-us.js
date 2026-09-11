(function () {
  var last = 0;
  function open() {
    var now = Date.now();
    if (now - last < 500) return;
    last = now;
    if (typeof window.claireOpenAlbum === "function") window.claireOpenAlbum();
  }
  function bind() {
    var btn = document.getElementById("btn-see-us");
    if (!btn) return;
    if (btn.parentElement !== document.body) document.body.appendChild(btn);
    btn.onclick = open;
    btn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        open();
      },
      { passive: false }
    );
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
