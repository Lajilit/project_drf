import React from 'react';
import './App.css';
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import UsersTable from './components/Users.js'
import ProjectsTable from "./components/Projects";
import NotesTable from "./components/Notes";
import ProjectPage from "./components/Project";
import UserProjectsTable from "./components/UserProjects";

import axios from 'axios'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";


const API = 'http://127.0.0.1:8000/'
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
            'notes': [],
            'project': {},
            'user': {}
        }
    }

    load_data() {
        axios
            .get(get_url('api/users'))
            .then(response => {
                const users = response.data.results;
                this.setState({'users': users})
            })
            .catch(error => console.log(error))

        axios
            .get(get_url('api/notes'))
            .then(response => {
                const notes = response.data.results;
                this.setState({'notes': notes})
            })
            .catch(error => console.log(error))
        axios
            .get(get_url('api/projects'))
            .then(response => {
                const projects = response.data.results;
                this.setState({'projects': projects})
            })
            .catch(error => console.log(error))
    }

    getUser(id) {
        console.log('call', get_url(`api/users/${id}`))
        axios
            .get(get_url(`api/users/${id}`))
            .then(response => {
                this.setState({user: response.data});
            })
            .catch(error => console.log(error))
    }

    getProject(id) {
        console.log('call', get_url(`api/projects/${id}`))
        axios
            .get(get_url(`api/projects/${id}`))
            .then(response => {
                this.setState({project: response.data});
                console.log('get', response.data);
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/'>
                            <UsersTable
                                users={this.state.users}/>
                        </Route>
                        <Route exact path='/projects'>
                            <ProjectsTable
                                projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/notes'>
                            <NotesTable
                                notes={this.state.notes}/>
                        </Route>
                        <Route path='/project/:id'>
                            <ProjectPage
                                getProject={(id) => this.getProject(id)}
                                project={this.state.project}
                                notes={this.state.notes}/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProjectsTable
                                getUser={(id) => this.getUser(id)}
                                user={this.state.user}
                                projects={this.state.projects}/>
                        </Route>
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


