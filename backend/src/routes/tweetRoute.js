import Router from 'express-promise-router'
import TweetController from '../controllers/tweetController'
import passport from 'passport'
import { validateBody, schemas } from '../helpers/routeHelpers'
const passportConfig = require('../config/passport')
const router = Router()
const passportLogin = passport.authenticate('local', { session : false })
const passportJWT = passport.authenticate('jwt', { session : false })

router.route('/test')
	.get(TweetController.test)
	
router.route('/getTweets')
	.get(TweetController.getTweets)
	
router.route('/createTweet')
	.post(validateBody(schemas.tweetSchema), TweetController.createTweet)
	
router.route('/getById')
	.post(validateBody(schemas.idSchema), TweetController.getById)
	
router.route('/addMore')
	.post(validateBody(schemas.idSchema), TweetController.addMore)
	
	
module.exports = router