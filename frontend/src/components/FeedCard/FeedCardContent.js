import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet } from 'react-native'

class FeedCardContent extends Component {

    render() {
		
        return (
            <View style = { styles.root }>
                <Text style={ styles.feedCardContentText } >
					{this.props.text}
				</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
	root : {
		flex : 1,
		paddingTop : 20,
		paddingHorizontal : 10
	},
	feedCardContentText : {
		fontSize : 14,
		textAlign : 'left',
		fontWeight : '500',
		color : '#444B52'
	}
})

export default FeedCardContent