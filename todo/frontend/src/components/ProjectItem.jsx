import React from 'react';
import {Link} from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <div className={'item'}>
            <div className="item__content">
                <h2>
                    Проект <Link className={'linkText'} to={`/project/${project.id}`}>{project.id} {project.name}</Link>
                </h2>
                <div><a className={'linkText'} href={project.repo}>Репозиторий проекта</a></div>
                <div>
                    <strong>
                        Пользователи, подключенные к проекту
                    </strong>
                    <ul>
                        {project.users.map((user) =>
                            <li className={'listItem'} key={`${project.id}.${user.id}`}>
                                <Link className={'linkText'} to={`/user/${user.id}`}>
                                    {user.firstName} {user.lastName}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <MyButton onClick={() => deleteProject(project.id)}>
                Delete project
            </MyButton>
        </div>
    );
};

export default ProjectItem;