import React from 'react'
import {Link, useParams} from "react-router-dom";


const ProjectPage = ({getProject, project, notes}) => {
    let {id} = useParams();
    if (!Object.keys(project).length || project.id !== +id) {
        getProject(id)
    }
    let projectUsers = project.users ? project.users : []
    let filtered_notes = notes.filter((note) => note.project.id === project.id)
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Проект {project.name}
            </h1>
            <p>
                <a className={'linkText'} href={project.repo}>Репозиторий проекта</a>
            </p>
            <h2 style={{textAlign: 'center'}}>
                Пользователи, подключенные к проекту
            </h2>
            <ol>
                {projectUsers.map((user) =>
                    <li className={'listItem'} key={`${project.id}.${user.id}`}>
                        <Link className={'linkText'} to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </li>
                )}
            </ol>
            <h2 style={{textAlign: 'center'}}>
                Заметки проекта
            </h2>
            <ol>
                {filtered_notes.map((note) =>
                    <li className={'listItem'} key={`${project.id}.${note.id}`}>
                        {note.name}
                    </li>
                )}
            </ol>
        </div>
    )
}


export default ProjectPage


