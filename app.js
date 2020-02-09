var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");
var url = require("url");
SteamAPI = require("steamapi");

const steam = new SteamAPI("steam-api-key");
console.log(steam);
steam.getUserSummary("76561198175267558").then(summary => {
  console.log(summary);
});
var app = express();
app.use("/", express.static("public"), function(req, res, next) {
  next();
});

app.get("/bilder/", function(req, res) {
  fs.readdir("public/bilder", function(err, files) {
    console.log(files);
    res.send(files);
  });
});

app.listen(process.en.PORT || 8080, () => {
  console.log("Server started");
});
