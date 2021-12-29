import React from 'react';
import {Link} from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const NoteItem = ({note, deleteNote}) => {
    return (
        <div className={'item'}>
            <div className="item__content">
                <h2>                {note.name}</h2>
                <div>
                    <p>Проект:
                        <span>
                            <Link className={'linkText'} to={`/project/${note.project.id}/`}>
                                {` ${note.project.name}`}
                            </Link>
                        </span>
                    </p>
                </div>
                <div>
                    <p>Пользователь:
                        <span>
                            <Link className={'linkText'} to={`/user/${note.user.id}/`}>
                                {` ${note.user.firstName} ${note.user.lastName}`}
                            </Link>
                        </span>
                    </p>
                </div>
                <div>
                    <p>Текст заметки:
                        <span>
                            {` ${note.text}`}
                        </span>
                    </p>
                </div>
            </div>
            <MyButton onClick={() => deleteNote(note.id)}>
                Delete note
            </MyButton>
        </div>
    );
};

export default NoteItem;