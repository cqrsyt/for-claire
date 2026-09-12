(function () {
  function bind() {
    var btn = document.getElementById("btn-see-us");
    if (!btn) return;
    if (btn.parentElement !== document.body) document.body.appendChild(btn);
    btn.onclick = function () {
      if (window.claireOpenAlbum) window.claireOpenAlbum();
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
