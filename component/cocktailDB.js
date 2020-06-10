export default class CocktailDB {

    _apiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}
                , received ${res.status}`)
        }
        return await res.json();
    }

    getFilters = async () =>  {
        const filters = await this.getResource(`list.php?c=list`);
        return filters;
    }

    getByFilter = async (filter) => {
        const listCocktails = await this.getResource(`filter.php?c=${filter}`);
        return listCocktails;
    }
}
