import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectItem} from "./Projects";


const UserProjectsList = ({projects, users}) => {
    const {id} = useParams()
    const user = users.find((user) => user.id === +id)
    const filtered_projects = projects.filter((project) => id in project.users)
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
                <tbody>{filtered_projects.map((project) => <ProjectItem key={`UPI${user.id}.${project.id}`}
                                                                        project={project}
                                                                        users={users}/>)}</tbody>
            </table>
        </div>

    )
}


export default UserProjectsList