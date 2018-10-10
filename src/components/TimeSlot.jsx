import React, { Component } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
class TimeSlot extends Component {
    changeStartDate = (...rest) => {
        const { setFieldsValue, getFieldValue } = this.props;
        const date = moment(rest[1]).endOf('week').add(-1, 'days').format('YYYY/MM/DD'); // 设置为本周五
        const endTime = getFieldValue('endTime');
        if(!endTime || moment(rest[1]).valueOf() - endTime.valueOf() > 0) {
            setFieldsValue({
                endTime: moment(date)
            })
        }
    }
    changeEndDate = (...rest) => {
        const { setFieldsValue, getFieldValue } = this.props;
        const date = moment(new Date()).format('YYYY/MM/DD');
        const startTime = getFieldValue('startTime');
        if(!startTime || moment(rest[1]).valueOf() - startTime.valueOf() <= 0) {
            setFieldsValue({
                startTime: moment(date)
            })
        }
    }
    render () {
        const { getFieldDecorator, formItemLayout, labelname, fieldname } = this.props;
        return (
            <FormItem {...formItemLayout} label={labelname}>
                {
                    fieldname === 'startTime' && getFieldDecorator(fieldname, {
                        rules: [{
                            required: true, message: '请选择'+labelname
                        }]
                    })(
                        <DatePicker
                            mode='date'
                            showTime
                            onChange={this.changeStartDate}
                        />
                    )
                }
                {
                    fieldname === 'endTime' && getFieldDecorator(fieldname, {
                        rules: [{
                            required: true, message: '请选择'+labelname
                        }]
                    })(
                        <DatePicker
                            mode='date'
                            showTime
                            onChange={this.changeEndDate}
                        />
                    )
                }
            </FormItem>
        )
    }
}
export default TimeSlot;