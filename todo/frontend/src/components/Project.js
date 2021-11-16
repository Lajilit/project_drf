import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectUser} from "./Projects";


const ProjectDetail = ({projects, users, notes}) => {
    const {id} = useParams();
    const project = projects.find((project) => project.id === +id)
    if (project) {
        const filtered_notes = notes.filter((note) => note.project === project.id)
        return (
            <div>
                <h1>Проект {project.name}</h1>
                <p><a href={project.repo}>Репозиторий проекта</a></p>
                <h2>Пользователи, подключенные к проекту</h2>
                <ol>
                    {project.users.map((userId) =>
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
    return (
        <div>
        </div>
    )
}


export default ProjectDetail


