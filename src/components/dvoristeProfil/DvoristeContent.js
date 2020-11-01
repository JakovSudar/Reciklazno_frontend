import React from 'react'
import { Route} from 'react-router-dom';
import Profil  from './Profil'
import DodajReciklazu from './dodajReciklazu/DodajReciklazu'
import DnevnaStatistika from './DnevnaStatistika'
import MjesecnaStatistika from './MjesecnaStatistika'
import Zajednica from './Zajednica'
const DvoristeContent = () => (       
    <>
        <Route path="/profile/detail-profile" component={Profil} />
        <Route path="/profile/add-recyclation" component={DodajReciklazu} /> 
        <Route path="/profile/daily" component={DnevnaStatistika} />      
        <Route path="/profile/monthly" component={MjesecnaStatistika} />      
        <Route path="/profile/community" component={Zajednica} />                       
    </>         
)

export default DvoristeContent
