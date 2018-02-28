import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, Button } from 'react-native'
import { logout } from '../actions/authAction'

@connect((store) => {
	return {
		auth : store.auth
	}
})


class Profile extends Component {
    
	componentDidMount() {
		// If user is already logged in
		if(this.props.auth.isLoggedIn) {
			// redirect user here
		}
	}
	
	userLogout(e) {
		console.log('logout')
		this.props.dispatch(logout())
		this.props.navigation.navigate('Login')
    }
    
    render() {
		const { auth } = this.props
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    {
						auth.isLoggedIn 
						? auth.currentUser.username
						: "no user" 
					}
                </Text>
                <View style={{margin: 20}}/>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
            </ScrollView>
        )
    }
}

export default Profile
