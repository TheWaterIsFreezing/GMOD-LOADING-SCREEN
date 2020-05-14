server = document.getElementsByClassName("server-i");
logo = document.getElementById("logo");
load = document.getElementsByClassName("load");

function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  servername = filter_servername(servername);
  logo.innerHTML = servername;
  while (smaller_text() == true) {
    smaller_text();
  }

  server[0].innerHTML = gamemode;
  server[2].innerHTML = maxplayers + " Slots";
}
function DownloadingFile(fileName) {
  load[0].innerHTML = "Getting Addon " + fileName;
}
function SetStatusChanged(status) {
  load[1].innerHTML = status;
}

function filter_servername(name) {
  // makes long titles short based on the dictionary in the index.hbs file
  let splitted = name.split(" ");
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i] in server_names) {
      name = server_names[splitted[i]];
      break;
    }
  }
  return name;
}
function smaller_text() {
  item = document.getElementById("logo");

  //Adjust size of Header to the available width
  if (
    document.getElementsByClassName("container")[0].offsetWidth <
    item.offsetWidth + 10 // margin here
  ) {
    fontSize = parseFloat(
      window.getComputedStyle(logo, null).getPropertyValue("font-size")
    );
    item.style.fontSize = fontSize - 1 + "px";
    return true;
  }
  return false;
}
