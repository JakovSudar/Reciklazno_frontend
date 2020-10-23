import React from 'react'
import{
    UserOutlined
}from "@ant-design/icons";


 const PersonInfo = ({user}) => {
     
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
            <h2
            style={{marginBottom:"0px"}}> {user.firstName + " " + user.lastName}</h2>
          
            
           
        
        </div>
    )
}

export default PersonInfo


