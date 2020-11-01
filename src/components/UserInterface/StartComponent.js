import React, { useState, useEffect, useContext } from 'react'
import { Input, Button, notification } from 'antd';
import{
    RightCircleOutlined
}from "@ant-design/icons";
import '../style.css';
import fetcher from '../../helpers/fetcher'
import {checkOIB} from '../../helpers/checker'
import {errorNotification} from '../../helpers/notifier'
import UserStats from './UserStats'

const StartComponent = () => {
    const [oib, setOib] = useState("59336824559")    
    const [loading, setLoading] = useState(false)
    const [foundUser, setFoundUser] = useState("")

    const [disabledInput, setDisabledInput] = useState(false)

    const clicked = ()=>{
        if(checkOIB(oib)){          
            fetcher("api/users/"+oib,{})
            .then(res=>{               
                if(res.status===200){
                    return res.json()
                }else return null
            })
            .then(user =>{
                if(user){
                    setFoundUser(user)
                    document.getElementById("oibContainer")
                .style.marginTop = "20px"
                }else
                errorNotification("Osoba ne postoji", 'Provjerite jeste li upisali ispravan OIB!' )
            })                       
        }       
        else{
            errorNotification("Neispravan OIB", 'Provjerite jeste li upisali sve znamenke' )
        }        
    }
    return (
        <div className="start_page gradient_bg">
            <div >     
                <div className="oibContainer" id="oibContainer">           
                <Input
                className="oibInput"
                value={oib}
                placeholder= "Unesite OIB"
                onPressEnter = {clicked}
                onChange = {(e)=>{                                     
                    setOib(e.target.value)
                }}
                disabled = {disabledInput}
                type="number" />
                <Button
                className="oibBtnUser"
                    loading = {loading}
                    size= "large"
                    ghost = {true}
                    type="default"
                    icon={<RightCircleOutlined />}                    
                    onClick={clicked}               
                    >
                    Unesi
                </Button>  
                </div>
                {foundUser && <UserStats user={foundUser}/>}
            </div> 
            
        </div>
    )
}

export default StartComponent
