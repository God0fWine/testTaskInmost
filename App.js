import React, { Component } from 'react';
import { Text, View } from "react-native";
import ItemList from './component/item-list';
import Filters from './component/filters';
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends Component {

	render() {

		const Stack = createStackNavigator();

		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Drinks">
					<Stack.Screen
						name="Drinks"
						component={ItemList}
						options={({navigation}) => ({
							headerStyle: {
								backgroundColor: 'white'
							},
							title: 'Drinks',
							headerRight: () => (
								<Icon name='filter' onPress={() => navigation.navigate('Filters')} />
							),
						})} />
					<Stack.Screen
						name="Filters"
						component={Filters}
						options={{
							headerStyle: {
								backgroundColor: 'white'
							}
						}} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
