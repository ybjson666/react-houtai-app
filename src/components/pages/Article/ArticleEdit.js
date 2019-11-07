import React, { Component } from 'react'
import { Card, Button, Form,Input, message,DatePicker} from 'antd';



const Item=Form.Item;

 class ArticleEdit extends Component {

    handleSubmit=(e)=>{
        e.preventDefault();
        
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log(values)
            }
        })
    }

    seleTime=()=>{

    }
    seleOk=()=>{

    }


    render() {
       
        const { getFieldDecorator } =this.props.form;

        const formItemLayOut={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:16
            }
        }

        console.log(this.props.match.params.id)
        return (
            <div>
                <Card
                    title={this.props.location.state.title}
                    bordered={false}
                    extra={<Button >取消</Button>}
                >
                    <Form onSubmit={this.handleSubmit} {...formItemLayOut}>
                        <Item label="标题">
                            {
                                getFieldDecorator('title',{
                                    rules:[{required:true,message:"标题为必填项"}]
                                })(
                                    <Input placeholder="标题"/>
                                )
                            }
                        </Item>
                        <Item label="作者">
                            {
                                getFieldDecorator('author',{
                                    rules:[{required:true,message:"作者为必填项"}]
                                })(
                                    <Input placeholder="author"/>
                                )
                            }
                        </Item>
                        <Item label="阅读量">
                            {
                                getFieldDecorator('amount',{
                                    rules:[{required:true,message:"阅读量为必填项"}]
                                })(
                                    <Input placeholder="0" />
                                )
                            }
                        </Item>
                        <Item label="创建时间">
                            {
                                getFieldDecorator('creatime',{
                                    rules:[{required:true,message:"创建时间为必填项"}]
                                })(
                                    <DatePicker showTime placeholder="选择时间" onChange={this.seleTime} onOk={this.seleOk}/>
                                )
                            }
                        </Item>
                        
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>提交</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(ArticleEdit);