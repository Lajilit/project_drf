import React from 'react'
import UserItem from "./UserItem";

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
