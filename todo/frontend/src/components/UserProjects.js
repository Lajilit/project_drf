import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectItem} from "./Projects";


const UserProjectsList = ({getUser, user, projects, users}) => {
    let {id} = useParams();
    if (!Object.keys(user).length || user.id !== +id) {
        getUser(id)
    }
    let filtered_projects = projects.filter((project) => {
        for (var i = 0; i < project.users.length; i++) {
            if (project.users[i] === +id)
                return project;
        }
    })
    return (
        <div>
            <h1>Проекты пользователя {user.username}</h1>
            <table>
                <thead>
                <tr>
                    <td>Название проекта</td>
                    <td>Ссылка на репозиторий</td>
                    <td>Пользователи проекта</td>
                </tr>

                </thead>
                <tbody>
                {filtered_projects.map((project) =>
                    <ProjectItem
                        key={`UPI${user.id}.${project.id}`}
                        project={project}
                        users={users}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default UserProjectsList