import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>Username</td>
                <td>First name</td>
                <td>Last Name</td>
                <td>Email address</td>
            </tr>

            </thead>
            <tbody>{users.map((user) => <UserItem key={user.id} user={user}/>)}</tbody>
        </table>
    )
}

export default UsersList
