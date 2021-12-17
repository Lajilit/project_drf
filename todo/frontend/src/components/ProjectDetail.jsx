import React from 'react'
import {useParams} from "react-router-dom";
import UserItem from "./UserItem";
import NoteItem from "./NoteItem";


const ProjectDetail = ({getProject, project, notes, deleteNote}) => {
    let {id} = useParams();
    if (!Object.keys(project).length || project.id !== +id) {
        getProject(id)
    }
    let projectUsers = project.users ? project.users : []
    let filtered_notes = notes.filter((note) => note.project.id === project.id)
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Проект {project.name}
            </h1>
            <p>
                <a className={'linkText'} href={project.repo}>Репозиторий проекта</a>
            </p>
            <h2 style={{textAlign: 'center'}}>
                Пользователи, подключенные к проекту
            </h2>
            <div>
                {projectUsers.map((user) => <UserItem key={`${project.id}.${user.id}`} user={user}/>)}
            </div>
            <h2 style={{textAlign: 'center'}}>
                Заметки проекта
            </h2>
            <div>
                {filtered_notes.map((note) => <NoteItem key={note.id} note={note} deleteNote={deleteNote}/>)}
            </div>
        </div>
    )
}


export default ProjectDetail


