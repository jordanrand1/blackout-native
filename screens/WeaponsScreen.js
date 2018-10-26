import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';

const data = [
  {
    imageUrl: require('../assets/images/guns/assault/Vapr-XKG.png'),
    title: "Vapr-XKG",
    ammoType: "5.56 mm",
    class: "Assault Rifle",
    magazineSize:	"35 rounds",
    unlocked:	"Level 37 (MP)",
    level: "53 (ZM)",
    costZombies:	"950 points (Mystery Box), 1550 points (wallbuy)",
    startingAmmunition:	"35+70 (MP)",
    fireMode:	"Automatic",
  },
  {
    imageUrl: require('../assets/images/guns/assault/ICR-7.png'),
    title: "ICR-7",
    ammoType: "5.56 mm",
    class: "Assault Rifle",
    magazineSize:	"35 rounds",
    startingAmmunition:	"35+70 (MP)",
    fireMode:	"Automatic",
  },
  {
    imageUrl: require('../assets/images/guns/assault/Rampart_17.png'),
    title: "Rampart 17",
    ammoType: "7.62 mm",
    class: "Assault Rifle",
    magazineSize:	"30 rounds",
    startingAmmunition:	"30+60 (MP)",
    fireMode:	"Automatic",
  },
  {
    imageUrl: require('../assets/images/guns/assault/KN-57.png'),
    title: "KN-57",
    ammoType: "7.62 mm",
    class: "Assault Rifle",
    magazineSize:	"35 rounds",
    startingAmmunition:	"35+70 (MP)",
    fireMode:	"Automatic",
  },
  {
    imageUrl: require('../assets/images/guns/assault/Maddox_RFB.png'),
    title: "Maddox RFB",
    ammoType: "5.56 mm",
    class: "Assault Rifle",
    magazineSize:	"40 rounds",
    startingAmmunition:	"40+80 (MP)",
    fireMode:	"Automatic",
  },
];

class WeaponsScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    data: data,
  }

  render() {
    return (
      <FlatList
        horizontal
        style={{ backgroundColor: "#282828" }}
        data={this.state.data}
        renderItem={({ i: rowData }) => {
          return this.state.data.map( item => {
            const url = item.imageUrl
            return (
              <Card
                key={item.title}
                title={null}
                containerStyle={{ padding: 0, width: 300, marginBottom: 20, backgroundColor: 'black' }}
              >
              <Image source={item.imageUrl} />
              <Text style={ Styles.title }>
                {item.title}
              </Text>
              <Text style={ Styles.description }>
              {`
                Ammo Type: ${item.ammoType}

                Class: ${item.class}

                Magazine Size: ${item.magazineSize}

                Starting Ammunition: ${item.startingAmmunition}

                Fire Mode: ${item.fireMode}

              `}
              </Text>
              </Card>
            )
          })
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const Styles = {
  title: {
    textAlign: "center",
    fontSize: 20,
    padding: 15,
    color: 'orange',
  },
  description: {
    color: 'white',
    textAlign: "left",
    marginLeft: -17,
    fontSize: 16,
  },
}

export default WeaponsScreen