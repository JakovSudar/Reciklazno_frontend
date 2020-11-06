import React from "react";
import "antd/dist/antd.css";
import { useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style/dvoristeProfil.css'
import {  Menu } from "antd";
import {
    PlusOutlined,
    BarChartOutlined,
    PoweroffOutlined, 
    CalendarOutlined,
    
    UserOutlined,
    HomeOutlined,   
} from "@ant-design/icons";  

const ProfilMenu = ()=>{
    const history = useHistory()
    return(
    <Menu theme="dark" mode="inline" defaultSelectedKeys="1">
        <Menu.Item key="0" icon={<HomeOutlined />}>
        <Link to="/">Početna</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Profil</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined /> }>
        <Link to="/profile/add-recyclation">Dodaj</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
        <Link to="/profile/daily">Dnevna statistika</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
        <Link to="/profile/monthly">Mjesečna statistika</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CalendarOutlined />}>
        <Link to="/profile/period">Periodna statistika</Link>
        </Menu.Item>
        <Menu.Item key="6" 
        icon={<PoweroffOutlined/>}
        onClick={()=>{
            localStorage.removeItem("token")
            history.push("/")
        }}
        >
        Odjava
        </Menu.Item>        
    </Menu>
    )
    }


export default ProfilMenu

