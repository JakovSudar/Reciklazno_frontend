import React,{useState} from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import DvoristeContent from "./DvoristeContent"

import './style/dvoristeProfil.css'



import { Layout, Menu } from "antd";

import {
    PlusOutlined,
    BarChartOutlined,
    PoweroffOutlined, 
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,   
  } from "@ant-design/icons";
  

const {  Content, Sider } = Layout;


const DvoristeProfil = () =>{
  const [selected, setSelected] = useState("2")
    return(    
    <Layout>
      <Sider
      breakpoint={"sm"}
      collapsedWidth={0}
      style={{
        height: "100vh"
      }}
      >      
        <Menu 
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={["1"]}
        onClick = {
          ({key})=>{
              if(key === "0"){

              }else
                setSelected(key)
          }
        }     
       >
        <Menu.Item key="0" icon={<HomeOutlined />}>
        Početna
      </Menu.Item>
        <Menu.Item key="1" icon={<UserOutlined />}>
        Profil
      </Menu.Item>
      <Menu.Item key="2" icon={<PlusOutlined /> }>
        Dodaj reciklazu
      </Menu.Item>
      <Menu.Item key="3" icon={<BarChartOutlined />}>
        Dnevna statistika
      </Menu.Item>
      <Menu.Item key="4" icon={<CalendarOutlined />}>
        Mjesečna statistika
      </Menu.Item>
      <Menu.Item key="5" icon={<TeamOutlined />}>
        Vaša zajednica
      </Menu.Item>
      <Menu.Item key="6" icon={<PoweroffOutlined />}>
        Odjava
      </Menu.Item>        
        </Menu>
      </Sider>
      <Content>
       <DvoristeContent
        choosen = {selected}
        />       
      </Content>      
    </Layout>
    
    )
}

export default DvoristeProfil

