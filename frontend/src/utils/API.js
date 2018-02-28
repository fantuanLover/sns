import { API_URL } from './constants'
import axios from 'axios'

module.exports = {
	createTweet(user, text, token){
		let url = API_URL+'/api/tweets/createTweet'
		return axios({
			method: 'post',
			url,
			data : {
				user,
				text
			},
			headers: {
				Authorization : token
			}
		})
	},
	getTweets(){
		let url = API_URL+'/api/tweets/getTweets'
		console.log(url)
		return axios.get(url)
	},
	addMore(id, token){
		let url = API_URL+'/api/tweets/addmore'
		console.log(url)
		return axios({
			method: 'post',
			url: url,
			data: { id : id },
			headers: {
				Authorization : token
			}
		})
		
	},
	signUp(email, username, password){
		let url = API_URL+'/api/users/signup'
		return axios.post(url, {
			email,
			username,
			password
		})
		
	},
	login(email, password){
		let url = API_URL+'/api/users/login'
		return axios.post(url, {
			email,
			password
		})
		
	}
}