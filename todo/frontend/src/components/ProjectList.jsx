import React from 'react'
import {Link} from "react-router-dom";
import ProjectItem from "./ProjectItem";
import MyButton from "./UI/button/MyButton";


const ProjectList = ({projects, deleteProject, isAuthenticated}) => {
    if (!projects.length) {
        return (
            <h3 style={{textAlign: 'center'}}>Проекты не найдены</h3>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Все проекты
            </h1>
            {isAuthenticated &&
                <MyButton><Link className={'linkText'} to='/projects/create'>Create new project</Link></MyButton>
            }
            {projects.map((project) => <ProjectItem key={project.id}
                                                    project={project}
                                                    deleteProject={deleteProject}/>
            )}

        </div>
    )
}

export default ProjectList


