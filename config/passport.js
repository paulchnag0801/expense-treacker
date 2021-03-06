const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              req.session.email = req.body.email
              return done(null, false, {
                message: 'That email is not registered!',
              })
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                req.session.password = req.body.password
                return done(null, false, {
                  message: 'Email or Password incorrect.',
                })
              }
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email }).then((user) => {
          if (user) return done(null, user)

          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then((user) => done(null, user))
            .catch((err) => done(err, false))
        })
      }
    )
  )

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_ID,
  //       clientSecret: process.env.GOOGLE_SECRET,
  //       callbackURL: process.env.GOOGLE_CALLBACK,
  //     },
  //     async (token, tokenSecret, profile, done) => {
  //       const { sub, name, email } = profile._json
  //       try {
  //         // User's googleId or email must be unique
  //         let user = await User.findOne({
  //           $or: [{ email }, { googleId: sub }],
  //         })
  //         if (!user) {
  //           const randomPassword = Math.random().toString(36).slice(-8)

  //           user = await User.create({
  //             name,
  //             email,
  //             password: bcrypt.hashSync(
  //               randomPassword,
  //               bcrypt.genSaltSync(10),
  //               null
  //             ),
  //             googleId: sub,
  //           })
  //         }
  //         return done(null, user)
  //       } catch (err) {
  //         done(err)
  //       }
  //     }
  //   )
  // )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
