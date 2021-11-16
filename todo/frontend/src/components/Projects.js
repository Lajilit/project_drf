import React from 'react'
import {Link} from "react-router-dom";

const ProjectUser = ({userId, users}) => {
    let user = users.find((user) => user.id === userId)
    if (user) {
        return (
            <li><Link to={`/user/${user.id}`}>{user.username}</Link></li>
        )
    }
}

    const ProjectItem = ({project, users}) => {
        return (
            <tr>
                <td><Link to={`/project/${project.id}`}>{project.name}</Link>
                </td>
                <td><a href={project.repo}>репозиторий проекта</a></td>
                <td>
                    <ul>
                        {project.users.map((userId) =>
                            <ProjectUser key={`IPU${project.id}.${userId}`}
                                         userId={userId} users={users}/>
                        )}
                    </ul>

                </td>
            </tr>
        )
    }

    const ProjectsList = ({projects, users}) => {
        return (
            <table>
                <thead>
                <tr>
                    <td>Название проекта</td>
                    <td>Ссылка на репозиторий</td>
                    <td>Пользователи проекта</td>
                </tr>

                </thead>
                <tbody>{projects.map((project) => <ProjectItem
                    key={`LPI${project.id}`} project={project}
                    users={users}/>)}</tbody>
            </table>
        )
    }

    export {ProjectItem, ProjectUser}
    export default ProjectsList


