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

      const BASE_URL = 'https://cod-api.tracker.gg/v1/standard/bo4/profile';

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
    const { metadata, stats } = this.props.profile
    if (metadata === undefined) {
      return
    }
    return (
      <ScrollView style={styles.container}> 
        <Text style={styles.username}> {this.props.profile.metadata.platformUserHandle}</Text>
        <Text style={styles.text}> 
        {`
          Level: ${stats[0].displayValue}
          Kills: ${stats[2].displayValue}
          Deaths: ${stats[3].displayValue}
          K/D Ratio: ${stats[1].displayValue}
          Assists: ${stats[4].displayValue}
          Wins: ${stats[15].displayValue}
          Losses: ${stats[16].displayValue}
          Win Rate: ${stats[14].displayValue}
          Total Games Played: ${stats[13].displayValue}
          Time Played: ${stats[18].displayValue}
        `}
        </Text>
      </ScrollView>
    )
  }

  matchList = () => {
    if (this.state.matches.entries !== undefined) {
      return this.state.matches.entries.map( entry, i => {
        return(
          <Card style={styles.playerCard} key={i}>
            <Text>

            </Text>
          </Card>
        )
      })
    }
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