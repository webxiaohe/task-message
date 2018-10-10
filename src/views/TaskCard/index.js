import React, { Component } from 'react';
import SearchList from '../../components/SearchList';
import { Divider, Button, Modal } from 'antd';
import TableList from '../../components/TableList';
import TaskCardAdd from '../../components/TaskCardAdd';
import { request, biz } from '../../library/wjs';
import moment from 'moment';
const bizApi = biz.api;
class TaskList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pageSize: 2,
            current: 1,
            total: 3,
            data: [],
            visible: false
        }
    }
    handleSearch = (value) => {
        console.log(value)
    }
    componentDidMount () {
        const { current, pageSize } = this.state;
        this.getList({offset: current, limit: pageSize});
    }
    handleEdit (record) {
        console.log(record)
    }
    showModal = () => {
        this.setState({
            visible: true,
        })
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
    changePage = (page, pageSize) => {
        this.setState({
            current: page
        })
        this.getList({offset: page, limit: pageSize});
    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
    }
    
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    render () {
        const { current, pageSize, total, data, visible } = this.state;
        const fieldsList = [
            {
                label: '任务名称',
                fieldname: 'taskName',
                type: 'input'
            }, {
                label: '开始时间',
                fieldname: 'startDate',
                type: 'startDate'
            }, {
                label: '结束时间',
                fieldname: 'endDate',
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
                <SearchList fieldsList={fieldsList} handleSearch={this.handleSearch} handleAdd={this.showModal.bind(this)}/>
                <TableList columns={columns} dataSource={data} pagination={pagination} />
                <Modal
                    title="添加任务卡"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TaskCardAdd />
                </Modal>
            </div>
        )
    }
}
export default TaskList;