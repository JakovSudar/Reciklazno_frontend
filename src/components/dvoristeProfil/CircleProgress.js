import React,{useEffect, useState, useRef} from 'react'
import { Progress } from 'antd';

const CircleProgress = ({rec, min, classNm="circle-item-black", max, flex="1 0 18%" ,weight=true ,openModal = ()=>{}}) => {   
    min = Math.round(min * 100) / 100
    const normalised = (rec.sum - min)/ (max-min)*100   
    const roundedWeight = Math.round(rec.sum * 100) / 100    
    return (
        <div  
        onClick={()=>{openModal(rec)}}      
        key={rec.categoryId}
        id={rec.categoryId}
        className={classNm + " circle-item circle-item-18 ulaz-desno"}
       >
            <p
            style={{
                fontWeight:"600",
                marginBottom:"2px",
                textAlign: "center"
            }}>{rec.title}</p>
            <Progress                       
            strokeColor={{                            
                '0%': '#108ee9',
                '100%': '#87d068',
            }}  
            type="circle"
            percent={roundedWeight===min?0.1:normalised}
            format={
                () => 
                <> 
                    {roundedWeight} {weight && "kg"} 
                    <p style={{
                        marginBottom:"0px", 
                        fontSize:"0.9rem",
                        marginTop:"9px",
                        fontWeight:"600"
                    }}>{rec.count}
                    </p>  
                </> 
            } 
            />                        
        </div>
    )
}

export default CircleProgress
