import React,{useEffect, useState} from 'react'
import { Progress } from 'antd';

const CircleProgress = ({rec, min, max}) => {   
    

    const [prog, setprog] = useState(100)

    /*useEffect(() => {
        const interval = setInterval(() => {
          setprog(prog => prog+2);          
        }, 20);
        
        return () => clearInterval(interval);
      }, []);*/

    
    const clicked= ()=>{
        
    }
    const normalised = (rec.sum - min)/ (max-min)*100
    const roundedWeight = Math.round(rec.sum * 100) / 100
    return (
        <div  
        onClick={clicked}        
        key={rec.categoryId}
        className="circle-item"
        style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            flex: "1 0 18%",
            
        }}>
            <p
            style={{
                fontWeight:"600",
                marginBottom:"2px"

            }}>{rec.title}</p>
            <Progress                       
            strokeColor={{                            
                '0%': '#108ee9',
                '100%': '#87d068',
            }}  
            type="circle"
            percent={prog<normalised? prog: normalised}
            format={
                () => 
                <> 
                    {prog/5<roundedWeight? prog/5 : roundedWeight} kg 
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
