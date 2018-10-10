import React, { Component } from 'react';
import { Table } from 'antd';
class TableList extends Component {
    render () {
        const { columns, dataSource, pagination } = this.props;
        return (
            <Table columns={columns} dataSource={dataSource} pagination={pagination}/>
        )
    }
}
export default TableList;