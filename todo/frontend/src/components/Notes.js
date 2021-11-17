import React from 'react'
import {Link} from "react-router-dom";

const NotesTable = ({notes}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>
                    Заголовок заметки
                </td>
                <td>
                    Проект
                </td>
                <td>
                    Автор заметки
                </td>
                <td>
                    екст заметки
                </td>
            </tr>

            </thead>
            <tbody>
            {notes.map((note) =>
                <NoteTableString key={note.id} note={note}/>
            )}
            </tbody>
        </table>
    )
}

const NoteTableString = ({note}) => {
    return (
        <tr>
            <td>
                {note.name}
            </td>
            <td>
                <Link to={`/project/${note.project.id}`}>
                    {note.project.name}
                </Link>
            </td>
            <td>
                <Link to={`/user/${note.user.id}`}>
                    {note.user.firstName} {note.user.lastName}
                </Link>
            </td>
            <td>
                {note.text}
            </td>
        </tr>
    )
}

export default NotesTable
