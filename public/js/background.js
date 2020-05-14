let f = 1;
let s = 2;
let curl = window.location.href.split("?")[0]; // current url

function switch_p(pictures) {
  // check if path is valid, if its not a error screen gets displayed
  if (pictures == null) {
    var full = curl + "bilder/invalid.jpg";
    $(".background:nth-child(" + f + ")")
      .attr("src", full)
      .addClass("show")
      .addClass("fade");
    return;
  }
  let single = pictures[Math.round(Math.random() * (pictures.length - 1))];
  var full = curl + "bilder/" + dir + "/" + single;
  temp = f;
  f = s;
  s = temp;

  var $img = $('<img src="' + full + '">');
  $img.bind("load", function () {
    $(".background:nth-child(" + s + ")")
      .removeClass("fade")
      .addClass("fade-away");
    $(".background:nth-child(" + f + ")")
      .attr("src", full)
      .removeClass("fade-away")
      .addClass("fade");

    setTimeout(() => {
      switch_p(pictures);
    }, time_b * 1000);
  });
}
switch_p(links);
