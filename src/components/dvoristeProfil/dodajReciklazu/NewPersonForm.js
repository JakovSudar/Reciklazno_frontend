import React,{useState, useContext} from 'react'
import { Input, Button, Form,message,notification } from 'antd';
import {baseURL} from '../../../constants'
import{
    CheckOutlined
}from "@ant-design/icons"
import ProfileContext from '../../../context/profile-context'

const NewPersonForm = ({oib}) => {

    const {dispatch} = useContext(ProfileContext)

    const [ime, setIme] = useState("")
    const [prezime, setPrezime] = useState("")
    const [email, setEmail] = useState("")

    const submit = (e) =>{
        e.preventDefault()
        if(ime === ""){
            message.error("Unesite ime!", 1)
        }else if( prezime ===""){
            message.error("Unesite prezime!", 1)
        }else {
            const requestBody = {
                firstName: ime,
                lastName: prezime,
                email,
                oib
            }
            
            fetch(baseURL+"api/users/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(requestBody)
            })
            .then(res=>{
                if(res.status !==200){
                    return null
                }else{                    
                    return res.json()
                }
            })
            .then(res=> {
                if(res !== null){       
                    dispatch({
                        type:'ADD_USER',
                        user: res
                    })                               
                }                              
            })
            .catch((e) =>{                
                console.log(e)
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
           
            message.success("Korisnik dodan!", 1)          
        }
    }   

    return (
        <div>
            <Form className="newPersonForm">                               
                <Input
                size ="large"
                onChange= {(e)=>{setIme(e.target.value)}}
                className="newPersonInput"
                placeholder="Ime"
                />          
                <Input
                size ="large"
                onChange= {(e)=>{setPrezime(e.target.value)}}
                className="newPersonInput"
                placeholder="Prezime"
                />
                <Input
                onChange= {(e)=>{setEmail(e.target.value)}}
                size ="large"
                className="newPersonInput"
                placeholder="Email (neobavezno)"
                />                
                <Button    
                htmlType="submit"        
                icon={<CheckOutlined/>}
                type="primary"
                ghost
                size= "large"
                shape="round"
                className= "newPersonBtn"
                onClick= {submit}
                >                
                Potvrdi
                </Button>                             
            </Form>                  
        </div>
    )
}

export default NewPersonForm

