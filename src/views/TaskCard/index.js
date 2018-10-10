import React, { Component } from 'react';
import SearchList from '../../components/SearchList';
import { Divider, Button, Modal } from 'antd';
import TableList from '../../components/TableList';
import { request, biz } from '../../library/wjs';
import moment from 'moment';
const bizApi = biz.api;
class TaskList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pageSize: 5,
            current: 1,
            total: 3,
            data: [],
        }
    }
    handleSearch = (value) => {
        const { pageSize } = this.state;
        const searchParams = {
            title: value.title || '',
            startTime: value.startTime || '',
            endTime: value.endTime || ''
        }
        this.getList(Object.assign(searchParams, {limit: pageSize, offset: 1}));
    }
    componentDidMount () {
        const { current, pageSize } = this.state;
        this.getList({offset: current, limit: pageSize});
    }
    handleEdit (record) {
        this.props.history.push('/task/edit', {detailId: record.id});
    }
    handleAdd = () => {
        this.props.history.push('/task/edit');
    }
    getList = (data) => {
        request.get(bizApi.TaskCardListUrl, data).then((data) => {
            if (+data.code === 0) {
                let dataList = [];
                data.data.data.forEach(function(item,index){
                    dataList.push({
                        key: item.id,
                        id: item.id,
                        title: item.title,
                        department: item.department,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        type: item.type,
                        creatorUserName: item.creatorUserName
                    })
                })
                this.setState({
                    data: dataList,
                    total: data.data.count
                })
            }
        })
    }
    handleReset = () => {
        const { pageSize } = this.state;
        this.getList({offset: 1, limit: pageSize});
        this.setState({
            current: 1
        })
    }
    changePage = (page, pageSize) => {
        this.setState({
            current: page
        })
        this.getList({offset: page, limit: pageSize});
    }
    render () {
        const { current, pageSize, total, data } = this.state;
        const fieldsList = [
            {
                label: '任务名称',
                fieldname: 'title',
                type: 'input'
            }, {
                label: '开始时间',
                fieldname: 'startTime',
                type: 'startDate'
            }, {
                label: '结束时间',
                fieldname: 'endTime',
                type: 'endDate'
            }
        ];
        const columns = [{
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '开始时间',
            dataIndex: 'startTime',
            render: (text) => (<span>{moment(text).format('YYYY-MM-DD')}</span>)
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            render: (text) => (<span>{moment(text).format('YYYY-MM-DD')}</span>)
        }, {
            title: '部门',
            dataIndex: 'department',
        }, {
            title: '创建者姓名',
            dataIndex: 'creatorUserName',
        }, {
            title: '操作',
            dataIndex: 'action',
            width: 200,
            render: (text, record) => (
                <span>
                    <Button type="primary" icon="edit" size="small" ghost onClick={this.handleEdit.bind(this,record)} />
                    <Divider type="vertical" />
                    <Button type="danger" icon="delete" size="small" ghost />
                </span>
            ),
        }];
        const pagination = {
            current,
            pageSize,
            total,
            onChange: this.changePage
        }
        return (
            <div className="task-container">
                <SearchList fieldsList={fieldsList} handleSearch={this.handleSearch} handleAdd={this.handleAdd} handleReset={this.handleReset}/>
                <TableList columns={columns} dataSource={data} pagination={pagination} />
            </div>
        )
    }
}
export default TaskList;