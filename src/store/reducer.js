import * as Actions from './action'

const initalseState = {
    user: null,
    recipes: [],
    categories: [],
    toShopping: []
}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        case Actions.SET_USER:
            return { ...state, user: action.payload }
        case Actions.SET_CATEGORIES:
            return { ...state, categories: action.payload }
        case Actions.ADD_CATEGORIES:
            const categories = [...state.categories];
            categories.push(action.payload);
            return { ...state, categories }
        case Actions.SET_RECIPE:
            return { ...state, recipes: action.payload }
        case Actions.ADD_RECIPE:
            const recipes = [...state.recipes];
            recipes.push(action.payload);
            return { ...state, recipes }
        case Actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id == action.payload.Id);
            recipes[findIndex] = action.payload;
            return { ...state, recipes }
        }
        case Actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.Id !== action.payload.Id)
            return { ...state, recipes }
        }
        case Actions.SET_TOSHOPPING:
            return { ...state, toShopping: action.payload }

        case Actions.DELETE_TOSHOPPING: {
            const toShopping = state.toShopping.filter(x => x.Id !== action.payload.Id)
            return { ...state, toShopping }
        }
        case Actions.EDIT_SHOPPING: {
            const toShopping = [...state.toShopping];
            const findIndex = toShopping.findIndex(x => x.Id == action.payload.Id);
            if (findIndex >= 0)
                toShopping[findIndex] = action.payload;
            else toShopping.push(action.payload)
            return { ...state, toShopping }
        }
        default: return { ...state }
    }
}

export default reducer;