import React,{useState} from 'react'
import './style.css'
import { Redirect, useHistory } from 'react-router-dom';
import {baseURL,baseAppURL} from '../../constants'
import {message, Button } from 'antd';
import {  HomeOutlined } from '@ant-design/icons';
import fetcher from '../../helpers/fetcher'


const LoginPage = () => {
    const history = useHistory()
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const processLogin = ()=>{
        if(username.length === 0 || !username.trim()){
            message.error("Unesite ime!")
        }else if(password.length === 0 || !password.trim()){
            message.error("Unesite lozinku!")
        }else{            
            let data = new FormData()
            data.append('username',username)
            data.append('password',password)            
            fetch(baseURL+"api/login",
            {
                method:"POST",                
                body: (data)
            })            
            .then(res=>{
                
                if(res.status===200){
                    return res.json()
                }else{
                    return null
                }
            })
            .then(res=>{   
                if(res!==null){
                    localStorage.setItem('userId', res.id)
                    localStorage.setItem('username', res.username)
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('title', res.title)
                    window.location.replace(baseAppURL+"profile");
                }             
               
            })
        }
    }
    if(localStorage.getItem('token') !== null){
        return (<Redirect to='/profile' />)
    }else
    return (        
        <div
        className="container"
        >
            <div
            className="formContainer">
                <div className="form__group field">
                    <input type="input" className="form__field" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Username" name="Username" id='Username' required />
                    <label for="Username" className="form__label">Username</label>
                </div>
                <div className="form__group field">
                    <input type="password" className="form__field" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="Password" id='Password' required />
                    <label for="Password" className="form__label">Lozinka</label>
                </div>
                <button onClick={processLogin} className="btn_prijava">Prijava</button>
            </div>
            <Button
            style={{
                position:"fixed",
                top:"10px",
                right:"10px"
            }}
            shape="circle"
            size="large"
            icon={<HomeOutlined />}
            onClick={()=>{history.push("/")}}
            />          
        </div>
    )
}


export default LoginPage
