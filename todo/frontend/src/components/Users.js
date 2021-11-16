import React from 'react'
import {Link} from "react-router-dom";


const UserItem = ({user}) => {
    return (
        <tr>
            <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
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
