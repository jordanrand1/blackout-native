import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { getProfile } from '../reducers/codapi';
import { connect } from 'react-redux';
import axios from 'axios';

class ProfileScreen extends React.Component {

  static navigationOptions = {
    header: null,
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
        <Text style={styles.username}> {this.props.profile.username}</Text>
        <Text style={styles.text}> 
        {`
        Kills: ${mp.lifetime.all.kills}
        Deaths: ${mp.lifetime.all.deaths}
        K/D Ratio: ${mp.lifetime.all.kdRatio}
        Wins: ${mp.lifetime.all.wins}
        Losses: ${mp.lifetime.all.losses}
        `}
        </Text>
      </ScrollView>
    )
  }

  matchList = () => {
    return this.state.matches.map((match) => {
      return (
          <Text>{match}</Text>
      )
    })

}

  render() {
    return (
      <ScrollView style={styles.container}> 
        {
          this.props.search.username === undefined ? 
          <Text style={styles.noProfileText}>Please enter your username and select a platform above</Text>
          :     
          this.profileView()
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#282828',
  },
  noProfileText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  username: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  }
});

const mapStateToProps = (state) => {
  return { profile: state.codapi, search: state.search }
}

export default connect(mapStateToProps)(ProfileScreen)