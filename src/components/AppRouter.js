import React, {useReducer} from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import  userReducer from '../reducers/user-reducer'
import  recyclationReducer from '../reducers/recyclation'

import DvoristeProfil from './dvoristeProfil/DvoristeProfile'
import LoginPage from './AuthComponents/LoginPage'
import ProfileContext from '../context/profile-context'
import RecContext from '../context/recyclation-context'
import HomePage from './HomePage'
import StartComponent from './UserInterface/StartComponent'

const AppRouter = () => {

    const [user, dispatch] = useReducer(userReducer, []) 
    const [recyclations, recDispatch] = useReducer(recyclationReducer, []) 

    return(
    <RecContext.Provider value= {{recyclations, recDispatch}}>
        <ProfileContext.Provider value={{dispatch, user}}>
            <BrowserRouter>
            <div>      
            <Switch>
                <Route path="/" component={HomePage} exact="true"/>
                <Route path="/login" component={LoginPage} />
                <Route path="/profile"  component={DvoristeProfil} />  
                <Route path="/start"  component={StartComponent} />          
            </Switch>
            </div>
            </BrowserRouter>
        </ProfileContext.Provider>     
    </RecContext.Provider> 
    )  
};

export default AppRouter;
