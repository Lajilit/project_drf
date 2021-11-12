import React from 'react';
import './App.css';
import UsersList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import ProjectsList from "./components/Project";

import axios from 'axios'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NotesList from "./components/Note";


const API = 'http://127.0.0.1:8000/api/'
const get_url = (url_name) => `${API}${url_name}`

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios
            .get(get_url('users'))
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users': users,
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get(get_url('projects'))
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get(get_url('notes'))
            .then(response => {
                const notes = response.data.results;
                this.setState(
                    {
                        'notes': notes,
                    }
                )
            })
            .catch(error => console.log(error))

    }


    render() {
        return (
            <div className={'App'}>
                <Menu/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'
                               component={() => <UsersList users={this.state.users}/>}/>
                        <Route exact path='/projects'
                               component={() => <ProjectsList projects={this.state.projects}
                                                              users={this.state.users}/>}/>
                        <Route exact path='/notes'
                               component={() => <NotesList notes={this.state.notes}/>}/>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>

                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;


