import React, { Component } from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import TimeSlot from './TimeSlot';
import { request, biz } from '../library/wjs';
const FormItem = Form.Item;
const Option = Select.Option;
class TaskCardAdd extends Component {
    componentWillReceiveProps () {
        const { detailId } = this.props;
        console.log(detailId)
        // request.get(biz.api.TaskCardGetOne, {id: detailId}).then(data => {

        // })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const submitParams = {
                    title: values.title,
                    startTime: values.startTime.format('YYYY-MM-DD'),
                    endTime: values.endTime.format('YYYY-MM-DD'),
                };
                request.post(biz.api.AddTaskCardUrl, submitParams).then((data) => {
                    if (+data.code === 0){
                        message.success('添加任务卡成功');
                        this.props.handleOk();
                        this.handleReset();
                    }else{
                        message.error('添加任务卡失败');
                    }
                })
            } else {
                message.error('添加任务卡失败')
            }
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
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
        return (
            <Form onSubmit={this.handleSubmit}>
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
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}
const wrapTaskCardAdd = Form.create()(TaskCardAdd);
export default wrapTaskCardAdd;