(function () {
  function openCover() {
    var btn = document.querySelector("#view-cover [data-action=open-story]");
    if (btn) {
      btn.click();
      return;
    }
    if (window.ClaireAlbum) window.ClaireAlbum.open("story");
  }

  function bind() {
    var view = document.getElementById("view-cover");
    if (!view || view._coverTap) return;
    view._coverTap = true;
    view.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".nav-pills, .lang-toggle, .like-btn")) return;
      if (document.documentElement.getAttribute("data-screen") !== "cover") return;
      openCover();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
