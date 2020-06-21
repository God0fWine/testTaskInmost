import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import CocktailDB from './cocktailDB';


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 5,
        flex: 1,
        flexDirection: 'row'
    },
    drinkName: {
        textAlignVertical: "center",
        paddingLeft: 10
    },
    logo: {
        width: 100,
        height: 100,
    },
});


export default class ItemList extends Component {

    state = {
        drinks: []
    }

    cocktailDB = new CocktailDB();


    onLoaded = (newDrinks) => {
        this.setState(({ drinks }) => {

            console.log(drinks)
            return {
                drinks: [...drinks, ...newDrinks]
                //  drinks: [...newDrinks]
            };
        })
    };

    addDrinks(resource) {
        let info = this.props.route.params ? this.props.route.params : { "drinks": ["Ordinary Drink"] };
        for (let drink in info.drinks) {
            resource.getByFilter(info.drinks[drink]).then(item => {
                let result = item.drinks.map(drink1 => {
                    return { name: drink1.strDrink, image: drink1.strDrinkThumb + '/preview' };
                })
                this.onLoaded(result, info.drinks[drink]);
            }).catch(e => console.log(e));
        }
    }

    componentDidMount() {
        this.addDrinks(this.cocktailDB);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.route.params){
            if(prevProps.route.params.drinks[0] !== this.props.route.params.drinks[0]){
                this.setState({drinks: []})
                 this.addDrinks(this.cocktailDB);
            }
        }
    }

    // componentWillReceiveProps() {
    //     this.addDrinks(this.cocktailDB);
    // }

    // getSnapshotBeforeUpdate(prevState) {
    //     if (this.state.drinks.length != prevState.length)
    //         this.addDrinks(this.cocktailDB);
    // }

    showDrinks(drinks) {

        // console.log(drinks)
        let result = [];
        for (let key in drinks) {
            result.push(
                <View style={styles.container}>
                    <Image style={styles.logo} source={{ uri: `${drinks[key].image}` }} />
                    <Text style={styles.drinkName}>{drinks[key].name}</Text>
                </View>
            )
        }
        return result;
    }

    render() {

        let { drinks } = this.state;

        let result = this.showDrinks(drinks);


        return (
            <ScrollView>
                {result}
            </ScrollView>
        );
    }
}
