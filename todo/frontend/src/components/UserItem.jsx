import React from 'react';
import {Link} from "react-router-dom";


const UserItem = ({user}) => {
    return (
        <div className={'item'}>
            <div className="item__content">
                <Link className={'linkText'} to={`/user/${user.id}`}>
                    {user.username}
                </Link>
                <p>Имя пользователя: {user.firstName} {user.lastName} </p>
                <p>e-mail: {user.email}</p>
            </div>
        </div>
    )
};

export default UserItem;