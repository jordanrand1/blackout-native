import React from 'react';
import { TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { search } from '../reducers/search';
import { connect } from 'react-redux';

class Search extends React.Component {

  state = {
    title: 'bo4',
    platform: 'ps4',
    username: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.dispatch(search(this.state))
    }
  }

  render() {
    return(
      <View style={ styles.SearchBar }>
        <TouchableOpacity onPress={() => this.setState({title: 'bo4'})}>
          <Image style={{ width: 40, height: 40 }} source={require('../assets/images/bo4logo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({platform: 'psn'})}>
          <Image style={ this.state.platform === 'psn' ? styles.Platforms : styles.PlatformsInactive } source={require('../assets/images/psnlogo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({platform: 'xbl'})}>
          <Image style={ this.state.platform === 'xbl' ? styles.Platforms : styles.PlatformsInactive } source={require('../assets/images/xbllogo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({platform: 'bnet'})}>
          <Image style={ this.state.platform === 'bnet' ? styles.Platforms : styles.PlatformsInactive } source={require('../assets/images/bnetlogo.png')} />
        </TouchableOpacity>
        <TextInput
          style={{ padding: 10, height: 40, color: 'white', borderColor: 'orange', borderWidth: 1, flexGrow: 2, borderRadius: 50 }}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.text}
        />  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: "row",
    marginTop: 25,
    padding: 20,
    backgroundColor: 'black',
  },
  Selector: {
    width: 100,
    height: 50,
  },
  BO4: {
  
  },
  Platforms: {
    width: 40, 
    height: 40, 
    marginLeft: 5,
    marginRight: 5,
  },
  PlatformsInactive: {
    width: 40, 
    height: 40, 
    marginLeft: 5,
    marginRight: 5,
    opacity: .6,
  },
})

const mapStateToProps = (state) => {
  return { search: state.search }
}

export default connect(mapStateToProps)(Search)