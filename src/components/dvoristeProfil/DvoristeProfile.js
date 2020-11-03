import React from "react";
import "antd/dist/antd.css";
import DvoristeContent from "./DvoristeContent"
import { Redirect } from 'react-router-dom';
import './style/dvoristeProfil.css'
import { Layout } from "antd";
import ProfileMenu from './ProfilMenu'  
const {  Content, Sider } = Layout;
const DvoristeProfil = () =>{
  
    
  if(localStorage.getItem('token') === null){    
    return (<Redirect to='/login' />)
  }else
  return(          
    <Layout>
      <Sider
      breakpoint={"sm"}
      collapsedWidth={0}
      style={{
        minHeight: "100vh"
      }}
      >      
        <ProfileMenu/>
      </Sider>
      <Content>
       <DvoristeContent       
       />  
        
      </Content>      
    </Layout>
    
    )
}

export default DvoristeProfil

