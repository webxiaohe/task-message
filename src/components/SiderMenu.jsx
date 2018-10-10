import React, {Component} from 'react';
import { Menu, Icon, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { Sider } = Layout;
class SiderMenu extends Component {
    render () {
        const { collapsed, changeMenu, selectedKeys, openKeys } = this.props;
        return (
            <Sider
                collapsed={collapsed}
                collapsible={true}
                reverseArrow={true}
                trigger={null}
            >
                <div className="logo" />
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    onClick={changeMenu} 
                    selectedKeys={[selectedKeys]} 
                    defaultOpenKeys={[openKeys]}
                >
                    <MenuItem key="/app/task">
                        <NavLink to="/app/task">
                            <Icon type="video-camera" />
                            <span>任务列表</span>
                        </NavLink>
                    </MenuItem>
                    <SubMenu key="nav1" title={<span><Icon type="mail"/><span>导航1</span></span>}>
                        <MenuItem key="/app/user">
                            <Icon type="user" />
                            <span>用户列表</span>
                        </MenuItem>
                    </SubMenu>
                    <MenuItem key="/app/conclusion">
                        <Icon type="upload" />
                        <span>nav 7</span>
                    </MenuItem>
                </Menu>
            </Sider>
        );
    }
}
export default SiderMenu;