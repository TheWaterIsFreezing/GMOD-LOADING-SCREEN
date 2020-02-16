let f = 1;
let s = 2;

function switch_p(pictures) {
  let single = pictures[Math.round(Math.random() * pictures.length - 1)];
  let full = window.location.href + "bilder/" + single;

  temp = f;
  f = s;
  s = temp;

  var $img = $('<img src="' + full + '">');
  $img.bind("load", function() {
    $(".background:nth-child(" + s + ")")
      .removeClass("fade")
      .addClass("fade-away");
    $(".background:nth-child(" + f + ")")
      .attr("src", full)
      .removeClass("fade-away")
      .addClass("show")
      .addClass("fade");

    setTimeout(() => {
      switch_p(pictures);
    }, time_b * 1000);
  });
}
$.ajax({
  url: folder,
  success: function(data) {
    switch_p(data);
  }
});
