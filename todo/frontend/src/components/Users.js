import React from 'react'
import {Link} from "react-router-dom";

const UsersTable = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>
                    Username
                </td>
                <td>
                    First name
                </td>
                <td>
                    Last Name
                </td>
                <td>
                    Email address
                </td>
            </tr>

            </thead>
            <tbody>
                {users.map((user) =>
                    <UsersTableString key={user.id} user={user}/>
                )}
            </tbody>
        </table>
    )
}

const UsersTableString = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`/user/${user.id}`}>
                    {user.username}
                </Link>
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

export default UsersTable
