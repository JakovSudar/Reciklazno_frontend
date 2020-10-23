
const recyclationReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_RECYCLATIONS':
            return action.recyclations
        case 'ADD_RECYCLATION':
            return [
                ...state,
                {}
            ]        
    }
}

export {recyclationReducer as default}
