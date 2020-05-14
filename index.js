const fs = require("fs");
const express = require("express");
const SteamAPI = require("steamapi");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

steam = new SteamAPI("E66E1E5132F5A2056AB272FC6D47180F");
var app = express();

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  console.log(req.url);
  let server = req.query.p || "default";
  let steamid = req.query.steamid;
  let mapname = req.query.mapname || "beach";

  get_picture_links(server, function (links) {
    // get list with links of the pictures
    get_steam_data(steamid, function (steam_d) {
      // get steam data like nick, avatar, ...
      get_player_info(steamid, server, function (user) {
        // get player info, like rank, from db
        res.render("index", {
          // send user data with a handlebars template
          p_links: JSON.stringify(links),
          steam: steam_d,
          rank: user.rank,
          mapname: mapname,
          dir_name: JSON.stringify(server),
        });
      });
    });
  });
});

app.use("/", express.static("public"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});

//http://localhost:5000/steam/?steamid=76561198175267558

function get_picture_links(dir, callback) {
  fs.readdir("public/bilder/" + dir, function (err, files) {
    if (err) {
      if (err.code == "ENOENT") {
        // ENOENT: no such file or directory
        callback(null);
        return;
      }
    }
    callback(files);
  });
}

function get_steam_data(id, callback) {
  let steam_data = {};
  steam
    .getUserSummary(id)
    .then((summary) => {
      steam_data["avatar"] = summary.avatar.large;
      steam_data["nick"] = summary.nickname;
      steam_data["id"] = id;

      callback(steam_data);
    })
    .catch((error) => {
      console.log(error);
      callback({});
    });
}
function get_player_info(steamid, server, callback) {
  if (typeof server != "string") {
    return;
  }
  const client = new MongoClient(
    "mongodb+srv://Tim:7O2zJ7oJYBfQjnLG@cluster0-1iia4.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db("user-info").collection(server); // fetch user data for the requested server

    collection.find({ id: steamid }).toArray(function (err, user) {
      if (err) throw err;
      client.close();
      callback(user[0] || {}); //return first element of list (dict). If the list is empty, a empty dict is returned.
    });
  });
}
