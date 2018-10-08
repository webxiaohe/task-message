import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.less';
import wjs from './library/wjs';
import './manage.less';
import Routers from './routers';
import Routers_Mob from './routers_mob';
wjs.sso.refresh();
if (!wjs.utils.isMobile()) {
    ReactDOM.render(
        <Routers />
    , document.getElementById('root'));
} else {
    ReactDOM.render(
        <Routers_Mob />
    , document.getElementById('root'));
}
registerServiceWorker();
