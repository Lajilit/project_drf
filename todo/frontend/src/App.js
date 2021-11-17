import React from 'react';
import './App.css';
import Footer from './components/Footer.js'
import UsersTable from './components/Users.js'
import ProjectsTable from "./components/Projects";
import NotesTable from "./components/Notes";
import ProjectPage from "./components/Project";
import UserProjectsTable from "./components/UserProjects";
import LoginForm from './components/Auth.js'

import axios from 'axios'
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie/lib";


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
            'user': {},
            'token': ''
        }
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('')
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    getToken(username, password) {
        axios
            .post(get_url('api-token-auth/'), {
                username: username,
                password: password
            })
            .then(response => {
                this.setToken(response.data['token'])
            }).catch(() => alert('Неверный логин или пароль'))
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    loadData() {
        const headers = this.getHeaders()
        axios
            .get(get_url('api/users'), {headers})
            .then(response => {
                const users = response.data.results;
                this.setState({'users': users})
            })
            .catch(error => {
                console.log(error)
                this.setState({'users': []})
            })

        axios
            .get(get_url('api/notes'), {headers})
            .then(response => {
                const notes = response.data.results;
                this.setState({'notes': notes})
            })
            .catch(error => {
                console.log(error)
                this.setState({'notes': []})
            })
        axios
            .get(get_url('api/projects'), {headers})
            .then(response => {
                const projects = response.data.results;
                this.setState({'projects': projects})
            })
            .catch(error => {
                console.log(error)
                this.setState({'projects': []})
            })
    }

    getUser(id) {
        const headers = this.getHeaders()
        console.log('call', get_url(`api/users/${id}`), {headers})
        axios
            .get(get_url(`api/users/${id}`), {headers})
            .then(response => {
                this.setState({user: response.data});
            })
            .catch(error => {
                console.log(error)
            })
    }

    getProject(id) {
        const headers = this.getHeaders()
        console.log('call', get_url(`api/projects/${id}`), {headers})
        axios
            .get(get_url(`api/projects/${id}`), {headers})
            .then(response => {
                this.setState({project: response.data});
                console.log('get', response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Пользователи</Link></li>
                            <li><Link to='/projects'>Проекты</Link></li>
                            <li><Link to='/notes'>Заметки</Link></li>
                            <li>{this.isAuthenticated() ?
                                <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/'>
                            <UsersTable users={this.state.users}/>
                        </Route>
                        <Route exact path='/projects'>
                            <ProjectsTable projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/notes'>
                            <NotesTable notes={this.state.notes}/>
                        </Route>
                        <Route path='/project/:id'>
                            <ProjectPage getProject={(id) => this.getProject(id)}
                                         project={this.state.project}
                                         notes={this.state.notes}/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProjectsTable getUser={(id) => this.getUser(id)}
                                               user={this.state.user}
                                               projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/login'>
                            <LoginForm getToken={(username, password) => this.getToken(username, password)}/>
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