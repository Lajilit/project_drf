import React from 'react'
import {ProjectUser} from "./Project";
import {Link} from "react-router-dom";


const ProjectItem = ({project, users}) => {
    return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.name}</Link></td>
            <td><a href={project.repo}>репозиторий проекта</a></td>
            <td>
                <ul>
                    {project.users.map((userId) =>
                        <ProjectUser key={`${project.id}.${userId}`} userId={userId} users={users}/>
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
            <tbody>{projects.map((project) => <ProjectItem key={project.id} project={project} users={users}/>)}</tbody>
        </table>
    )
}


export default ProjectsList


