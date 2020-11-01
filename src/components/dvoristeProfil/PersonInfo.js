import React, {useContext,useEffect, useState} from 'react'
import{
    UserOutlined
}from "@ant-design/icons";
import ProfileContext from '../../context/profile-context'


 const PersonInfo = () => {
    const {user} = useContext(ProfileContext)
    const[name, setName] = useState("")
    const[lastName, setLastName] = useState("")
    useEffect(()=>{        
        setName(user.firstName)
        setLastName(user.lastName)
        console.log(user)
    },[user])
    
    return (
        <div
        style={{
            marginTop: "20px",
            display:"flex",
            justifyContent:"center",
            alignItems: "center"
        }}>
        <UserOutlined
        style={{
            fontSize: "3rem"            
        }}            
        />
        <h2 style={{marginBottom:"0px"}}> {name + " " + lastName}</h2>                 
        </div>
    )
}
export default PersonInfo


