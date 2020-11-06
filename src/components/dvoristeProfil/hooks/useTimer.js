import {useState, useRef, useEffect} from 'react'

const useTimer = (startVal, endVal, interval, startIncrement,isLinear= true) => {
    const [timer, setTimer] = useState(startVal)
    const increment = useRef(null)
    const [add, setadd] = useState(startIncrement)

    useEffect(() => {       
        handleStart()
      }, []);

    const handleStart = () => {        
        increment.current = setInterval(() => {
          setTimer((timer) => timer + add)
        }, interval)
      }
    const handlePause = () => {
        clearInterval(increment.current)        
    }

    useEffect(()=>{  
        if(!isLinear){
            if(timer>30){
                setadd(add*2)
            }  
            if(timer>50){
                setadd(add*2)
            }    
            if(timer>70){
                setadd(add*2)
            }
        }        
        if(timer>endVal){
            handlePause()
            
        }
    },[timer])

    return timer
}

export default useTimer
