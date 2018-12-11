/**   backend - 12.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import './Layout.css';

import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Button} from "react-bootstrap";
import LandingPage from "./Pages/LandingPage";
import DataOverview from "./Pages/DataOverview";
import FeatureSettings from "./Pages/ActivitySettings";
import FeedbackSettings from "./Pages/FeedbackSettings/index";
import RegionSettings from "./Pages/RegionSettings/Page";
import {AuthenticationConsumer} from "./AuthenticationContext";
import AlgorithmSettings from "./Pages/AlgorithmSettings/index";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_menu_title: "Welcome"
        }
    }

    render() {
        return (
            <AuthenticationConsumer>
                {({is_authenticated, login, logout}) => (
                    <BrowserRouter basename={"/backend"}>
                        <div>
                            {console.log("render", this)}
                            <div className={"header"}>
                                <div className={"title"}>
                                    Travel region recommender BACKEND
                                </div>
                                <Button onClick={
                                    is_authenticated
                                        ? logout
                                        : login}>
                                    {is_authenticated ? 'Logout' : 'Login'}
                                </Button>
                            </div>
                            <div className={"layout"}>
                                <div className={"nav"}>
                                    <h3>Navigation TODO!</h3>
                                    <ul>
                                        <li><Link to='/'>Home</Link></li>
                                        {is_authenticated
                                            ? [(<li key={"features"}><Link to='/features'>Features</Link></li>),
                                                (<li key={"regions"}>< Link to='/regions'>Regions</Link></li>),
                                                (<li key={"algorithms"}>< Link to='/algorithms'>Recommenders</Link></li>),
                                                (<li key={"feedbackSettings"}>< Link to='/feedbackSettings'>Feedback</Link></li>)]
                                            : []
                                        }
                                    </ul>
                                </div>
                                <div className={"main"}>
                                    <Route path={'/'} exact component={LandingPage}/>
                                    <Route path={'/features'} exact
                                           render={() => <DataOverview data_type={'feature'}/>}/>
                                    <Route path={'/featureSettings/:item_key'} exact component={FeatureSettings}/>
                                    <Route path={'/regions'} exact render={() => <DataOverview data_type={'region'}/>}/>
                                    <Route path={'/regionSettings/:item_key'} exact component={RegionSettings}/>
                                    <Route path={'/algorithms'} exact render={() => <DataOverview data_type={'algorithm'}/>}/>
                                    <Route path={'/algorithmSettings/:item_key'} exact component={AlgorithmSettings}/>
                                    <Route path={'/feedbackSettings'} exact component={FeedbackSettings}/>
                                </div>
                            </div>
                        </div>
                    </BrowserRouter>
                )}
            </AuthenticationConsumer>
        );
    }
}

export default Layout;
