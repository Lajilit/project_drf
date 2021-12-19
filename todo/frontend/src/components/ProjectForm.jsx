import React from 'react'
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/MySelect";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            users: '',
            repo: '',
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
        this.props.closeModal(false)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">Название проекта</label>
                        <MyInput type="text" name="name"
                                 onChange={(event) => this.handleChange(event)}
                                 value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repo">Репозиторий проекта</label>
                        <MyInput type="url" name="repo"
                                 onChange={(event) => this.handleChange(event)}
                                 value={this.state.repo}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="users">Пользователи, подключенные к проекту</label>

                        <MySelect multiple
                                  name="users"
                                  onChange={(event) => this.handleChangeMulti(event)}>
                            {this.props.users.map((user) =>
                                <option key={user.id} value={user.id}>{user.username}</option>
                            )}
                        </MySelect>
                    </div>
                    <MyButton>Save new project</MyButton>
                </form>
            </div>
        );
    }
}

export default ProjectForm