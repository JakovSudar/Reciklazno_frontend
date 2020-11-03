import React from 'react'
import { Progress } from "antd";
import './style.css'


const CategoryItem = ({category}) => {    
    const roundedWeight = Math.round(category.yoursum * 100) / 100
    let max = Math.round(category.max * 100) / 100
    let min = Math.round(category.min * 100) / 100
    const normalised = ()=> {
        if(roundedWeight === max) return 1; 
        else if(roundedWeight === min) {
            min = 0;
        }
         return (roundedWeight - min) / (max - min)}

    return (        
            <div
            className="itemWrapper"
            style={{
                
            }} >
                <div        
                style={{                            
                    marginTop:"25px",
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <h2
                    style={{
                        width:"220px"
                    }}>{category.title}</h2>
                    <p
                    style={{
                        fontSize:"1.35rem",
                        float:"right",
                        fontWeight : "700",
                        color: "#3262a8"
                    }}
                    >{roundedWeight} kg</p>                        
                </div>
                <Progress
                    showInfo ={false}
                    strokeColor={{
                        "0%": "#ff1c1c",
                        "100%": "#0037fc"
                    }}
                    
                    percent={normalised() * 100}
                    status="active"
                />
            </div>            
    )
}

export default CategoryItem
