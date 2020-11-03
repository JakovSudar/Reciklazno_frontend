import React,{ useEffect, useState, useContext} from 'react'

import RecContext from '../../context/recyclation-context'
import {baseURL} from '../../constants'
import { Table, Tag, Button,Popconfirm } from 'antd';
import './dodajReciklazu/style/dodaj.css'
import{    
    DeleteOutlined
}from "@ant-design/icons";


const Recyclations = () => {           
    const {recyclations, recDispatch} = useContext(RecContext)

    const [data, setData] = useState("")
    
    function confirm(id) {   
        fetch(baseURL+"api/recyclations/"+id,
        {
            method: "DELETE",
            
            headers: {                
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.status === 200){
                const filtered = recyclations.filter((rec)=>{
                    return rec.id !== id
                })        
                recDispatch({
                    type: "POPULATE_RECYCLATIONS",
                    recyclations: filtered
                })
            }
        })           
    }  
    useEffect(()=>{             
        let tableData = recyclations.map((rec)=>{           
           const key = rec.id
           const title = rec.category.title
           const catId = rec.category.id
           const category = {title,catId}
           const weight = rec.weight
           const firstName = rec.user.firstName
           const lastName = rec.user.lastName 
           const oib = rec.user.oib   
           return {key,category,weight,firstName,lastName,oib}
        })     
        setData(tableData)  
    },[recyclations])

    const colors= ["magenta","geekblue",  "gold", "lime", "green", "cyan" , "purple"]
    const columns = [
        {
          title: 'Ime',
          dataIndex: 'firstName',
          width: 130
          
        },
        {
          title: 'Prezime',
          dataIndex: 'lastName',
          width: 130
        
        },
        {
            title: 'OIB',
            dataIndex: 'oib',
            width: 180
            
        },
        {
          title: 'Kategorija',
          dataIndex: 'category',          
          width: 130,
          render: category =>(                  
            <Tag color={colors[category.catId]} key={category.title}>
            {category.title.toUpperCase()}            
            </Tag>              
          ),          
        },
        {
            title: 'Težina',
            dataIndex: 'weight',                  
            width: 90,
            sorter: {
                compare: (a, b) => a.weight - b.weight,
                multiple: 3,
              },
            render: weight =>(
                <p style={{
                    marginTop: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "rgb(19, 47, 173)"
                }}>{weight}  kg</p>
            ),                     
        },
        {
            title: "",
            dataIndex: "id",
            width: 90,
            render: id =>(
                <>                                 
                <Popconfirm                    
                    title="Jeste li sigurni?"
                    onConfirm={ ()=>{confirm(id)}  }
                    onCancel={()=>{}}
                    okText="Da"
                    cancelText="Ne"                                       
                >
                <Button 
                shape="circle"
                style={{
                    marginLeft:"3px"
                }}
                type="danger"                
                icon={<DeleteOutlined />}/>
                 </Popconfirm>                  
                </>
            ), 
        },             
      ];
    
    return(
        <>
        <Table 
            columns={columns} 
            dataSource={data}  
            size="small" 
            pagination={{ pageSize: 50 }} 
            scroll={{ y: 600}} 
            style={{
                marginTop:"20px"
        }}        
        />,
        </>
    )
}
export default Recyclations