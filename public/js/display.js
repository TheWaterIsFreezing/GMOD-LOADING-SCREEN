server = document.getElementsByClassName("server-i");
user = document.getElementsByClassName("user");
servername_h = document.getElementById("logo");
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
  servername = filter_servername(servername);
  servername_h.innerHTML = servername;

  if (servername_h.innerHTML.length > 20) {
    servername_h.style.fontSize = "30px";
  } else if (servername_h.innerHTML.length > 40) {
    servername_h.style.fontSize = "25px";
  }
  while (smaller_text("logo") == true) {
    smaller_text("logo");
  }
  server[0].innerHTML = gamemode;
  server[1].innerHTML = mapname;
  server[2].innerHTML = maxplayers + " Slots";

  user[1].innerHTML = steamid;
  console.log(steamid);
  $.ajax({
    url: "steam/",
    data: "steamid=" + steamid,
    success: function(data) {
      v = data.split(";");
      $("#player_img").attr("src", v[0]);
      document.getElementsByClassName("user")[0].innerHTML = v[1]; //name
      document.getElementsByClassName("user")[1].innerHTML = "ID: " + v[2]; //id
      //document.getElementsByClassName("user")[2].innerHTML = v[3]; // logoff
    }
  });
}
function filter_servername(name) {
  let splitted = name.split(" ");
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i] in server_names) {
      name = server_names[splitted[i]];
      break;
    }
  }
  return name;
}
function smaller_text(id) {
  item = document.getElementById(id);

  //Adjust size of Header to the available width
  if (
    document.getElementsByClassName("container")[0].offsetWidth <
    item.offsetWidth + 10
  ) {
    fontSize = parseFloat(
      window.getComputedStyle(servername_h, null).getPropertyValue("font-size")
    );
    item.style.fontSize = fontSize - 1 + "px";
    return true;
  }
  return false;
}
function DownloadingFile(fileName) {
  load[0].innerHTML = "Getting Addon " + fileName;
}
function SetStatusChanged(status) {
  load[1].innerHTML = status;
}
