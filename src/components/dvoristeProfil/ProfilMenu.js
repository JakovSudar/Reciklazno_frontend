import React from "react";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import './style/dvoristeProfil.css'
import {  Menu } from "antd";
import {
    PlusOutlined,
    BarChartOutlined,
    PoweroffOutlined, 
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,   
} from "@ant-design/icons";  

const ProfilMenu = ()=>(
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
        <Menu.Item key="5" icon={<TeamOutlined />}>
        <Link to="/profile/community">Vaša zajednica</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<PoweroffOutlined />}>
        Odjava
        </Menu.Item>        
    </Menu>
)


export default ProfilMenu

