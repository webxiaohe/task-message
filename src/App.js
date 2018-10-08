import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import SiderMenu from './components/SiderMenu.jsx';
import './App.less';
const { Header, Content } = Layout;
class App extends Component{
	constructor (props) {
		super(props);
		this.state = {
			collapsed: false,
			selectedKeys: '/app/task',
			openKeys: ''
		}
	}
	componentWillMount () {
		this.setSelect();
	}
	toggle = () => {
		const { collapsed } = this.state;
		this.setState({
			collapsed: !collapsed
		})
	}
	changeMenu = (item) => {
        this.setState({
			selectedKeys: item.keyPath[0],
			openKeys: item.keyPath[1]
        })
	}
	setSelect = () => {
		const { location: {pathname} } = this.props;
		let keyPath = [];
		if(/\/app\/task(\/)?$/g.test(pathname)) {
			keyPath[0] = '/app/task';
		} else if (/\/app\/user(\/)?$/g.test(pathname)) {
			keyPath[0] = '/app/user';
			keyPath[1] = 'nav1';
		} else if (/\/app\/conclusion(\/)?$/g.test(pathname)) {
			keyPath[0] = '/app/conlusion'
		}
		this.changeMenu({keyPath});
	}
	render() {
		const { collapsed, selectedKeys, openKeys } = this.state;
		const { Child } = this.props;
		return (
			<div className="App">
				<Layout style={{height: '100%'}}>
					<SiderMenu 
						collapsed={collapsed} 
						changeMenu={this.changeMenu}
						selectedKeys={selectedKeys}
						openKeys={openKeys}
					/>
					<Layout style={{minWidth: '1000px'}}>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
						</Header>
						<Content className="content-container">
							<Child />
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default App;
