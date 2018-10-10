import React, {Component} from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Home from '../views/Home';
import TransitPage from '../views/TransitPage/Transition';
import PageLayout from '../components/PageLayout';
import TaskCard from '../views/TaskCard';
import TaskCardEdit from '../views/TaskCard/edit';
import User from '../views/User';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
class RouterConfig extends Component {
    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/transit" exact component={TransitPage}></Route>
                    <PageLayout path="/app/task" exact child={TaskCard} needAuth={true}></PageLayout>
                    <PageLayout path="/task/edit" exact child={TaskCardEdit} needAuth={true}></PageLayout>
                    <PageLayout path="/user/center" exact child={User} needAuth={true}></PageLayout>
                </Switch>
            </Router>
        );
    }
}
export default RouterConfig;