/**   backend - 12.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from "react";
import API from "./API";

const AuthenticationContext = React.createContext();

class AuthenticationProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {is_authenticated: false};
    }

    componentDidMount() {
        const api = new API();
        api.validateLogin().then(success => {
            this.setState({is_authenticated: success});
        })
    }

    login = (password) => {
        const api = new API();
        return api.login(password).then(success => {
            this.setState({is_authenticated: success});
            return success;
        })

    };

    logout = () => {
        localStorage.removeItem('token');
        this.setState({is_authenticated: false})
    };

    render() {
        return (
            <AuthenticationContext.Provider
                value={{
                    is_authenticated: this.state.is_authenticated,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthenticationContext.Provider>
        )
    }
}

const AuthenticationConsumer = AuthenticationContext.Consumer;
export {AuthenticationProvider, AuthenticationConsumer}