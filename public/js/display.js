server = document.getElementsByClassName("server-i");
user = document.getElementsByClassName("user");
servername = document.getElementsByClassName("logo");
load = document.getElementsByClassName("load");
user_img = document.getElementById("player_img");

function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  servername[0].innerHTML = servername;
  server[0].innerHTML = gamemode;
  server[1].innerHTML = mapname;
  server[2].innerHTML = maxplayers + " Slots";

  user[1].innerHTML = steamid;
  $.ajax({
    url: "steam/",
    data: "steamid=" + steamid,
    success: function(data) {
      v = data.split(";");
      $("#player_img").attr("src", v[0]);
      console.log(v);
    }
  });
}
//var steamid = "76561198175267558";
console.log(load);
function DownloadingFile(fileName) {
  load[3].innerHTML = fileName;
}
function SetStatusChanged(status) {
  load[1].innerHTML = "Getting Addon " + status;
}
