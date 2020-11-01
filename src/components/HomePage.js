
import React from 'react'
import './style.css'
import { Button, } from 'antd';
import { useHistory} from 'react-router-dom';
import {  UserOutlined } from '@ant-design/icons';

const HomePage = () => {
    const history = useHistory()
    return (
        <div className="home-page gradient_bg">
            <div className="naslov_container">
                <h1 className="naslov">Reciklirajmo.hr</h1>  
                <p className="citat">Živim, dakle, recikliram</p> 
            
            
            <Button onClick={()=>{history.push("/start")}}  shape="round" ghost className="start_btn">Kreni</Button>
            </div>
            <Button
            style={{
                position:"fixed",
                top:"10px",
                right:"10px"
            }}
            shape="circle"
            size="large"
            onClick={()=>{history.push("/login/")}}
            icon={<UserOutlined />}
            ></Button>
        </div>
    )
}

export default HomePage

