import React, { Component } from 'react';
import SearchList from './SearchList';
class TaskList extends Component {
    handleSearch = (value) => {
        console.log(value)
    }
    render () {
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
        ]
        return (
            <div className="task-container">
                <SearchList fieldsList={fieldsList} handleSearch={this.handleSearch}/>
            </div>
        )
    }
}
export default TaskList;