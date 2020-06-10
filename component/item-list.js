import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import CocktailDB from './cocktailDB';


const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });


export default class ItemList extends Component {

    state = {
        drinks: {}
    }

    cocktailDB = new CocktailDB();


    onLoaded = (newDrinks) => {
        this.setState(() => {
            return {
                drinks: newDrinks,
            };
        })
    };

    addDrinks(resource) {
        let info = this.props.route.params ? this.props.route.params : {"drinks": ["Ordinary Drink"]};
        for (let drink in info.drinks) {
            resource.getByFilter(info.drinks[drink]).then(item => {
                let result = item.drinks.map(drink1 => {
                    return { name: drink1.strDrink, image: drink1.strDrinkThumb + '/preview' };
                })
                result.splice(20);
                this.onLoaded(result);
                
            }).catch(e => console.log(e));
        }
    }

    componentDidMount() {
        this.addDrinks(this.cocktailDB);
    }

    // componentDidUpdate(){
    //     this.addDrinks(this.cocktailDB);
    // }

    showDrinks(drinks) {

        let result = [];
        for (let key in drinks) {
            result.push(
                <View>
                    <Image style={styles.logo} source={{uri: `${drinks[key].image}`}} />
                     <Text>{drinks[key].name}</Text>
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
