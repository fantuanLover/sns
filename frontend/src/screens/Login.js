import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, TextInput, View, Button, Alert } from 'react-native'
import { loginAction } from '../actions/authAction'
import { login } from '../utils/API'

@connect((store) => {
	return {
		auth : store.auth
	}
})

class Login extends Component {
	static navigationOptions = {
		header: null // !!! Hide Header
	}
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
	
	componentDidMount() {
		// If user is already logged in
		if(this.props.auth.isLoggedIn) {
			// redirect user here
			//this.props.navigation.navigate('Home')
		}
	}
	
    async userLogin (e) {
        console.log(this.state.email, this.state.password)
		let email = this.state.email 
		let password = this.state.password
		let self = this
		try{
			res = await login(email, password)
			console.log(res)
			let user = res.data.user
			let token = res.data.token
			console.log('user :',user)
			console.log('token :',token)
			self.props.dispatch(loginAction(user, token))
			console.log(self.props.auth)
			self.props.navigation.navigate('Home')
		} catch (error) {
			console.log(error)
		}
		
		
    }
	goToSignup (e) {
        console.log('跳转')
		this.props.navigation.navigate('SignUp')
    }
    render() {
		const { auth } = this.props
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    登陆
                </Text>
                <TextInput 
                    placeholder='邮箱' 
                    keyboardType='email-address' 
                    value={this.state.email} 
                    onChangeText={(text) => this.setState({ email: text })} />
                <TextInput 
                    placeholder='密码' 
                    secureTextEntry={true} 
                    value={this.state.password} 
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userLogin(e)} title="登陆"/>
				<View style={{margin: 7}}/>
				<Button onPress={(e) => this.goToSignup(e)} title="注册"/>
            </ScrollView>
        )
    }
}

export default Login