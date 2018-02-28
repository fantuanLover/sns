const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const config = require('./index')
const User = require('../models/User')

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
	try {
		const user = await User.findById(payload.sub)
		if (!user) {
		  return done(null, false);
		}
		done(null, user)
	} catch(error) {
		done(error, false)
	}
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try {
		let user = await User.findOne({ email})
		if (!user) {
			return done(null, false)
		}
		let isMatch = await user.isValidPassword(password)
		if (!isMatch) {
			return done(null, false)
		}
		done(null, user)
	} catch(error) {
		done(error, false)
	}
}))