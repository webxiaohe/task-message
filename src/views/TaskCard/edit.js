import React, {Component} from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import TimeSlot from '../../components/TimeSlot';
import { request, biz } from '../../library/wjs';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class TaskCardEdit extends Component {
    componentDidMount () {
        const { location: { state }, form: {setFieldsValue} } = this.props;
        if (state && state.detailId) {
            request.get(biz.api.TaskCardGetOne, {id: state.detailId}).then(data => {
                if ( +data.code === 0) {
                    const setParams = {
                        title: data.data.title,
                        startTime: moment(data.data.startTime),
                        endTime: moment(data.data.endTime)
                    }
                    setFieldsValue(setParams)
                }
            })
        }
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
                        this.handleBack();
                    }else{
                        message.error('添加任务卡失败');
                    }
                })
            } else {
                message.error('添加任务卡失败')
            }
        });
    }
    handleBack = () => {
        this.props.history.push('/app/task')
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
            <div className="edit-container">
                <Col offset={20}>
                    <Button icon="left" type="primary" onClick={this.handleBack}>返回</Button>
                </Col>
                <Col span={12} style={{marginTop: '10%'}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="任务卡标题">
                            {
                                getFieldDecorator('title', {
                                    rules: [{
                                        required: true, message: '请填写任务卡标题'
                                    }]
                                })(
                                    <Input className="width-300" />
                                )
                            }
                        </FormItem>
                        <TimeSlot getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} formItemLayout={formItemLayout} labelname="开始时间" fieldname="startTime" getFieldValue={getFieldValue} />
                        <TimeSlot getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} formItemLayout={formItemLayout} labelname="结束时间" fieldname="endTime" getFieldValue={getFieldValue} />
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Col>
            </div>
        );
    }
}
const wrapTaskCardEdit = Form.create()(TaskCardEdit);
export default wrapTaskCardEdit;