import React, {Component} from 'react';
import { Col, Form, Input, Button, Select, message } from 'antd';
import { request, biz } from '../../library/wjs';
const bizApi = biz.api;
const Option = Select.Option;
const FormItem = Form.Item;
class User extends Component {
    constructor (props) {
        super(props);
        this.state = {
            departList: []
        }
    }
    componentDidMount () {
        this.getDepartList();
        this.getUserInfor();
    }
    getDepartList = () => {
        request.get(bizApi.DepartmentListUrl).then(data => {
            if (data.code === 0) {
                this.setState({
                    departList: data.data.data
                })
            }
        })
    }
    getUserInfor = () => {
        const { setFieldsValue } = this.props.form;
        request.get(bizApi.UserInforUrl, {id: 1}).then(data => {
            if (data.code === 0) {
                setFieldsValue({
                    realName: data.data.realName,
                    department: data.data.department
                })
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            request.post(bizApi.UserInforEditUrl, values).then(data => {
                if (data.code === 0) {
                    message.success('修改成功！')
                } else {
                    message.error('修改失败！')
                }
            })
        });
    }
    render () {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { getFieldDecorator } = this.props.form;
        const { departList } = this.state;
        return (
            <div className="edit-container">
                <Col span={12} style={{marginTop: '10%'}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="姓名">
                            {
                                getFieldDecorator('realName', {
                                    rules: [{
                                        required: true, message: '请填写个人真实姓名'
                                    }]
                                })(
                                    <Input className="width-300" />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="部门">
                            {
                                getFieldDecorator('department', {
                                    rules: [{
                                        required: true, message: '请选择所在部门'
                                    }]
                                })(
                                    <Select placeholder="请选择部门">
                                        {
                                            departList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Col>
            </div>
        );
    }
}
const wrapUser = Form.create()(User);
export default wrapUser;