import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


const AssaultStack = createStackNavigator({
  Assault: AssaultScreen,
});

AssaultStack.navigationOptions = {
  tabBarLabel: 'Assault',
};


export default createBottomTabNavigator({
  AssaultStack,
  SMGStack,
});