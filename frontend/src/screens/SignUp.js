import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, TextInput, View, Button } from 'react-native'
import { loginAction } from '../actions/authAction'
import { signUp } from '../utils/API'

@connect((store) => {
	return {}
})

class SignUp extends Component {
	static navigationOptions = {
		header: null // !!! Hide Header
	}
    constructor (props) {
        super(props);
        this.state = {
            email: '',
			username: '',
            password: ''
        };
    }
    async userSignup (e) {
        console.log(this.state.email, this.state.password, this.state.username)
		let email = this.state.email 
		let password = this.state.password
		let username = this.state.username
		let self = this
		try {
			res = await signUp(email, username, password)
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
	goToLogin (e) {
        console.log('页面跳转')
		this.props.navigation.navigate('Login')
    }
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    注册
                </Text>
                <TextInput 
                    placeholder='邮箱' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    autoFocus={false} 
                    keyboardType='email-address' 
                    value={this.state.email} 
                    onChangeText={(text) => this.setState({ email: text })} 
				/>
				<TextInput 
                    placeholder='用户名' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    autoFocus={false} 
                    keyboardType='email-address' 
                    value={this.state.username} 
                    onChangeText={(text) => this.setState({ username: text })} 
				/>
                <TextInput 
                    placeholder='密码' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    secureTextEntry={true} 
                    value={this.state.password} 
                    onChangeText={(text) => this.setState({ password: text })} 
				/>
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userSignup(e)} title="注册"/>
				<View style={{margin: 7}}/>
				<Button onPress={(e) => this.goToLogin(e)} title="登陆"/>
            </ScrollView>
        )
    }
}

export default SignUp