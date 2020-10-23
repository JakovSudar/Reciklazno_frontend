import React from 'react'
import Profil  from './Profil'
import DodajReciklazu from './DodajReciklazu'
import DnevnaStatistika from './DnevnaStatistika'
import MjesecnaStatistika from './MjesecnaStatistika'
import Zajednica from './Zajednica'
const DvoristeContent = ({choosen}) => {   
        
            switch (choosen) {                
                case "1" : return  <Profil/>;    
                case "2" : return <DodajReciklazu/>; 
                case "3" : return < DnevnaStatistika /> ; 
                case "4" : return < MjesecnaStatistika />;         
                case "5" : return < Zajednica />;                
                default:    return choosen; 
            }
        
    
}

export default DvoristeContent
