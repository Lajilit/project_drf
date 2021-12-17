import React from 'react'
import {useParams} from "react-router-dom";
import ProjectItem from "./ProjectItem";


const UserProjectList = ({getUser, user, projects, deleteProject}) => {
    let {id} = useParams();
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

            {filtered_projects.map((project) => <ProjectItem key={`${user.id}.${project.id}`}
                                                             project={project}
                                                             deleteProject={deleteProject}/>)}
        </div>
    )
}

export default UserProjectList