import React,{useEffect, useContext, useState} from 'react'
import fetcher from '../../helpers/fetcher'
import RecContext from '../../context/recyclation-context'
import { DatePicker } from 'antd';
import Recyclations from './Recyclations'

import './style.css'
import moment from 'moment';
import CircleProgress from './CircleProgress'
import { Collapse } from 'antd';


function DnevnaStatistika() {
    const {recyclations, recDispatch} = useContext(RecContext)
    
    const [sums, setsums] = useState([])
    const [max, setmax] = useState(10)
    const [min, setmin] = useState(0)       
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const { Panel } = Collapse;  

    useEffect(()=>{
        setstartDate(moment().format('YYYY-MM-DD'))    
        setendDate(moment().format('YYYY-MM-DD'))    
    },[])

    useEffect(()=>{
        if(endDate !==""){
            fetcher("api/recyclations/dvoriste/"+ localStorage.userId+"/"+startDate+"/"+endDate)
            .then(res=>res.json())
            .then(res=>{
                recDispatch({
                    type: "POPULATE_RECYCLATIONS",
                    recyclations: res
                })
            }) 
        }       
    },[endDate]) // eslint-disable-line react-hooks/exhaustive-deps  

    useEffect(()=>{       
        if(startDate!==""){
            fetcher("api/recyclations/dvoriste/"+ localStorage.userId+"/sums/"+startDate+"/"+startDate)
            .then(res=>res.json())
            .then(res=>{                      
                setsums(res)    
                setmax(Math.max.apply(Math, res.map(function(sum){ return sum.sum}))) 
                setmin( Math.min.apply(Math, res.map(function(sum){ return sum.sum}))  )       
            })
        }         
    },[recyclations]) // eslint-disable-line react-hooks/exhaustive-deps  

    const onChange = (date, dateString)=>{
        setstartDate(dateString)
        setendDate(dateString)       
    }
    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <DatePicker 
            defaultValue={moment()}
            style={{
                marginBottom:"10px"
            }}
            onChange={onChange} />
            <div
            className= "circleContainer"
            style={{
                display:"flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
            }}>
            {            
            sums.map((rec)=>{               
                return <CircleProgress rec={rec} min={min} max={max}/>
            })}
            </div>            
            <Collapse accordion>
            <Panel header="Prikaži sve reciklacije" key="1">
                <Recyclations/>
            </Panel>
            </Collapse>
        </div>
    )
}

export default DnevnaStatistika

