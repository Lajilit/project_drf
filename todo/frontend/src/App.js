import React, {useMemo} from 'react';
import _ from 'lodash';
import hash from 'object-hash';
import Footer from './components/Footer.jsx'
import UserList from './components/UserList.jsx'
import ProjectList from "./components/ProjectList.jsx";
import NotesTable from "./components/NoteList.jsx";
import ProjectPage from "./components/ProjectDetail.jsx";
import UserProjectsTable from "./components/UserProjects.jsx";
import LoginForm from './components/LoginForm.jsx'
import '../src/styles/App.css'

import axios from 'axios'
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import NoteForm from "./components/NoteForm.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import MyButton from "./components/UI/button/MyButton";
import MySelectSort from "./components/UI/select/MySelectSort";
import MyInput from "./components/UI/input/MyInput";


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
            'sort': 'id',
            'searchQuery': '',
            'ascending': 'true'
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
                //     let new_note = response.data
                //     const project = this.state.projects.filter((item) => item.id === new_note.project)[0]
                //     new_note.project = project
                //     const user = this.state.users.filter((item) => item.id === new_note.user)[0]
                //     new_note.user = user
                //     this.setState({notes: [...this.state.notes, new_note]})
                this.loadData()
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
                //     let new_note = response.data
                //     const project = this.state.projects.filter((item) => item.id === new_note.project)[0]
                //     new_note.project = project
                //     const user = this.state.users.filter((item) => item.id === new_note.user)[0]
                //     new_note.user = user
                //     this.setState({notes: [...this.state.notes, new_note]})
                this.loadData()
            })

            .catch(error => {
                console.log(error)
            })
    }

    deleteNote(id) {
        const headers = this.getHeaders()
        axios.delete(get_url(`notes/${id}/`), {headers})
            .then(response => {
                // this.setState({notes: this.state.notes.filter((item) => item.id !== id)})
                this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(get_url(`projects/${id}/`), {headers})
            .then(response => {
                // this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
                this.loadData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    selectSortMethod(sort) {
        this.setState({'sort': sort});
    }

    selectAscendingMethod(ascending) {
        if (ascending === 'true') {
            this.setState({'ascending': true});
        } else {
            this.setState({'ascending': false});
        }
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

    getSortedProjects = _.memoize((projects, index, ascending) => {
        console.log('works')
        if (this.state.sort) {
            if (this.state.sort === 'id') {
                return [...projects].sort((a, b) => this.sortById(a, b, index, ascending))
            }
            return [...projects].sort((a, b) => this.sortByValue(a, b, index, ascending))
        }
        return this.state.projects;
    }, (...args) => `${hash(this.state.projects)}_${args[1]}_${args[2]}`)


    render() {
        let sortedProjects
        sortedProjects = this.getSortedProjects(
            this.state.projects,
            this.state.sort,
            this.state.ascending
        )
        let sort = this.selectSortMethod.bind(this)
        let ascending = this.selectAscendingMethod.bind(this)
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
                        <Route exact path='/projects/create'>
                            <ProjectForm createProject={
                                (name, users, repo) => this.createProject(name, users, repo)}
                                         users={this.state.users}/>
                        </Route>
                        <Route exact path='/projects'>
                            <hr style={{margin: '15px 0'}}/>
                            <div>
                                <MyInput
                                    value={this.state.searchQuery}
                                    onChange={(e) => this.setState({'searchQuery': e.target.value})}
                                    placeholder='Поиск...'/>

                                <MySelectSort
                                    value={this.state.sort}
                                    onChange={sort}
                                    defaultValue="Сортировка"
                                    options={[
                                        {value: 'id', name: 'В порядке добавления'},
                                        {value: 'name', name: 'По названию'},
                                    ]
                                    }
                                />
                                <MySelectSort
                                    value={this.state.ascending}
                                    onChange={ascending}
                                    defaultValue="Порядок сортировки"
                                    options={[
                                        {value: 'true', name: 'А-я'},
                                        {value: 'false', name: 'Я-а'},
                                    ]
                                    }
                                />
                            </div>
                            <ProjectList
                                projects={sortedProjects}
                                deleteProject={(id) => this.deleteProject(id)}
                                isAuthenticated={this.isAuthenticated()}/>
                        </Route>
                        <Route exact path='/notes/create'>
                            <NoteForm createNote={
                                (name, project, user, text) => this.createNote(name, project, user, text)}
                                      users={this.state.users}
                                      projects={this.state.projects}/>
                        </Route>

                        <Route exact path='/notes'>
                            <NotesTable notes={this.state.notes}
                                        deleteNote={(id) => this.deleteNote(id)}
                                        isAuthenticated={this.isAuthenticated()}/>
                        </Route>
                        <Route path='/project/:id'>
                            <ProjectPage getProject={(id) => this.getProject(id)}
                                         project={this.state.project}
                                         notes={this.state.notes}
                                         deleteNote={(id) => this.deleteNote(id)}/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProjectsTable getUser={(id) => this.getUser(id)}
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