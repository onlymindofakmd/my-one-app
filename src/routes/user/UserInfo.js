import React from 'react'
import {Card, Cascader, Tooltip, Icon, Form, Checkbox, Select, Input, Button, Col, Row, message, BackTop} from 'antd'
import CustomBreadcrumb from '../../component/CustomBreadcrumb'
import TypingCard from '../../component/TypingCard'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item
const Option = Select.Option

class UserInfo extends React.Component{
    
    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
          labelCol: {
            xs: {span: 24},
            sm: {span: 4},
          },
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 12},
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 12,
              offset: 4,
            },
          },
        }
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: 86,
        })(
          <Select style={{width: 70}}>
            <Option value={86}>+86</Option>
            <Option value={87}>+87</Option>
          </Select>
        );
        const cardContent = '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景'
        return (
          <div>
            <CustomBreadcrumb arr={['用户', '基本信息']}/>
            <TypingCard source={cardContent}/>
            <Card bordered={false} title='基础表单'>
              <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                <FormItem label='用户名' {...formItemLayout}>
                  {
                    getFieldDecorator('loginName', {
                      rules: [
                        {
                          type: 'email',
                          message: '请输入正确的用户名'
                        },
                        {
                          required: true,
                          message: '请填写用户名（邮箱地址）'
                        }
                      ]
                    })(
                      <Input/>
                    )
                  }
                </FormItem>
                <FormItem {...formItemLayout} label={(
                  <span>
                    昵称&nbsp;
                    <Tooltip title='请输入您的昵称'>
                      <Icon type='question-circle-o'/>
                    </Tooltip>
                  </span>
                )}>
                  {
                    getFieldDecorator('nickName', {
                      rules: []
                    })(
                      <Input/>
                    )
                  }
                </FormItem>
                <FormItem label='真实姓名' {...formItemLayout} required>
                  {
                    getFieldDecorator('realname', {
                      rules: [
                        
                      ]
                    })(
                      <Input/>
                    )
                  }
                </FormItem>
                <FormItem label='电话' {...formItemLayout}>
                  {
                    getFieldDecorator('phone', {
                      rules: [
                        {
                          len: 11,
                          pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                          required: true,
                          message: '请输入正确的11位手机号码'
                        }
                      ]
                    })(
                      <Input addonBefore={prefixSelector}/>
                    )
                  }
                </FormItem>
                <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" disabled={!getFieldValue('agreement')}>提交</Button>
                </FormItem>
              </Form>
            </Card>
            <BackTop visibilityHeight={200} style={{right: 50}}/>
          </div>
        )
      }

}

const mapStateToProps = (state) => {
    return ({
        user: state.common.user
    })
}

const mapDispatchProps = (dispatch) => ({
    updateUser: dispatch()
})

export default withRouter(Form.create({})(connect(mapStateToProps,mapDispatchProps)(UserInfo)))