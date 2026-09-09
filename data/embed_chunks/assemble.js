window.ALBUM_EMBEDS=window.ALBUM_EMBEDS||[];
(function(){
  var ec = window.__EC || [];
  for (var i = 0; i < ec.length; i++) {
    if (!ec[i] || !ec[i].length) continue;
    window.ALBUM_EMBEDS[i] = ec[i].join("");
  }
})();
