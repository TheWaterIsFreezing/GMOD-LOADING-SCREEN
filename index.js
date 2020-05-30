const fs = require("fs");
const express = require("express");
const SteamAPI = require("steamapi");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

steam_api_key = "YOUR_STEAM_API_KEY";
steam = new SteamAPI(steam_api_key);
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
        // get player info, like the rank, from db
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
  var db_link = "YOUR_MONGO_DB";
  if (db_link == "YOUR_MONGO_DB") {
    callback({});
    return;
  }

  // if you want to add a mongodb for data from your server like a rank
  const client = new MongoClient(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
