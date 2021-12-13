import React from 'react'
import {Redirect} from "react-router-dom";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/input/MySelect";
import MyButton from "./UI/button/MyButton";
import MyTextarea from "./UI/input/MyTextarea";


class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            project: 0,
            user: 0,
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
                        <label htmlFor="name">Название заметки</label>
                        <MyInput name="name"
                                 value={this.state.name}
                                 onChange={(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="project">Проект</label>

                        <MySelect name="project"
                                  onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((project) =>
                                <option key={project.id} value={project.id}>{project.name}</option>)}
                        </MySelect>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">Пользователь</label>

                        <MySelect name="user"
                                  onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((user) =>
                                <option key={user.id} value={user.id}>{user.username}</option>)}
                        </MySelect>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Текст заметки</label>

                        <MyTextarea name="text" rows="10" cols="45"
                                    value={this.state.text}
                                    onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <MyButton>Save new note</MyButton>
                </form>
                {this.state.redirect ? (<Redirect push to="/notes"/>) : null}
            </>
        );
    }
}

export default NoteForm