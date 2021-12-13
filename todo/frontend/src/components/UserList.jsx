import React from 'react'
import {Link} from "react-router-dom";
import UserItem from "./UserItem";
import MyButton from "./UI/button/MyButton";
import ProjectItem from "./ProjectItem";

const UserList = ({users}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Все пользователи
            </h1>

            {users.map((user) =>
                <UserItem key={user.id} user={user}/>
            )}

        </div>
    )
}

export default UserList
