import React from 'react'
import  {Statistic} from 'antd';
import { FaWeightHanging } from "react-icons/fa";
const UkupniSumWeight = ({sumAll, countAll}) => {
    return (
        <div  
            className="ulaz-dole"          
            style={{
                display:"flex",
                justifyContent: "center",
                flexWrap: "wrap",
                width:"100%",
                marginTop:"30px",
            }}>
            {      
                <>      
                <Statistic
                className= "circle-item circle-item-green circle-item-30-shrink"
                title="Ukupno kilograma"
                value= {sumAll}
                precision ={2}
                prefix={
                    <FaWeightHanging
                    size="0.7em" />
                }
                suffix =" kg"
                valueStyle={{ 
                    color: '#86CF69',
                    fontWeight:'700',
                    fontSize:'2rem'
                }}
                />                          
                <Statistic
                className= "circle-item circle-item-blue circle-item-30-shrink"
                title="Ukupno reciklacija"
                value= {countAll}                
                valueStyle={{ 
                    color: '#A393F6',
                    fontWeight:'700',
                    fontSize:'2rem'
                }}
                />       
                </>
            }
            </div>   

    )
}

export default UkupniSumWeight
