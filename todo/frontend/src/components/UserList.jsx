import React from 'react'
import UserItem from "./UserItem";

const UserList = ({users, isAuthenticated}) => {
    if (!isAuthenticated) {
        return (
            <h3 style={{textAlign: 'center'}}>Для просмотра списка пользователей необходима авторизация</h3>
        )
    }
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
