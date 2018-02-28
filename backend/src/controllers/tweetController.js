import Tweet from '../models/Tweet'

module.exports = {
	test : async (req, res, next) => {
		res.send('Tweet api is working!')
	},
	createTweet : async (req, res, next) => {
		try {
			let newTweet = req.value.body
			let tweet = await Tweet.create(newTweet)
			res.status(200).json(tweet)
		} catch (error) {
			throw new Error(error)
		}
	},
	getById : async (req, res, next) => {
		try {
			let id = req.value.body.id 
			let tweet = await Tweet
				.findById(id)
				.populate('user',['username','email'])
			res.status(200).json(tweet)
		} catch (error) {
			throw new Error(error)
		}
	},
	getTweets : async (req, res, next) => {
		try {
			let tweets = await Tweet
				.find()
				.sort({_id: -1})
				.populate('user',['username','email'])
				.limit(6)
			res.status(200).json(tweets)
		} catch (error) {
			throw new Error(error)
		}
	},
	addMore : async (req, res, next ) => {
		try {
			let id = req.value.body.id
			let tweets = await Tweet.find({_id: {$gt: id}}).sort({_id: 1 }).limit(6)
			res.status(200).json(tweets)
		} catch (error) {
			throw new Error(error)
		}
	}
}