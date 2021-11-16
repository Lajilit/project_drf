import React from 'react'
import {Link} from "react-router-dom";

const UsersTable = ({users}) => {
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
            <tbody>
            {users.map((user) =>
                <UsersTableString key={user.id} user={user}/>)}
            </tbody>
        </table>
    )
}

const UsersTableString = ({user}) => {
    return (
        <tr>
            <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersListItem = ({userId, users}) => {
    let user = users.find((user) => user.id === userId)
    if (user) {
        return (
            <li><Link to={`/user/${user.id}`}>{user.username}</Link></li>
        )
    }
}

export {UsersListItem}
export default UsersTable
