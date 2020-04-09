var fs = require("fs");
var express = require("express");
SteamAPI = require("steamapi");

steam = new SteamAPI("E66E1E5132F5A2056AB272FC6D47180F");
var app = express();
app.use("/", express.static("public"), function (req, res, next) {
  console.log("got request " + req.ip);
  next();
});

//http://localhost:5000/steam/?steamid=76561198175267558
app.get("/steam/", (req, res, next) => {
  var send = [];
  var id = req.query.steamid;
  steam.getUserSummary(id).then((summary) => {
    send.push(summary.avatar.large);
    send.push(summary.nickname);
    send.push(id);
    send.push(summary.lastLogOff);

    res.send(send.join(";"));
    next();
  });
});

app.get("/bilder/", function (req, res, next) {
  var dir = req.query.p; //fetch dir name from url

  fs.readdir("public/bilder/" + dir, function (err, files) {
    if (err) {
      if (err.code == "ENOENT") {
        // ENOENT: no such file or directory
        res.send("invalid path");
        next();
        return;
      }
    }
    res.send(files);
    next();
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
