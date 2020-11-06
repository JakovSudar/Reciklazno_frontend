
import React from 'react'
import './style.css'
import { Button, } from 'antd';
import { useHistory} from 'react-router-dom';
import {  UserOutlined } from '@ant-design/icons';

const HomePage = () => {
    const history = useHistory()
    return (
        <div  className="home-page gradient_bg">
            <div 
            id="homePage">                       
            <div className="naslov_container">
                <h1 className="naslov ulaz-desno">Reciklirajmo.hr</h1>  
                <p className="citat ulaz-dole">Živim, dakle, recikliram</p> 
          
            <Button onClick={()=>{                              
                    history.push("/start")                              
            }}  
            shape="round" 
            ghost 
            className="start_btn">Kreni</Button>
            </div>
            <Button
            id="loginBtn"
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
        </div>
    )
}

export default HomePage

