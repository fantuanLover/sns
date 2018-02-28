import JWT from 'jsonwebtoken'
import User from '../models/User'
import { JWT_SECRET } from '../config'  

const signToken = user => {
  return JWT.sign({
    sub: user.id,
    iat: new Date().getTime(), 
    exp: new Date().setDate(new Date().getDate() + 1) 
  }, JWT_SECRET);
}

module.exports = {
	test : async (req, res, next) => {
		res.send('User api is working!')
	},
	signUp : async (req, res, next) => {
		const { email, username, password } = req.value.body
		const foundUser1 = await User.findOne({ email : email })
		if (foundUser1) { 
			return res.status(403).json({ error: '邮箱已经存在'})
		}
		const foundUser2 = await User.findOne({ username : username })
		if (foundUser2) { 
			return res.status(403).json({ error: '用户名已经存在'})
		}

		const user = await User.create({ email, username, password })
		const token = signToken(user)
		res.status(200).json({ token, user })
	},
	login : async (req, res, next) => {
		const user = req.user  
		const token = signToken(user)
		res.status(200).json({ token, user })
	},
	secret: async (req, res, next) => {
		console.log('I managed to get here!')
		res.json({ secret: "resource" })
	}
}