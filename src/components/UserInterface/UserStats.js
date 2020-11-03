import React,{useEffect, useState} from 'react'
import fetcher from '../../helpers/fetcher'
import CategoryItem from './CategoryItem'
import './style.css'

const UserStats = ({user}) => {

    const [sums, setSums] = useState("")
    const [loaded, setLoaded] = useState(false)
   
    useEffect(()=>{
        fetcher("api/recyclations/users/"+ user.id+"/grouped")
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            console.log(res)
            setSums(res)
            setLoaded(true)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps  

    useEffect(()=>{
        let items = document.getElementsByClassName("itemWrapper")        
        if(items.length === sums.length && items.length !== 0){
            Array.from(items).forEach((el)=>{
                el.style.transform = "scale(1)";                            
            })
            console.log("changed")            
        }             
    }) // eslint-disable-line react-hooks/exhaustive-deps  

    return (        
        <div>
            {loaded &&
            sums.map((category)=>{
                return (                    
                    <CategoryItem category={category} key={category.id}/>                     
                )
            })            
        }                         
        </div>
    )
}

export default UserStats
