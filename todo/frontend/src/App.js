import React from 'react';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'

const API = 'http://127.0.0.1:8000/api/'
const get_url = (url_name) => `${API}${url_name}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
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
    }

    render() {
        return (
            <div className={'App'}>
                <Menu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;


