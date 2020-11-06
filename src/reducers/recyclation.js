
const recyclationReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_RECYCLATIONS':
            return action.recyclations
        case 'ADD_RECYCLATION':
            return [
                ...state,
                {}
            ]
        case 'REMOVE_RECYCLATIONS':
            return []        
    }
}

export {recyclationReducer as default}
