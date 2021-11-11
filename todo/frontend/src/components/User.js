import React from 'react'


const UserItem = ({item}) => {
    return (
        <tr>
            <td>{item.username}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
        </tr>
    )
}

const UserList = ({users: items}) => {
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
            <tbody>{items.map((item) => <UserItem key={item.id} item={item}/>)}</tbody>
        </table>
    )
}


export default UserList
