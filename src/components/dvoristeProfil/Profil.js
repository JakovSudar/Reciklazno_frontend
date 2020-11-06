import React,{useEffect, useState} from 'react'
import './style.css'
import  {Statistic, Popover} from 'antd';
import fetcher from './../../helpers/fetcher'
import UkupniSumWeight from './UkupniSumWeight'
import { BsFillPersonFill } from "react-icons/bs";
import {AiOutlineRise} from "react-icons/ai";

const Profil = () => {
    const [sumStats, setsumStats] = useState({})
    const [city, setcity] = useState({})

    useEffect(() => {
    fetcher("api/dvorista/"+localStorage.userId)
    .then(res=>res.json())
    .then(res=> setcity(res.city))
       fetcher("api/recyclations/dvoriste/stats/"+ localStorage.userId)
       .then(res=>res.json())
       .then(res=>{
           setsumStats(
               res
           )
       })
    },[])

    const content = (        
          <p>Broj novih korisnika u tekućem mjesecu</p>          
        
      );
    return (
        <div
        className="holder"
        style={{
            width:"100%",
            
        }}>
            <h1
            style={{
                fontSize:"2.4rem",
                width:"100%"
            }}
            >{localStorage.title}</h1>    
            <div
            className="white-shadow ulaz-dole"
            style={{
                width:"100%",
                fontSize:"1.5rem",
                marginBottom:"10px",             
            }}>
                <p
                className="description"
                >Grad: {city.title}</p>
                <p
                className="description"
                >Poštanski broj: {city.postal}  </p>          
            </div>       
            <UkupniSumWeight 
            
            sumAll={sumStats.sum} 
            countAll={sumStats.count}/>       
            <div            
            style={{
                marginTop:"30px",
                display:"flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                width:"100%"
            }}>
            {      
                <>      
                <div
                className= "double-item ulaz-dole">
                <Statistic 
                style={{
                    width:"49%",
                    textAlign: "center"
                }}               
                title="Broj korisnika"
                value= {sumStats.people}                
                prefix={
                    <BsFillPersonFill 
                    style={{
                        position:"relative",
                        bottom:"-2px"
                    }}                   
                    size="0.9em" />
                }                
                valueStyle={{ 
                    color: '#AEAFB1',
                    fontWeight:'700',
                    fontSize:'2rem',                                       
                }}
                /> 
                <div
                style={{
                    height:"80%",
                    width:"1px",
                    background:"rgba(77, 77, 77, 0.466)",
                    boxShadow: "0px 0px 3px 0px rgba(77, 77, 77, 0.966)"
                }}>
                </div>
                <Popover content={content} >
                <Statistic                
                title="Novih"
                style={{
                    width:"49%",
                    textAlign: "center"
                }}
                value= {sumStats.newPeople}                
                prefix={
                    sumStats.newPeople>0 &&
                    <AiOutlineRise 
                    style={{
                        position:"relative",
                        bottom:"-2px"
                    }}                   
                    size="0.9em" />
                }                
                valueStyle={{                     
                    color: sumStats.newPeople>0?'#86CF69': '#AEAFB1',
                    fontWeight:'700',
                    fontSize:'2rem',                                       
                }}
                /> 
                </Popover>
                </div>   
            
                <Statistic
                className= "circle-item circle-item-grey circle-item-30 ulaz-dole"
                title="Kategorija reciklirano"
                value= {sumStats.categories}                
                             
                valueStyle={{ 
                    color: '#86CF69',
                    fontWeight:'700',
                    fontSize:'2rem',                                       
                }}
                /> 
                </>
            }
            
            </div>  
                                            
        </div>
    )
}


export default Profil
