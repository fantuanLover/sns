import Router from 'express-promise-router'
import UserController from '../controllers/userController'
import passport from 'passport'
import { validateBody, schemas } from '../helpers/routeHelpers'
const passportConfig = require('../config/passport')
const router = Router()
const passportLogin = passport.authenticate('local', { session : false })
const passportJWT = passport.authenticate('jwt', { session : false })

router.route('/test')
	.get(UserController.test)
	
router.route('/signup')
	.post(validateBody(schemas.signupSchema), UserController.signUp)
	
router.route('/login')
	.post(validateBody(schemas.loginSchema), passportLogin, UserController.login)

router.route('/secret')
	.get(passportJWT, UserController.secret)
	
	
module.exports = router