const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const sql = require("mssql");

const config = {
  user: "sa",
  password: "TonamaMiriki",
  server: "DESKTOP-EFGDU03\\SQLDIEP",
  database: "BTLWEB",
  options: {
    trustServerCertificate: true, // fix lỗi self-signed certificate
  },
};

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUsers = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null)
      return done(null, false, { message: "No user found with that email!" });
    try {
      // console.log(password + " " + user.Password);
      const match = await bcrypt.compare(password, user.Password);
      if (match) {
        // if (password.localeCompare(user.password) === 0) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateUsers)
  );
  passport.serializeUser((user, done) => done(null, user.ID));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
