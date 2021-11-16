import React from 'react'
import {Link} from "react-router-dom";
import {UsersListItem} from "./Users";

const ProjectsTable = ({projects, users}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>Название проекта</td>
                <td>Ссылка на репозиторий</td>
                <td>Пользователи проекта</td>
            </tr>

            </thead>
            <tbody>{projects.map((project) => <ProjectsTableString
                key={`LPI${project.id}`} project={project}
                users={users}/>)}</tbody>
        </table>
    )
}

const ProjectsTableString = ({project, users}) => {
    return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td><a href={project.repo}>репозиторий проекта</a></td>
            <td>
                <ul>
                    {project.users.map((userId) =>
                        <UsersListItem key={`IPU${project.id}.${userId}`}
                                       userId={userId} users={users}/>
                    )}
                </ul>

            </td>
        </tr>
    )
}

export {ProjectsTableString}
export default ProjectsTable


