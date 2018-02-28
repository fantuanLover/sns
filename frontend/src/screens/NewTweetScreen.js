import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform, Keyboard } from 'react-native'
import Touchable from '@appandflow/touchable'
import { connect } from 'react-redux'

import { colors } from '../utils/constants'
import { createTweet } from '../utils/API'


const Root = styled.View`
  backgroundColor: ${props => colors.WHITE};
  flex: 1;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`;

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: "What's happening?",
  maxLength: 140,
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => colors.SECONDARY};
`;

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
})`
  backgroundColor: ${props => colors.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`;

const TweetButtonText = styled.Text`
  color: ${props => colors.WHITE};
  fontSize: 16;
`;

const TextLength = styled.Text`
  fontSize: 18;
  color: ${props => colors.PRIMARY};
  position: absolute;
  top: 45%;
  right: 5%;
`;

@connect((store) => {
	return {
		auth : store.auth
	}
})

class NewTweetScreen extends Component {
	state = {
		text: ''
	}

	_onChangeText = text => this.setState({ text });

	_onCreateTweetPress = async () => {
		let user = this.props.auth.currentUser._id
		console.log(user)
		let text = this.state.text
		console.log(text)
		let token = this.props.auth.token
		console.log(token)		
		let self = this
		try {
			res = await createTweet(user, text, token)
			self.props.navigation.navigate('Home')
		} catch (error) {
			console.log(error)
		}
		
	}

	render() {
		return (
			<Root>
				<Wrapper>
					<Input value={this.state.text} onChangeText={this._onChangeText} />
					<TweetButton onPress={this._onCreateTweetPress} >
						<TweetButtonText>Tweet</TweetButtonText>
					</TweetButton>
				</Wrapper>
			</Root>
		)
	}
}

export default NewTweetScreen
