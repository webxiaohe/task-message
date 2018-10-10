import React, { Component } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import TimeSlot from './TimeSlot';
const FormItem = Form.Item;
const Option = Select.Option;
class TaskCardAdd extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render () {
        const { form: { getFieldDecorator, setFieldsValue, getFieldValue } } = this.props;
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
        return (
            <Form>
                <FormItem {...formItemLayout} label="任务卡标题">
                    {
                        getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请填写任务卡标题'
                            }]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <TimeSlot getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} formItemLayout={formItemLayout} labelname="开始时间" fieldname="startTime" getFieldValue={getFieldValue} />
                <TimeSlot getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} formItemLayout={formItemLayout} labelname="结束时间" fieldname="endTime" getFieldValue={getFieldValue} />
            </Form>
        );
    }
}
const wrapTaskCardAdd = Form.create()(TaskCardAdd);
export default wrapTaskCardAdd;