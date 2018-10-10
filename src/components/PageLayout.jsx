import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import wjs from '../library/wjs';
import App from '../App';
class PageLayout extends Component {
    render () {
        const { child, needAuth, ...rest } = this.props;
        return (
            <Route {...rest} render={(matchProps)=>{
                return (!wjs.auth.isLogined() && needAuth) ? (
                        <Redirect to="/"/>
                    ) : (
                        <App Child={child} {...matchProps}/>
                    )
            }}/>
        )
    }
}
export default PageLayout;