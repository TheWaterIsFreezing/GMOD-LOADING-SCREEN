var fs = require("fs");
var express = require("express");
SteamAPI = require("steamapi");

steam = new SteamAPI("E66E1E5132F5A2056AB272FC6D47180F");
var app = express();
app.use("/", express.static("public"), function(req, res, next) {
  next();
});

app.get("/index.html", function(req, res, next) {
  next();
});
//http://localhost:5000/steam/?steamid=76561198175267558
app.get("/steam/", (req, res, next) => {
  var send = [];
  var id = req.query.steamid;
  steam.getUserSummary(id).then(summary => {
    send.push(summary.avatar.large);
    send.push(summary.nickname);
    send.push(id);
    send.push(summary.lastLogOff);
    res.send(send.join(";"));
    next();
  });
});

app.get("/bilder/", function(req, res, next) {
  fs.readdir("public/bilder", function(err, files) {
    res.send(files);
    next();
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
