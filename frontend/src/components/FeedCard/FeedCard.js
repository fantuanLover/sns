import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet } from 'react-native'
import FeedCardHeader from './FeedCardHeader'
import FeedCardContent from './FeedCardContent'
import FeedCardBottem from './FeedCardBottem'

class FeedCard extends Component {

	componentDidMount() {
		console.log(this.props)
	}
    render() {
		
        return (
            <View style = { styles.root }>
                <FeedCardHeader name={this.props.item.user.username} time={this.props.item.createAt}/>
				<FeedCardContent text={this.props.item.text}/>
				<FeedCardBottem />
            </View>
        );
    }
}
const styles = StyleSheet.create({
	root : {
		minHeight : 180,
		width : '100%',
		padding : 7,
		marginVertical : 5,
		backgroundColor : 'white'
	}
})

export default FeedCard