import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ProjectItem from "./ProjectItem";
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/modal/MyModal";
import ProjectForm from "./ProjectForm";
import ProjectFilter from "./PostFilter";


const ProjectList = ({projects, createProject, deleteProject, isAuthenticated, users, filter, setFilter}) => {
    const [modal, setModal] = useState(false);
    if (!isAuthenticated) {
        return (
            <h3 style={{textAlign: 'center'}}>Для просмотра списка проектов необходима авторизация</h3>
        )
    }
    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <ProjectForm createProject={(name, users, repo) => createProject(name, users, repo)}
                             users={users}
                             closeModal={setModal}/>
            </MyModal>

            <h1 style={{textAlign: 'center'}}>
                Все проекты
            </h1>

            <hr style={{margin: '15px 0'}}/>

            <ProjectFilter
                filter={filter}
                setFilter={(key, value) => setFilter(key, value)}/>

            <hr style={{margin: '15px 0'}}/>

            <MyButton onClick={() => setModal(true)}>Create new project</MyButton>

            {!projects.length
                ? <h2 style={{textAlign: 'center'}}>Проекты не найдены</h2>

                : projects.map((project) => <ProjectItem key={project.id}
                                                         project={project}
                                                         deleteProject={deleteProject}/>)
            }
        </div>
    )
}

export default ProjectList


