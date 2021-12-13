import React from 'react'
import {Redirect} from "react-router-dom";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            users: props.users[0].id,
            repo: '',
            redirect: false
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleChangeMulti(event) {
        this.setState(
            {
                [event.target.name]: Array.from(event.target.selectedOptions, item => item.value)
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users, this.state.repo)
        event.preventDefault()
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="users">users</label>

                        <select className="form-control"
                                multiple
                                name="users"
                                onChange={(event) => this.handleChangeMulti(event)}>
                            {this.props.users.map((user) => <option key={user.id}
                                                                    value={user.id}>{user.username}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repo">repo</label>

                        <input type="text" className="form-control" name="repo" value={this.state.repo}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
                {this.state.redirect ? (<Redirect push to="/projects"/>) : null}
            </>
        );
    }
}

export default ProjectForm