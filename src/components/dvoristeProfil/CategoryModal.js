import React,{useEffect, useState} from 'react'
import {Modal} from 'antd';
import fetcher from '../../helpers/fetcher'
import './style.css'

const CategoryModal = ({modalData,visible,onOk,onCancel,sumAll}) => {

    const [recyclations, setrecyclations] = useState([])
    const [average, setaverage] = useState(0)
    const [sum, setsum] = useState(0)
    useEffect(()=>{
        console.log(sumAll)
        if(modalData.categoryId){
            fetcher("api/recyclations/dvoriste/"+ localStorage.userId+"/categories/"+modalData.categoryId+"/"+modalData.startDate+"/"+modalData.endDate)
            .then(res=>res.json())
            .then(res=>{                        
                setrecyclations(res)              
            })
        }        
    },[modalData])

    useEffect(()=>{        
        if(recyclations.length!==0){
            let sum = 0
            recyclations.map((rec)=>{
                sum += rec.weight
            })
            const avg = sum/recyclations.length
            setaverage(avg)  
            setsum(sum)                      
        }       
    },[recyclations])
    return (
        <Modal
        title={
            <>
            {"Statistika za "+ modalData.title}
            <p
            style={{                
                fontWeight:"400",
                marginBottom:"2px"
            }}>{"Period: "+ modalData.startDate+" - "+modalData.endDate}</p>
            </>
            
        }
        visible={visible}
        onOk={()=>onOk()}
        onCancel={()=>onCancel()}
        >
        <div className="modalContent">
            <div className="modalSection">
            Ukupni broj reciklacija: <p>{recyclations.length}  </p>        
            </div>
            <div className="modalSection">
            Ukupna težina: <p>{Math.round(sum * 100) / 100} kg </p>         
            </div>
            <div className="modalSection">
            Prosječna količina reciklacije: <p>{Math.round(average * 100) / 100} kg  </p>      
            </div>
            <div className="modalSection">
            Udio u ukupnom otpadu <p>{Math.round((100/sumAll*sum) * 100) / 100} %  </p>      
            </div>
        
        </div>
         </Modal>
         
    )
}



export default CategoryModal
