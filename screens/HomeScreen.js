import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    title: 'bo3',
    platform: 'psn',
    type: 'core',
    mode: 'war',
    time: 'alltime',
    page: 1,
    data: {},
  }

  componentDidMount() {
    const BASE_URL = 'https://my.callofduty.com/api/papi-client';
    const { title, platform, time, type, mode, page } = this.state
    const leaderboardEndpoint = BASE_URL + '/leaderboards/v2'
    const uri = 
      `${leaderboardEndpoint}/title/${title}/platform/${platform}/time/${time}/type/${type}/mode/${mode}/page/${page}`
    axios.get(uri)
      .then( res => {
        this.setState({ data: res.data.data })
      })
  }

  createCards = () => {
    if (this.state.data.entries !== undefined) {
      return this.state.data.entries.map( entry => {
        const { kdRatio, scorePerMinute, gamesPlayed } = entry.values
        const {username} = entry
        return(
          <Card style={styles.playerCard} key={entry.rank}>
            <Text>
            {`
            ${username}

            K/D: ${kdRatio.toFixed(2)} | Score Per Minute: ${scorePerMinute.toFixed(2)}
            Games Played: ${gamesPlayed} 
            `}
            </Text>
          </Card>
        )
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Leaderboard</Text>
          {this.createCards()}
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  title: {
    color: 'orange',
    fontSize: 25,
    textAlign: 'center',
  },
  playerCard: {
    backgroundColor: 'black',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
