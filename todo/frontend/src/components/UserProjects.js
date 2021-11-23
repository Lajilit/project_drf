import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectsTableString} from "./Projects";

const UserProjectsTable = ({getUser, user, projects}) => {
    let {id} = useParams();
    console.log(projects)
    if (!Object.keys(user).length || user.id !== +id) {
        getUser(id)
    }
    let filtered_projects = projects.filter((project) => {
        for (let i = 0; i < project.users.length; i++) {
            if (project.users[i].id === +id)
                return true;
        }
    })
    return (
        <div>
            <h1>
                Проекты пользователя {user.username}
            </h1>
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
                </tr>

                </thead>
                <tbody>
                {filtered_projects.map((project) =>
                    <ProjectsTableString
                        key={`UPTP${user.id}.${project.id}`}
                        project={project}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default UserProjectsTable