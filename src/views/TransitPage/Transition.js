import React, {Component} from 'react';
import Loading from './Loading';
import wjs from '../../library/wjs';

class Transition extends Component {

    componentDidMount() {
        setInterval(() => {
            this.waitLogin();
        }, 500)
    }

    waitLogin() {
        console.log(wjs.auth.isLogined())
        if (wjs.auth.isLogined()) {
            var redirectUrl = wjs.utils.getQueryParam("redirect");
            console.log(redirectUrl)
            var isNullOrEmpty = wjs.utils.isNullOrEmpty(redirectUrl)
            if (isNullOrEmpty || redirectUrl.endsWith(':3000') || redirectUrl.endsWith(':3000/')) {
                window.location.href = "/app/task";
            } else {
                window.location.href = redirectUrl;
            }
            // if (/.+:3000(\/)?$/.test(redirectUrl)) {
            //     window.location.href = "/app";
            // } else {
            //     window.location.href = redirectUrl;
            // }
        } 
    }

    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <Loading />
            </div>
        );
    }

}

export default Transition;