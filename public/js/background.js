let f = 1;
let s = 2;
let curl = window.location.href.split("?")[0]; // current url

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}
var dir = parse_query_string(window.location.search.substring(1)).p;
if (dir == undefined) {
  dir = "default";
}
function switch_p(pictures) {
  // check if path is valid, if its not a error screen is displayed
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
      .addClass("show")
      .addClass("fade");

    setTimeout(() => {
      switch_p(pictures);
    }, time_b * 1000);
  });
}
console.log(links);
switch_p(links);
