import React from 'react';
import axios from 'axios'
import _ from 'lodash';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import hash from 'object-hash';

import LoginForm from './components/LoginForm.jsx'
import NoteForm from "./components/NoteForm.jsx";
import ProjectForm from "./components/ProjectForm.jsx";


import Footer from './components/Footer.jsx'
import UserList from './components/UserList.jsx'
import ProjectList from "./components/ProjectList.jsx";
import NoteList from "./components/NoteList.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import UserProjectList from "./components/UserProjectList.jsx";

import MyButton from "./components/UI/button/MyButton";


import '../src/styles/App.css'
import ProjectFilter from "./components/PostFilter";

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
            'notes': [],
            'project': {},
            'user': {},
            'token': '',
            'filter': {
                'sort': 'id',
                'query': '',
                'ascending': true
            }
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
            .post(get_url('token-auth/'), {
                username: username,
                password: password
            })
            .then(response => {
                this.setToken(response.data['token'])
            })
            .catch(() => alert('Неверный логин или пароль'))
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
            .get(get_url('users'), {headers})
            .then(response => {
                const users = response.data.results;
                this.setState({'users': users})
            })
            .catch(error => {
                console.log(error)
                this.setState({'users': []})
            })

        axios
            .get(get_url('notes'), {headers})
            .then(response => {
                const notes = response.data.results;
                this.setState({'notes': notes})
            })
            .catch(error => {
                console.log(error)
                this.setState({'notes': []})
            })
        axios
            .get(get_url('projects'), {headers})
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
        // console.log('call', get_url(`users/${id}`), {headers})
        axios
            .get(get_url(`users/${id}`), {headers})
            .then(response => {
                this.setState({user: response.data});
            })
            .catch(error => {
                console.log(error)
            })
    }

    getProject(id) {
        const headers = this.getHeaders()
        // console.log('call', get_url(`projects/${id}`), {headers})
        axios
            .get(get_url(`projects/${id}`), {headers})
            .then(response => {
                this.setState({project: response.data});
                // console.log('get', response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    createNote(name, project, user, text) {
        const headers = this.getHeaders()
        const data = {name: name, project: project, user: user, text: text}
        // console.log('post', get_url(`notes/`), data, {headers})
        axios
            .post(get_url(`notes/`), data, {headers})
            .then(response => {
                let new_note = response.data
                new_note.project = this.state.projects.filter((item) => item.id === new_note.project)[0]
                new_note.user = this.state.users.filter((item) => item.id === new_note.user)[0]
                this.setState({notes: [...this.state.notes, new_note]})
                // this.loadData()
            })

            .catch(error => {
                console.log(error)
            })
    }

    createProject(name, users, repo) {
        const headers = this.getHeaders()
        const data = {name: name, users: users, repo: repo}
        // console.log('post', get_url(`projects/`), data, {headers})
        axios
            .post(get_url(`projects/`), data, {headers})
            .then(response => {
                let new_project = response.data
                new_project.users = new_project.users.map((id) => this.state.users.filter((user) => user.id === id)[0])
                this.setState({projects: [...this.state.projects, new_project]})
                // this.loadData()
            })

            .catch(error => {
                console.log(error)
            })

    }

    deleteNote(id) {
        const headers = this.getHeaders()
        axios.delete(get_url(`notes/${id}/`), {headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((item) => item.id !== id)})
                // this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(get_url(`projects/${id}/`), {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
                // this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    setFilter(key, value) {
        let filterToSet = this.state.filter
        filterToSet[key] = value
        this.setState({'filter': filterToSet})
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    sortByValue = (a, b, value, ascending) => (
        ascending
            ? a[value].localeCompare(b[value])
            : b[value].localeCompare(a[value])
    )

    sortById = (a, b, id, ascending) => (
        ascending
            ? a[id] - b[id]
            : b[id] - a[id]
    )

    // _.memoize - чтобы функция не вызывалась каждый раз при изменении любого состояния на странице,
    // resolver - чтобы сохранялись дополнительные условия сортировки
    getSortedAndSearchedProjects = _.memoize((projects, index, ascending, query) => {
        function searchByName(sortedProjects) {
            return sortedProjects.filter(project => project.name.toLowerCase().includes(query));
        }

        if (index) {
            if (index === 'id') {
                return searchByName([...projects].sort((a, b) => this.sortById(a, b, index, ascending)));
            }
            return searchByName([...projects].sort((a, b) => this.sortByValue(a, b, index, ascending)));
        }
        return searchByName(this.state.projects);
    }, (...args) =>
        `${hash(this.state.projects)}_${args[1]}_${args[2]}_${args[3]}`)


    render() {
        let sortedAndSearchedProjects
        sortedAndSearchedProjects = this.getSortedAndSearchedProjects(
            this.state.projects,
            this.state.filter.sort,
            this.state.filter.ascending,
            this.state.filter.query
        )

        return (
            <div className={'App'}>
                <BrowserRouter>
                    <div className={'login'}>{this.isAuthenticated() ?
                        <MyButton onClick={() => this.logout()}>Logout</MyButton> :
                        <LoginForm getToken={(username, password) => this.getToken(username, password)}/>}</div>

                    <nav className={'Menu'}>
                        <ul className={'MenuList'}>
                            <li className={'MenuItem'}><Link className={'linkText'} to='/'>Пользователи</Link></li>
                            <li className={'MenuItem'}><Link className={'linkText'} to='/projects'>Проекты</Link>
                            </li>
                            <li className={'MenuItem'}><Link className={'linkText'} to='/notes'>Заметки</Link></li>
                        </ul>


                    </nav>
                    <Switch>
                        <Route exact path='/'>
                            <UserList users={this.state.users}/>
                        </Route>
                        <Route exact path='/projects'>
                            <ProjectList
                                filter={this.state.filter}
                                setFilter={(key, value) => this.setFilter(key, value)}
                                projects={sortedAndSearchedProjects}
                                createProject={
                                    (name, users, repo) => this.createProject(name, users, repo)}
                                deleteProject={(id) => this.deleteProject(id)}
                                isAuthenticated={this.isAuthenticated()}
                                users={this.state.users}/>
                        </Route>
                        <Route exact path='/notes/create'>
                            <NoteForm createNote={
                                (name, project, user, text) => this.createNote(name, project, user, text)}
                                      users={this.state.users}
                                      projects={this.state.projects}/>
                        </Route>

                        <Route exact path='/notes'>
                            <NoteList notes={this.state.notes}
                                      deleteNote={(id) => this.deleteNote(id)}
                                      isAuthenticated={this.isAuthenticated()}/>
                        </Route>
                        <Route path='/project/:id'>
                            <ProjectDetail getProject={(id) => this.getProject(id)}
                                           project={this.state.project}
                                           notes={this.state.notes}
                                           deleteNote={(id) => this.deleteNote(id)}/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProjectList getUser={(id) => this.getUser(id)}
                                             user={this.state.user}
                                             projects={this.state.projects}
                                             deleteProject={(id) => this.deleteProject(id)}/>
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