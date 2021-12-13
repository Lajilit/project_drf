import React from 'react'
import {Redirect} from "react-router-dom";


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    handleOnChange(event) {
        // console.log(`${event.target.name} ${event.target.value}`)
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // console.log(`${this.state.username} ${this.state.password}`)
        this.props.getToken(this.state.username, this.state.password)
        event.preventDefault()
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <>
                <form onSubmit={
                    (event) => this.handleSubmit(event)
                }>
                    <input type="text" name="username" placeholder="login"
                        // value={this.state.username}
                           onChange={(event) =>
                               this.handleOnChange(event)
                           }/>
                    <input type="password" name="password" placeholder="password"
                        // value={this.state.password}
                           onChange={(event) =>
                               this.handleOnChange(event)
                           }/>
                    <input type="submit" value="Login"/>
                </form>
                {this.state.redirect ? (<Redirect push to="/users"/>) : null}
            </>
        );
    }
}

export default LoginForm

