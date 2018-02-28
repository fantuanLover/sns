import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import ButtonHeader from './ButtonHeader';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

class HeaderAvatar extends Component {
	_onOpenActionSheet = () => {
		console.log('header avatar')
	};

	render() {
		return (
			<ButtonHeader side="left" onPress={this._onOpenActionSheet}>
				<Avatar source={require('../img/logo.png')} />
			</ButtonHeader>
		)
	}
}

export default HeaderAvatar
