import React, { Component } from 'react'
import { AppRegistry, View, Text, StyleSheet, Image } from 'react-native'

class FeedCardHeader extends Component {

    render() {
		
        return (
            <View style = { styles.root }>
                <View style={ styles.AvatarContainer }>
					<Image style={ styles.Avatar } source={require('../../img/logo.png')}/>
				</View>
				<View style={ styles.MetaContainer }>
					<View style={ styles.MetaTopContainer }>
						<Text style={ styles.MetaFullName }>
							{this.props.name}
						</Text>
						<Text style={ [ styles.MetaText,{ marginLeft: 5 } ] }>
							
						</Text>
					</View>
					<View style={ styles.MetaBottomContainer }>
						<Text style={ styles.MetaText }>
							{this.props.time}
						</Text>
					</View>
				</View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
	root : {
		height : 50,
		flexDirection : 'row',
		alignItems : 'center',
	},
	AvatarContainer : {
		flex : 0.2,
		justifyContent : 'center',
		alignSelf : 'stretch'
	},
	Avatar : {
		height : 40,
		width : 40,
		borderRadius: 20
	},
	MetaContainer : {
		flex : 1,
		alignSelf : 'stretch'
	},
	MetaTopContainer : {
		flex : 1,
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'flex-start'		
	},
	MetaBottomContainer : {
		flex : 0.8,
		alignSelf : 'stretch',
		alignItems : 'flex-start',
		justifyContent : 'center'	
	},
	MetaFullName : {
		fontSize : 16,
		fontWeight : 'bold',
		color: '#444B52'
	},
	MetaText : {
		fontSize : 14,
		fontWeight : '600',
		color : '#444B52'
	}
})

export default FeedCardHeader