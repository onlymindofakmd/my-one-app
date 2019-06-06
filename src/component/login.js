import React, { Component } from 'react'
import {Form, Button, Input, Row, Col} from 'antd'

export default class Login extends Component{

    render(){
        return(
            <Form>
                <Row type="flex" align="middle" justify="center">
                    <Col span={6}>用户名：</Col>
                    <Col span={18}>
                        <Input type="text"></Input>
                    </Col>
                </Row>
                <Row type="flex" align="middle" justify="center">
                    <Col span={6}>密码：</Col>
                    <Col span={18}>
                        <Input type="password"></Input>
                    </Col>
                </Row>
                <Row type="flex" align="middle" justify="center">
                    <Col span={24}>
                        <Button value="提交" type="primary">Primary</Button>
                    </Col>
                </Row>
            </Form>
        ) 
    }
}
