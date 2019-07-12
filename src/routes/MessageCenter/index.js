import React from 'react'
import { Input, Row, Col, List, Typography } from 'antd';
import { ENETRESET } from 'constants';
import {connect} from 'react-redux'

const { TextArea } = Input;
var ws


class MessageCenter extends React.Component {
    state = {
        showMsgs : "",
        limsgs : new Array()
    }

    componentDidMount(){
        ws = new WebSocket("ws://127.0.0.1:26669/")
        ws.onmessage = this.abc
        ws.onopen = setTimeout(this.op,1500)
    }

    op = () => {
        ws.send('{"command":"REG","data":"Hello Server","userId":"'+this.props.user.loginName+'"}')
    }

    abc = (v) => {
        let ms = this.state.limsgs
        if(ms.length===10){
            ms.shift()
        }
        let jsonData = JSON.parse(v.data);
        ms.push(jsonData)
        this.setState({
            showMsgs: this.state.showMsgs + v.data + "\n",
            limsgs: ms
        })
    }

    test = (val) => {
        ws.send('{"command":"data","data":"'+val+'","userId":"'+this.props.user.loginName+'"}')
    }

    render(){
        return (
            <div>
                <Row>
                    <Col>
                        <List
                            header={<div>WebSocket 测试</div>}
                            footer={<div>This is the end of this list</div>}
                            bordered
                            dataSource={this.state.limsgs}
                            renderItem={item => (
                                <List.Item>
                                <Typography.Text mark>[{item.userId}]</Typography.Text> {item.data}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextArea id="showArea" placeholder="Autosize height based on content lines" 
                            autosize={{ minRows: 5, maxRows: 5 }} value={this.state.showMsgs}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ margin: '24px 0' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextArea name="inputArea" onPressEnter={(event) => {
                            this.test(event.target.value)
                            event.target.value = ""
                            event.preventDefault()
                        }}
                            placeholder="Autosize height with minimum and maximum number of lines"
                            autosize={{ minRows: 1, maxRows: 1 }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        user: state.common.user
    })
}

const mapDispatchProps =  (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchProps)(MessageCenter)