import React, { Component } from 'react';
import { Form, Input, Col, Row, Button, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
class SearchList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: ''
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        const { form: {validateFields}, handleSearch } = this.props;
        validateFields((err, values) => {
            values.startTime = values.startTime ? values.startTime.format('YYYY-MM-DD') : '';
            values.endTime = values.endTime ? values.endTime.format('YYYY-MM-DD') : '';
            handleSearch(values);
        });
    }
    handleReset = () => {
        this.props.handleReset();
        this.props.form.resetFields();
    }
    getFields = () => {
        const { form: { getFieldDecorator }, fieldsList } = this.props;
        const children = [];
        fieldsList.map((item, index) => {
            children.push(
                <Col span={6} key={index}>
                    <FormItem label={item.label}>
                        {
                            item.type === 'input' && getFieldDecorator(item.fieldname)(
                                <Input />
                            )
                        }
                        {
                            item.type === 'startDate' && getFieldDecorator(item.fieldname)(
                                <DatePicker
                                    mode='date'
                                    showTime
                                    // onChange={this.changeStartDate}
                                />
                            )
                        }
                        {
                            item.type === 'endDate' && getFieldDecorator(item.fieldname)(
                                <DatePicker
                                    mode='date'
                                    showTime
                                    // onChange={this.changeEndDate}
                                />
                            )
                        }
                    </FormItem>
                </Col>
            )
        })
        return children;
    } 
    changeStartDate = (...rest) => {
        const { form: {setFieldsValue} } = this.props;
        const date = moment(rest[1]).add(7, 'days').format('YYYY/MM/DD'); //7天以前
        setFieldsValue({
            endDate: moment(date)
        })
    }
    changeEndDate = (...rest) => {
        const { form: {setFieldsValue} } = this.props;
        const date = moment(rest[1]).add(-7, 'days').format('YYYY/MM/DD'); //7天以前
        setFieldsValue({
            startDate: moment(date)
        })
    }
    render () {
        const { handleAdd } = this.props;
        return (
            <Form onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    {this.getFields()}
                </Row>
                <Row>
                    <Col style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                        <Button type="primary" icon="sync" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            重置
                        </Button>
                        <Button type="primary" icon="plus" style={{ marginLeft: 8 }} onClick={handleAdd}>
                            添加
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const wrapSearchList = Form.create()(SearchList)
export default wrapSearchList;