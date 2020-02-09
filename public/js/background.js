console.log(window.location.href);

pictures_url = window.location.href.replace("index.html", "bilder/");
background = document.body.style.backgroundImage;
console.log(pictures_url);

//http://127.0.0.1:5500/Lasse-GM/bilder/scp-13460002.jpg

var folder = "bilder/";

function switch_p(pictures) {
  let single = pictures[Math.round(Math.random() * pictures.length - 1)];
  let full = window.location.href + "bilder/" + single;

  var $img = $('<img src="' + full + '">');
  console.log(full);
  $img.bind("load", function() {
    setTimeout(() => {
      switch_p(pictures);
    }, time_b * 1000);
  });
}
$.ajax({
  url: folder,
  success: function(data) {
    console.log(data);
    switch_p(data);
  }
});
