(function(){
  function get(u){var x=new XMLHttpRequest();x.open("GET",u,false);x.send(null);if(x.status&&x.status>=400)throw new Error(u+" "+x.status);return x.responseText;}
  var base=(function(){var s=document.querySelector('script[src*="data/album.js"]');if(!s)return"data/";var src=s.getAttribute("src");return src.replace(/album\.js(\?.*)?$/,"/");})();
  var t=get(base+"album_part_0.js")+get(base+"album_part_1.js")+get(base+"album_part_2.js");
  (0,eval)(t);
})();
