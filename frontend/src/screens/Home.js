import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, View, Button, ActivityIndicator } from 'react-native'
import FeedCard from '../components/FeedCard/FeedCard'
import { getTweets } from '../utils/API'

const data = [
  {
	text : '我是世界第一'
  },
  {
	text : '我是世界第一'
  },
  {
	text : '我是世界第一'
  },
  {
	text : '我是世界第一'
  },
  {
	text : '我是世界第一'
  }
]

@connect((store) => {
	return {
		
	}
})

class Home extends Component {
    constructor(props) {
		super(props)

		this.state = {
			loading: false,
			data: [],
			error: null,
			refreshing: false
		}
	}
	
	async componentWillMount() {
		try {
			res = await getTweets()
			console.log(res.data)
			this.setState(
				{ data : res.data }
			)
		} catch (error) {
			console.log(error)
		}
		
	}
    
	_renderItem = ({ item }) => <FeedCard item={item} />
    
	_handleRefresh = () => {
		this.setState({
			refreshing : true
		},async () => {
			try {
				res = await getTweets()
				console.log(res.data)
				this.setState({ 
					data : res.data,
					refreshing : false
				})
			} catch (error) {
				console.log(error)
			}
		})
	}
	
	_handleLoadMore = () => {
		
	}
	
	_renderFooter = () => {
		if (!this.state.loading) return null

		return (
			<View
				style={{
				paddingVertical: 20,
				borderTopWidth: 1,
				borderColor: "#CED0CE"
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		)
	}
	
	render() {
		
        return (
            <FlatList
			  contentContainerStyle = {{ alignSelf: 'stretch' }}
			  data = {this.state.data}
			  keyExtractor={item => item._id}
			  renderItem={this._renderItem}
			  refreshing={this.state.refreshing}
			  onRefresh={this._handleRefresh}
			  onEndReached={this._handleLoadMore}
			  ListFooterComponent={this.renderFooter}
			/>
        )
    }
}

export default Home