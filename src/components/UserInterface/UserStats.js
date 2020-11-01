import React,{useEffect, useState} from 'react'
import fetcher from '../../helpers/fetcher'
import CategoryItem from './CategoryItem'
import {baseURL} from '../../constants'

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
    },[])

    return (
        
        <div>
            {loaded &&
            sums.map((category)=>{
                return <CategoryItem category={category} key={category.id}/>
            })}
        </div>
    )
}

export default UserStats
