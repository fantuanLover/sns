import React, { Component } from 'react'
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Keyboard, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import Profile from './screens/Profile'
import NewTweetScreen from './screens/NewTweetScreen'

import ButtonHeader from './components/ButtonHeader'
import HeaderAvatar from './components/HeaderAvatar'

import { colors } from './utils/constants'
import { addListener } from './utils/redux'
const TAB_ICON_SIZE = 20

const SignedOut = StackNavigator({
	
	Login: {
		screen: Login,
		navigationOptions: () => ({
			headerTitle: '登陆'
		})
	},
	SignUp: {
		screen: SignUp,
		navigationOptions: () => ({
			headerTitle: '注册'
		})
	}
},{
	headerMode: 'none'
})

const SignedIn = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			headerLeft: null,
			headerTitle: '主页',
			headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) =>
			<Icon name="home" size={TAB_ICON_SIZE} color={tintColor} />
		})
	},
	Profile: {
		screen: Profile,
		navigationOptions: () => ({
			headerLeft: null,
			headerTitle: '资料',
			headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) =>
			<Icon name="user" size={TAB_ICON_SIZE} color={tintColor} />
		})
	}
},
{
	lazy: true,
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	tabBarOptions: {
		showIcon: true,
		showLabel: false,
		activeTintColor: colors.PRIMARY,
		inactiveTintColor: colors.LIGHT_GRAY,
		style: {
			backgroundColor: colors.WHITE,
			height: 50,
			paddingVertical: 5,
		}
	}
})

const AppMainNav = StackNavigator({
	SignedIn: {
		screen: SignedIn,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
			headerRight: (
				<ButtonHeader
					side="right"
					onPress={() => navigation.navigate('NewTweet')}
				>
					<Icon color={colors.PRIMARY} size={TAB_ICON_SIZE} name="pencil" />
				</ButtonHeader>
			),
			headerLeft: <HeaderAvatar />
		})
	},
	SignedOut: {
		screen: SignedOut,
		navigationOptions: () => ({
			gesturesEnabled: false
		})
	},
	NewTweet: {
		screen: NewTweetScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: <HeaderAvatar />,
			headerRight: (
				<ButtonHeader
					side="right"
					onPress={() => {
						Keyboard.dismiss();
						navigation.goBack(null);
					}}
				>
					<Icon color={colors.PRIMARY} size={25} name="close" />
				</ButtonHeader>
			)
		})
    }
},
{
	headerMode: 'screen',
	initialRouteName: "SignedOut"
})

class AppNavigator extends Component {
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
	}
	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
	}
	onBackPress = () => {
		const { dispatch, nav } = this.props
		if (nav.index === 0) {
		  return false
		}
		dispatch(NavigationActions.back())
		return true
	}
	render() {
		const nav = addNavigationHelpers ({
			dispatch : this.props.dispatch,
			state: this.props.nav,
			addListener
		})
		return <AppMainNav navigation={nav} />
	}
}
export default connect(state => ({
	nav : state.nav
}))( AppNavigator )

export const router = AppMainNav.router