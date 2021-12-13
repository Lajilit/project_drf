import React from 'react'
import {Redirect} from "react-router-dom";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";


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
            <div>
                <form className={'loginForm'} onSubmit={
                    (event) => this.handleSubmit(event)
                }>
                    <MyInput type="text" name="username" placeholder="login"
                        // value={this.state.username}
                           onChange={(event) =>
                               this.handleOnChange(event)
                           }/>
                    <MyInput type="password" name="password" placeholder="password"
                        // value={this.state.password}
                           onChange={(event) =>
                               this.handleOnChange(event)
                           }/>
                    <MyButton>Login</MyButton>
                </form>
                {this.state.redirect ? (<Redirect push to="/users"/>) : null}
            </div>
        );
    }
}

export default LoginForm

