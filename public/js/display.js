server = document.getElementsByClassName("server-i");
user = document.getElementsByClassName("user");
servername_h = document.getElementById("logo");
load = document.getElementsByClassName("load");
user_img = document.getElementById("player_img");
if (servername_h.innerHTML.length > 12) {
  servername_h.style.fontSize = "25px";
}
function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  servername_h.innerHTML = servername;

  if (servername_h.innerHTML.lenght > 12) {
    servername.style.fontSize = "25px";
  }

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
      document.getElementsByClassName("user")[0].innerHTML = v[1]; //name
      document.getElementsByClassName("user")[1].innerHTML = v[2]; //id
      document.getElementsByClassName("user")[2].innerHTML = v[3]; // logoff
    }
  });
}
function DownloadingFile(fileName) {
  load[0].innerHTML = "Getting Addon " + fileName;
}
function SetStatusChanged(status) {
  load[1].innerHTML = status;
}
