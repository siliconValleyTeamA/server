var GitHubStrategy = require("passport-github").Strategy;
const { findUser, createUser } = require("../db/auth");
var auth = require("../auth.json");

const github = new GitHubStrategy(
  {
    clientID: auth.CLIENT_ID,
    clientSecret: auth.CLIENT_SECRET,
    callbackURL: auth.CALLBACK_URL,
  },

  async function (accessToken, refreshToken, user, done) {
    console.log(user);
    const result = await findUser({
      name: user.displayName,
      github_id: user.username ? user.username : "",
    });
    if (!result.length) {
      await createUser({
        name: user.displayName,
        github_id: user.username ? user.username : "",
        image: user.photos[0].value ? user.photos[0].value : "",
      });
    }
    return done(false, {
      name: user.displayName,
      github_id: user.username ? user.username : "",
      image: user.photos[0].value,
    });
  }
);

module.exports = { github };
