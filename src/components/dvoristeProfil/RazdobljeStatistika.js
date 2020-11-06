import React,{useEffect, useContext, useState} from 'react'
import fetcher from '../../helpers/fetcher'
import RecContext from '../../context/recyclation-context'
import { DatePicker } from 'antd';
import Recyclations from './Recyclations'
import CategoryModal from './CategoryModal'
import './style.css'
import CircleProgress from './CircleProgress'
import { Collapse } from 'antd';
import moment from 'moment';
import UkupniSumWeight from './UkupniSumWeight'
import useSumAllCountAll from './hooks/useSumAllCountall'
const { RangePicker } = DatePicker;

function RazdobljeStatistika() {
    const {recyclations, recDispatch} = useContext(RecContext)
    
    const [sums, setsums] = useState([])
    const [sumall, countAll] = useSumAllCountAll(sums)
    const [max, setmax] = useState(10)
    const [min, setmin] = useState(0)       
   
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [visible, setvisible] = useState(false)
    const [modalData, setmodalData] = useState("")
    const { Panel } = Collapse;  
    let isPanelOpen = false
    
    useEffect(() => {       
        recDispatch({
            type: "REMOVE_RECYCLATIONS",
            
        })
    }, [])

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
            fetcher("api/recyclations/dvoriste/"+ localStorage.userId+"/sums/"+startDate+"/"+endDate)
            .then(res=>res.json())
            .then(res=>{                      
                setsums(res)    
                setmax(Math.max.apply(Math, res.map(function(sum){ return sum.sum}))) 
                setmin( Math.min.apply(Math, res.map(function(sum){ return sum.sum})))                                
            })
        }         
    },[recyclations]) // eslint-disable-line react-hooks/exhaustive-deps  

    
    const yearClicked = ()=>{
       setstartDate(moment().startOf('year').format('yyyy-MM-DD'))
       setendDate(moment().endOf('year').format('yyyy-MM-DD'))
    }

    const openModal =(modalData)=>{     
        modalData={
            ...modalData,
            startDate: startDate,
            endDate: endDate
        }   
        setmodalData(modalData)
        setvisible(true)
    }

    const onChange = (dates, dateString)=>{
        setstartDate(dateString[0])
        setendDate(dateString[1])       
    }

    const panelChanged = ()=>{
        isPanelOpen=!isPanelOpen
        if(isPanelOpen){
            setTimeout(()=>{            
            var element = document.querySelector("#myPanel");            
            element.scrollIntoView({ behavior: 'smooth'});
            },400)
        
        }
    }
    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth:"100%",
            width:"100%"
        }}>
            <CategoryModal
            visible={visible}
            modalData= {modalData}
            onOk={()=>setvisible(false)}
            onCancel={()=>setvisible(false)}
            sumAll={sumall}
            />            
            <RangePicker       
            
            onChange={onChange}
            style={{
                marginBottom:"10px",
                width: "280px"
            }}
            />
            <button
            className="yearBtn"
            onClick={yearClicked}
                
            
            >
            Cijela godina
            </button>
            <div
            className= "circleContainer"
            style={{
                display:"flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                width:"100%"
            }}>
            {            
            sums.map((rec)=>{               
                return <CircleProgress openModal={openModal} rec={rec} min={min} max={max}/>
            })}
            </div>            
            
            {
            recyclations.length !== 0 && (
            <>
            <UkupniSumWeight
            sumAll={sumall}
            countAll = {countAll}
            />
            <Collapse 
            onChange={panelChanged}
            accordion>
                <Panel
                id="myPanel"              
                header="Prikaži sve reciklacije" key="1">
                    <Recyclations/>
                </Panel>
            </Collapse>
            </>
            )
            }
            {
            recyclations.length === 0 && (
                <p
                style={{                   
                    textAlign:"center",
                    fontSize:"1.4rem",
                    marginTop:"35px",
                    fontWeight:"500",
                    color:"green"
                }}>
                    Nema podataka za odabrano razdoblje!
                </p>
            )
            }
            
        </div>
    )
}

export default RazdobljeStatistika

