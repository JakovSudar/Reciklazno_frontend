import { useState, useEffect } from 'react';

const useSumAllCountall = (res)=>{
    const [sumAll, setSumAll] = useState(0)
    const [countAll, setCountAll] = useState(0)

    useEffect(()=>{        
        calculateAllSum(res)
        calculateCount(res)
    },[res])

    let calculateAllSum= (res)=>{
        let sumAll= 0 
        res.map((sum)=>{
            sumAll+=sum.sum
        })     
        setSumAll(sumAll)
    }

    let calculateCount = (res)=>{
        let count = 0;
        res.map((sum)=>{
            count+=sum.count
        })
        setCountAll(count)
    }

    return [sumAll, countAll]
}

export default useSumAllCountall