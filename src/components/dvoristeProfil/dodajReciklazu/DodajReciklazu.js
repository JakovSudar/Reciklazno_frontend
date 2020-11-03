import React, { useState, useEffect, useContext } from 'react'
import { Input, Button, notification } from 'antd';
import ExistingPersonForm from './ExistingPersonForm'
import PersonInfo from '../PersonInfo'
import ProfileContext from '../../../context/profile-context'
import RecContext from '../../../context/recyclation-context'
import NewPersonForm from './NewPersonForm'
import Recyclations from '../Recyclations'
import './style/dodaj.css'
import {baseURL} from '../../../constants'
import{
    RightCircleOutlined
}from "@ant-design/icons";

const DodajReciklazu = props => {

    const {user, dispatch} = useContext(ProfileContext)
    const {recyclations} = useContext(RecContext)

    const [loading, setLoading] = useState(false)
    const [oib, setOib] = useState("")
    const [disabledInput, setDisabledInput] = useState(false)
    const [newPerson, setNewPerson] = useState(false)
    const [oldPerson, setOldPerson] = useState(false)
    const [added, setAdded] = useState(false)
    
    useEffect(()=>{        
        if(user.length !== 0){
            setOldPerson(true)
            setNewPerson(false)
        }        
    },[user])

    useEffect(()=>{
        if(recyclations.length!==0){
            setNewPerson(false)
            setOldPerson(false)
            setOib("")     
                  
        }
    },[recyclations])

    const addedFunc=()=>{
        setAdded(true)
    }
    const clicked = ()=>{
        if(oib.length <11 || oib.length >12){
            notification.error({
                style: {
                    border: "1px solid red"
                },
                duration: "2",
                message: `Neispravan OIB`,
                description:
                  'Provjerite jeste li upisali sve znamenke',
                placement: "bottomRight"
              });
        }else{
            setLoading(true)
            setDisabledInput(true)
            const url = baseURL + "api/users/"+ oib
            fetch(url)
                .then(res => {                    
                    if(res.status !== 200){
                        notification.warn({
                            style: {
                                border: "1px solid yellow"
                            },
                            duration: "3",
                            message: `Osoba ne postoji u bazi`,
                            description:
                              'Potreban je unos podataka',
                            placement: "bottomRight"
                          });
                          setNewPerson(true)
                          setOldPerson(false)
                          return null
                    }else{    
                        notification.success({                            
                        duration: "3",
                        style: {
                            border: "1px solid yellow",
                            backgroundColor : "green",
                            color: "white"
                        },
                        message: `Osoba pronađena`,
                        description:
                        
                          'Možete nastaviti s unosom podataka',
                        placement: "bottomRight"
                        });                                                                             
                        return res.json()                         
                    }                        
                })
                .then(user => {                      
                    if(user !== null){                                               
                        dispatch({type:'ADD_USER', user})                                                                                                               
                    }    
                    setLoading(false)
                    setDisabledInput(false)                                                
                })
                .catch((e) =>{
                    setLoading(false)
                    setDisabledInput(false)                      
                    notification.error({
                        style: {
                            border: "2px solid red"
                        },
                        duration: "2",
                        message: `Dogodila se greška`,
                        description:
                          e.message,
                        placement: "bottomRight"
                    });
                })            
        }            
    }   

    return (
        <div>
            <div className="oibContainer">
                <Input
                className="oibInput"
                value={oib}
                placeholder= "Unesite OIB"
                onPressEnter={clicked}
                onChange = {(e)=>{
                    setAdded(false)
                    setNewPerson(false)
                    setOldPerson(false)
                    setOib(e.target.value)
                }}
                disabled = {disabledInput}
                type="number" />
                <Button
                className="oibBtn"
                    loading = {loading}
                    size= "large"
                    ghost = {true}
                    type="primary"
                    icon={<RightCircleOutlined />}                    
                    onClick= {clicked}                    
                    >
                    Unesi
                </Button>  
            </div> 
            {oldPerson && <PersonInfo />}
            {newPerson && <NewPersonForm oib={oib} /> }                      
            {oldPerson && <ExistingPersonForm added={addedFunc}/> }    
            {added && <Recyclations/>}               
        </div>
    )
}
export default DodajReciklazu
