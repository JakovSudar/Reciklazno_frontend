import React,{useEffect, useContext, useState} from 'react'
import fetcher from '../../helpers/fetcher'
import RecContext from '../../context/recyclation-context'
import Recyclations from './Recyclations'
import CircleProgress from './CircleProgress'
import CategoryModal from './CategoryModal'
import UkupniSumWeight from './UkupniSumWeight'
import useSumAllCountAll from './hooks/useSumAllCountall'
import './style.css'
import moment from 'moment';
import { Collapse ,DatePicker } from 'antd';

function MjesecnaStatistika() {        

    const {recyclations, recDispatch} = useContext(RecContext)    
    const [sums, setsums] = useState([])
    const [sumall, countAll] = useSumAllCountAll(sums)

    const [max, setmax] = useState(10)
    const [min, setmin] = useState(0) 
    const [isChanging, setisChanging] = useState(false)       

    const [startDate, setstartDate] = useState(null)
    const [endDate, setendDate] = useState(null)
    const [visible, setvisible] = useState(false)
    const [modalData, setmodalData] = useState("")
    const { Panel } = Collapse;  
    let isPanelOpen = false    

    useEffect(()=>{
        setstartDate(moment().startOf('month').format('YYYY-MM-DD'))
        setendDate(moment().endOf('month').format('YYYY-MM-DD'))
        
    },[])

    useEffect(()=>{        
        if(startDate!== null || endDate!==null){
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
        if(startDate!== null || endDate!==null){
            fetcher("api/recyclations/dvoriste/"+ localStorage.userId+"/sums/"+startDate+"/"+endDate)
            .then(res=>res.json())
            .then(res=>{                      
                setsums(res)                
                setmax(Math.max.apply(Math, res.map(function(sum){ return sum.sum}))) 
                setmin( Math.min.apply(Math, res.map(function(sum){ return sum.sum})))      
                setisChanging(false)           
            })
        }                
    },[recyclations])// eslint-disable-line react-hooks/exhaustive-deps  

    const openModal =(modalData)=>{     
        modalData={
            ...modalData,
            startDate: startDate,
            endDate: endDate
        }   
        setmodalData(modalData)
        setvisible(true)
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
    const onChange = (date)=>{ 
        recDispatch({
            type: "REMOVE_RECYCLATIONS",            
        })
        setsums([])   
        if(date!==null){            
            setisChanging(true)                                   
            setstartDate(date.startOf('month').format('YYYY-MM-DD'))
            setendDate(date.endOf('month').format('YYYY-MM-DD'))  
        }else{
            setstartDate(null)
            setendDate(null)
        }
              
    }
    return (
        <>
        <CategoryModal
        visible={visible}
        modalData= {modalData}
        onOk={()=>setvisible(false)}
        onCancel={()=>setvisible(false)}
        sumAll={sumall}
        />
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth:"100%"
        }}>
        
            <DatePicker 
            defaultValue={moment()}
            picker="month"
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
                return (
                      <CircleProgress openModal={openModal} rec={rec} min={min} max={max}/>                    
                )
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
                className="ulaz-dole"
                accordion
                onChange={panelChanged}
                >
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
                    (recyclations.length === 0 && !isChanging) && (
                    <div
                    style={{
                        textAlign:"center",
                        fontSize:"1.4rem",
                        marginTop:"35px",
                        fontWeight:"500",
                        color:"green"
                    }}>
                        Nema podataka za odabrani mjesec!
                    </div>
                
                )
                }
            
        </div>
        </>
        
    )
}

export default MjesecnaStatistika

