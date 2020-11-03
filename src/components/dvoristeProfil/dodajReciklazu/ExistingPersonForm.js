import React,{ useEffect, useState, useContext} from 'react'
import { Form, Input, Button,Select, Space,notification } from 'antd';
import {  DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ProfileContext from '../../../context/profile-context'
import {baseURL} from '../../../constants'
import RecContext from '../../../context/recyclation-context'
import './style/dodaj.css'
import fetcher from '../../../helpers/fetcher'
const { Option } = Select;

const ExistingPersonForm =({added}) =>{
    
    const [categories, setCategories] = useState("")
    const {user} = useContext(ProfileContext)
    const {recDispatch} = useContext(RecContext)
    const [newCategory, setNewCategory] = useState('')
    
    useEffect(()=>{
        fetch(baseURL + "api/categories")
        .then((res)=>res.json())
        .then(res=>setCategories(res))                  
    },[])

    const addNewCategory = () =>{      
      const merged = [...categories]
      if(newCategory.length === 0 || !newCategory.trim()){
        notification.error({
          style: {
              border: "1px solid red"
          },
          duration: "2",
          message: `Prazan input`,          
          placement: "topRight"
        });
      }else{
        
        const options ={
          method: "POST",
          body: JSON.stringify({title: newCategory})
        }
        fetcher("api/categories/",options)
        .then(res=> res.json())
        .then(res=>{          
          merged.push(res)
          setCategories(merged)
        })    
    
      }     
      
    }
    const onFinish = values => {            
      const requestBody = values.recyclations.map((val)=>{
          return {...val,
          user_id: user.id,
          dvoriste_id: localStorage.userId
      }})     
    
      fetch(baseURL+"api/recyclations/",
      {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(requestBody)
      })
      .then(res=>{
          if(res.status !==200){            
            return null
          }else{  
            notification.success({
              style: {
                  border: "1px solid green"
              },
              duration: "2",
              message: `Reciklacije dodane!`,
              description:
                "",
              placement: "topRight"
            });   
              added()         
              return res.json()
          }
      })
      .then(recyclations=>{          
            recDispatch({
              type:"POPULATE_RECYCLATIONS",
              recyclations
            })                   
      })
    };
  
    return (     
        <>          
        <Form 
        name="dynamic_form_item"          
        onFinish={onFinish}>
            <Form.List            
            name="recyclations"        
            >            
                {(fields, { add, remove }, { errors }) => (
                <>                
                {fields.map((field, index) => (                        
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                        {...field}
                        name={[field.name, 'category_id']}
                        fieldKey={[field.fieldKey, 'category']}
                        rules={[{ required: true, message: ' ' }]}
                        >
                            <Select                           
                            name="category"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Kategorija"
                            dropdownRender={menu=>(
                              <div>
                              {menu}                              
                              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                <Input style={{ flex: 'auto', height:"30px" }} value={newCategory} placeholder="Nova kategorija" onChange={(e)=>{setNewCategory(e.target.value)}} />
                                <a
                                  style={{ flex: 'none', padding: '2px', display: 'block', cursor: 'pointer' }}    
                                  onClick={addNewCategory}                              
                                >
                                  <PlusOutlined /> Dodaj
                                </a>
                              </div>
                            </div>
                            )

                            }                         
                            optionFilterProp="children"                    
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            >                    
                            {
                                categories.map((categorie)=>{
                                    return <Option value={categorie.id}>{categorie.title}</Option>
                                })                        
                            }                        
                            </Select>              
                        </Form.Item>
                        <Form.Item
                            {...field}
                            name={[field.name, 'weight']}
                            fieldKey={[field.fieldKey, 'weight']}
                            rules={[{ required: true, message: ' ' }]}
                            >
                            <Input 
                                type="number"
                                placeholder="kg"
                                style={{
                                    width:"70px",
                                    marginLeft:"6px"                                
                                }}
                            />
                        </Form.Item>
                        <DeleteOutlined 
                        key=""
                        style={{marginLeft: '5px', color:'red'}}
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        />
                    </Space>                                                         
                ))}
       
                <Button
                  type="dashed"
                  onClick={() => 
                    {
                      if(fields.length <9){
                        add()
                      }
                    }
                    }
                  style={{ 
                    width: '170px',
                    
                    }}
                  icon={<PlusOutlined />}
                >
                  Dodaj kategoriju
                </Button>               
                <Form.ErrorList errors={errors} />
              
            </>
          )}
        </Form.List>    
          <Button type="primary" htmlType="submit"
          shape="round"                    
          style={{
              marginTop:"10px"
          }}>
            Submit
          </Button>
        
      </Form>
      </> 
    );
  };

export default ExistingPersonForm

