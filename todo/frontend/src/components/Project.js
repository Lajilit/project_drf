import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectUser} from "./Projects";


const ProjectDetail = ({getProject, project, users, notes}) => {
    let {id} = useParams();
    if (!Object.keys(project).length || project.id !== +id) {
        getProject(id)
    }
    let projectUsers = project.users ? project.users : []
    let filtered_notes = notes.filter((note) => note.project === project.id)
    return (
        <div>
            <h1>Проект {project.name}</h1>
            <p><a href={project.repo}>Репозиторий проекта</a></p>
            <h2>Пользователи, подключенные к проекту</h2>
            <ol>
                {projectUsers.map((userId) =>
                    <ProjectUser key={`DPU${project.id}.${userId}`}
                                 userId={userId} users={users}/>
                )}
            </ol>
            <h2>Заметки проекта</h2>
            <ol>
                {filtered_notes.map((note) => <li
                    key={`DPN${project.id}.${note.id}`}>{note.name}</li>)}
            </ol>
        </div>
    )
}


export default ProjectDetail


