import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { CheckBox } from 'react-native-elements'
import CocktailDB from './cocktailDB';

export default class Filter extends Component {

    cocktailDB = new CocktailDB();

    state = {
        filters: {},
    };

    onLoadedFilters = (newFilters) => {
        this.setState(() => {
            return {
                filters: newFilters,
            };
        })
    };

    addFilters(resource) {
        resource.getFilters().then(items => {

            let result = items.drinks.map(filter => {
                return { label: filter.strCategory, checked: true };
            })
            this.onLoadedFilters(result);
        }).catch(e => console.log(e));
    }

    componentDidMount() {
        this.addFilters(this.cocktailDB);
    }

    unChecked(filters) {
        let result = [];
        for (let key in filters) {
            result.push(<CheckBox
                center
                title={filters[key].label}
                iconRight
                checked={filters[key].checked}
                onPress={() => {
                    let filter = { ...filters };
                    filter[key].checked = !filter[key].checked;
                    this.setState({ filter });
                }}
            />)
        }
        return result;
    }

    apply() {

        let { filters } = this.state;
        let result = [];
        for (let item in filters) {
            if (filters[item].checked == true) {
                result.push(filters[item].label);
            }
        }
        this.props.navigation.navigate('Drinks', {
            drinks: result
        })

        // console.log(result)
    }

    render() {

        const { filters } = this.state;
        let result = this.unChecked(filters);

        return (
            <ScrollView>
                {result}
                <Button
                    title={"Apply"}
                    onPress={() => this.apply()}
                />
            </ScrollView>
        );
    }
}