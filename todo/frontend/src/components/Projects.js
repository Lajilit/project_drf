import React from 'react'
import {Link} from "react-router-dom";


const ProjectsTable = ({projects, deleteProject}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>
                    Название проекта
                </td>
                <td>
                    Ссылка на репозиторий
                </td>
                <td>
                    Пользователи проекта
                </td>
                <td>
                    Пользователи проекта
                </td>
            </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectsTableString key={`LPI${project.id}`}
                                                                project={project}
                                                                deleteProject={deleteProject}/>
                )}
            </tbody>
        </table>
    )
}

const ProjectsTableString = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>
                    {project.name}
                </Link>
            </td>
            <td>
                <a href={project.repo}>репозиторий проекта</a>
            </td>
            <td>
                <ul>
                    {project.users.map((user) =>
                        <li key={`PTSU${project.id}.${user.id}`}>
                            <Link to={`/user/${user.id}`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </li>
                    )}
                </ul>
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)}>
                    Delete project
                </button>
            </td>
        </tr>
    )
}

export {ProjectsTableString}
export default ProjectsTable


