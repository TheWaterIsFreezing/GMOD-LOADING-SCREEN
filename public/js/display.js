server = document.getElementsByClassName("server-i");
user = document.getElementsByClassName("user");
servername = document.getElementsByClassName("logo");
load = document.getElementsByClassName("load");

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
}
console.log(load);
function DownloadingFile(fileName) {
  load[3].innerHTML = fileName;
}
function SetStatusChanged(status) {
  load[1].innerHTML = "Getting Addon " + status;
}
