import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Home from '../views/Home';
import TransitPage from '../views/TransitPage/Transition';
import PageLayout from '../components/PageLayout';
import TaskList from '../components/TaskList';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
class RouterConfig extends Component {
    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/login" exact component={Home}></Route>
                    <Route path="/transit" exact component={TransitPage}></Route>
                    <PageLayout path="/app/task" exact child={TaskList} needAuth={true}></PageLayout>
                </Switch>
            </Router>
        );
    }
}
export default RouterConfig;