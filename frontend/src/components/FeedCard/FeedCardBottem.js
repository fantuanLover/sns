import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
 
const ICON_SIZE = 20

class FeedCardBottem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoriteCount : 3, 
			isFavorited :true
		}
	}
    render() {
		
        return (
            <View style = { styles.root }>
				<TouchableHighlight style = { styles.Button }>
					<View style = { styles.Area }>
						<SimpleLineIcons name='bubble' size={ICON_SIZE}/>
						<Text style = { styles.ButtonText }>{this.state.favoriteCount}</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style = { styles.Button }>
					<View style = { styles.Area }>
						<Entypo name='retweet' size={ICON_SIZE}/>
						<Text style = { styles.ButtonText }>6</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style = { styles.Button }>
					<View style = { styles.Area }>
						<Entypo 
							name='heart' 
							size={ICON_SIZE}
							color={this.state.isFavorited ? 'red' : '#CAD0D6'}
						/>
						<Text style = { styles.ButtonText }>{this.state.favoriteCount}</Text>
					</View>
				</TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
	root : {
		height : 40,
		flexDirection : 'row'
	},
	Button : {
		flex : 1
	},
	Area : {
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 32
	},
	ButtonText : {
		fontSize : 14,
		fontWeight : '500',
		color : '#444B52'
	}
})

export default FeedCardBottem