import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter, Link} from "react-router-dom";

import LandingPage from './Pages/LandingPage';
import DataOverview from "./Pages/DataOverview";
import FeatureSettings from "./Pages/FeatureSettings";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className={"header"}>
                        Travel region recommender BACKEND
                    </div>
                    <div className={"layout"}>
                        <div className={"nav"}>
                            <h3>Navigation TODO!</h3>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/features'>Features</Link></li>
                            </ul>
                        </div>
                        <div className={"main"}>
                            <Route path={'/'} exact component={LandingPage}/>
                            <Route path={'/features'} exact render={() => <DataOverview data_type={'feature'}/>}/>
                            <Route path={'/featureSettings/:item_key'} exact component={FeatureSettings}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
