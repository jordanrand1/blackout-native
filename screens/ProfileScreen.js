import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { getProfile } from '../reducers/codapi';
import { connect } from 'react-redux';
import axios from 'axios';

class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    matches: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const { username, title, platform } = this.props.search

      const BASE_URL = 'https://my.callofduty.com/api/papi-client';

      this.props.dispatch(getProfile(this.props.search))

      const matchesEndpoint = BASE_URL + '/crm/cod/v2'
      const uri = 
        `${matchesEndpoint}/title/${title}/platform/${platform}/gamer/${username}/matches/days/14`
      axios.get(uri)
          .then( res => { this.setState({matches: res.data.data.matches}) } )
          .catch( res => {setFlash(res, 'red')})
    }
  }

  profileView = () => {
    const { mp, } = this.props.profile
    if (mp === undefined) {
      return
    }
    return (
      <ScrollView style={styles.container}> 
        <Text> {this.props.profile.username}</Text>
        <Text> Kills: {mp.lifetime.all.kills}</Text>
        <Text> Deaths: {mp.lifetime.all.deaths}</Text>
        <Text> K/D Ratio: {mp.lifetime.all.kdRatio}</Text>
        <Text> Wins: {mp.lifetime.all.wins}</Text>
        <Text> Losses: {mp.lifetime.all.losses}</Text>
      </ScrollView>
    )
  }


  

  render() {
    return (
      <ScrollView style={styles.container}>      
        { this.profileView() }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  return { profile: state.codapi, search: state.search }
}

export default connect(mapStateToProps)(ProfileScreen)