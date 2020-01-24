
var friendsData = require("../data/friends");


module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });




  app.post("/api/friends", function (req, res) {

    var newFriend = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;
    var count = 0;

    for (var i = 0; i < friendsData.length; i++) {
      var totalDiff = 0;

      for (var j = 0; j < newFriend.length; j++) {

        totalDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriend[j])));

      }

      scoresArray.push(totalDiff);
    }

    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[bestMatch]) {
        bestMatch = i;
      }
    }

    var yourMatch = friendsData[bestMatch];
    res.json(yourMatch);
    friendsData.push(req.body);
  });
}