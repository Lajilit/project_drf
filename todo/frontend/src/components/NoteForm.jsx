import React from 'react'
import {Redirect} from "react-router-dom";


class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            project: props.projects[0].id,
            user: props.users[0].id,
            text: '',
            redirect: false
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
    }

    handleSubmit(event) {
        this.props.createNote(this.state.name, this.state.project, this.state.user, this.state.text)
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
                        <label htmlFor="project">project</label>

                        <select className="form-control"
                                name="project"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((project) => <option key={project.id}
                                                                          value={project.id}>{project.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">user</label>

                        <select className="form-control"
                                name="user"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((user) => <option key={user.id}
                                                                    value={user.id}>{user.username}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">text</label>

                        <input type="text" className="form-control" name="text" value={this.state.text}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
                {this.state.redirect ? (<Redirect push to="/notes"/>) : null}
            </>
        );
    }
}

export default NoteForm