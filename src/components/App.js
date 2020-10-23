import React, {useEffect, useReducer} from 'react'
import  recyclationReducer from '../reducers/recyclation'
import DvoristeProfil from '../components/dvoristeProfil/DvoristeProfile'
import ProfileContext from '../context/profile-context'

const App = () => {

    const [recyclations, dispatch] = useReducer(recyclationReducer, [])
   
    useEffect(() =>
    fetch("http://localhost:8080/api/recyclations/")
      .then(res => res.json())
      .then(res => dispatch({type:'POPULATE_RECYCLATIONS', res}))
      .catch(() => console.log("error"))
    );  
       

    return (
        <div>
            <ProfileContext.Provider value={dispatch}>
                <DvoristeProfil/>
            </ProfileContext.Provider>            
        </div>
    )
}

export default App
