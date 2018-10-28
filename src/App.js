import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter, Link} from "react-router-dom";

import LandingPage from './Pages/LandingPage';
import DataOverview from "./Pages/DataOverview";
import FeatureSettings from "./Pages/FeatureSettings";
import  RegionSettings from "./Pages/RegionSettings/Page";

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
                                <li><Link to='/regions'>Regions</Link></li>
                            </ul>
                        </div>
                        <div className={"main"}>
                            <Route path={'/'} exact component={LandingPage}/>
                            <Route path={'/features'} exact render={() => <DataOverview data_type={'feature'}/>}/>
                            <Route path={'/featureSettings/:item_key'} exact component={FeatureSettings}/>
                            <Route path={'/regions'} exact render={() => <DataOverview data_type={'region'}/>}/>
                            <Route path={'/regionSettings/:item_key'} exact component={RegionSettings}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
