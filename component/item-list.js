import React, { Component } from 'react';
import { Text, View } from "react-native";
import CocktailDB from './cocktailDB';

export default class ItemList extends Component {

    state = {
        drinks: {}
    }
    cocktailDB = new CocktailDB();

    
    onLoaded = (newFilters) => {
        this.setState((prevState) => {
            return {
                filters: newFilters,
            };
        })
    };

    addDrinks(resource) {
        console.log(this.props.route.params)
        let info = this.props.route.params;
        resource.getByFilter().then(item => {

            let result = items.drinks.map(drink => {
                return { name: drink.strDrink, image: strDrinkThumb + '/preview' };
            })
            this.onLoaded(result);
            console.log(result)
        }).catch(e => console.log(e + '_______'));
    }

    componentDidMount() {
        this.addDrinks(this.cocktailDB); 
    }

    render() {

        return (
            <View>
                <Text>Todo List</Text>
            </View>
        );
    }
}
