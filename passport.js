const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./models/usermodel');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  users.findOne(
    {
      username: username
    },
    (err, user) => {
      if (err) {
        return done(err);
      } else {
        return done(null, user);
      }
    }
  );
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    function(req, username, password, done) {
      username = username.split(' ').join('');
      process.nextTick(function() {
        users.findOne(
          {
            username: username
          },
          (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              users.create(
                {
                  username: username,
                  password: password,
                  views: 0
                },
                (err, user) => {
                  if (err) {
                    return done(err, req.flash('message', err));
                  }
                  return done(
                    null,
                    user,
                    req.flash('message', 'signed up successfully')
                  );
                }
              );
            } else {
              return done(
                null,
                false,
                req.flash('message', 'Username already in use')
              );
            }
          }
        );
      });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    function(req, username, password, done) {
      users.findOne(
        {
          username: username
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(
              null,
              false,
              req.flash('message', 'User does not exist')
            );
          } else {
            user
              .correctPassword(password, user.password)
              .then(res => {
                if (res === false) {
                  return done(
                    null,
                    false,
                    req.flash('message', 'incorrect password')
                  );
                } else {
                  return done(
                    null,
                    user,
                    req.flash('message', 'logged in successfully')
                  );
                }
              })
              .catch(err => {
                return done(err);
              });
          }
        }
      );
    }
  )
);

module.exports = passport;
