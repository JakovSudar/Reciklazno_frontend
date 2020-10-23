import React,{ useEffect, useState} from 'react'
import { Form, Input, Button,Select, Space } from 'antd';
import {  DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {baseURL} from '../../constants'
import './style/dodaj.css'


const { Option } = Select;

const ExistingPersonForm =(props) =>{

    const [categories, setCategories] = useState("")

    useEffect(()=>{
        fetch(baseURL+"api/categories")
        .then((res)=>res.json())
        .then(res=>setCategories(res))           
        
    },[])


    const onFinish = values => {
        
        
    const requestBody = values.recyclations.map((val)=>{
        return {...val,
        user_id: props.user.id,
        dvoriste_id: 1
    }
    })      
    
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
            console.log("Nije 200: ",res)
          }else{
              console.log("je 200: ", res)
              return res.json()
          }
      })
      .then(res=>{
          console.log("Final res: ", res)
      })
    };
  
    return (             
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
                            notFoundContent={<Button>nema</Button>}
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
                  onClick={() => add()}
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
      
    );
  };

export default ExistingPersonForm

