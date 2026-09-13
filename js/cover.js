(function () {
  var opening = false;

  function goStory() {
    if (opening) return;
    opening = true;
    var book = document.querySelector(".cover-book-3d");
    if (book) book.classList.add("is-opening");
    if (window.ClaireAlbum && window.ClaireAlbum.open) window.ClaireAlbum.open("story");
    window.setTimeout(function () {
      opening = false;
    }, 800);
  }

  function isCover() {
    return document.documentElement.getAttribute("data-screen") === "cover";
  }

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target;
      if (!el || !el.closest) return;
      if (el.closest("#btn-open-story, [data-action=open-story]")) {
        goStory();
        return;
      }
      if (!isCover()) return;
      if (el.closest(".nav-pills, .lang-toggle, .like-btn, #password-gate")) return;
      if (el.closest("#view-cover")) goStory();
    },
    true
  );
})();
