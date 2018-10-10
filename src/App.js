import React, { Component } from 'react';
import { Layout, Icon, Dropdown, Menu, Avatar } from 'antd';
import SiderMenu from './components/SiderMenu.jsx';
import { NavLink } from 'react-router-dom';
import { sso, auth } from './library/wjs';
import './App.less';
const { Header, Content } = Layout;
class App extends Component{
	constructor (props) {
		super(props);
		this.state = {
			collapsed: false,
			selectedKeys: '/app/task',
			openKeys: '',
			userInfo: '',
		}
	}
	componentWillMount () {
		this.setSelect();
		this.setState({
			userInfo: auth.getLoginedUser()
		})
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
	Logout = () => {
		sso.logOut()
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
		const { collapsed, selectedKeys, openKeys, userInfo } = this.state;
		const { Child } = this.props;
		const menu = (
			<Menu>
				<Menu.Item>
					<div onClick={this.Logout}>
						<Icon type="logout"/>
						退出登录
					</div>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/user/center">
						<Icon type="user"/>
						个人中心
					</NavLink>
				</Menu.Item>
			</Menu>
		);
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
						<Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
							<Dropdown overlay={menu} className="pr-25">
								<a className="ant-dropdown-link" href="#">
									<Avatar src={userInfo.avatar} /><span className="pl-5">{userInfo.nickname}</span>
								</a>
							</Dropdown>
						</Header>
						<Content className="content-container">
							<Child {...this.props}/>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default App;
