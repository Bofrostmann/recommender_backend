import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faWrench} from '@fortawesome/free-solid-svg-icons'
import Layout from "./Layout";
import {AuthenticationProvider} from "./AuthenticationContext";

library.add(faWrench);

class App extends Component {
    render() {
        return (
            <AuthenticationProvider>
                <Layout/>
            </AuthenticationProvider>
        );
    }
}

export default App;
