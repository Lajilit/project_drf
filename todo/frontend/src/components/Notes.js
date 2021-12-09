import React from 'react'
import {Link} from "react-router-dom";

const NotesTable = ({notes, deleteNote}) => {
    return (
        <>
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
                        Текст заметки
                    </td>
                    <td></td>
                </tr>

                </thead>
                <tbody>
                {notes.map((note) => <NoteTableString key={note.id}
                                                      note={note}
                                                      deleteNote={deleteNote}/>
                )}
                </tbody>
            </table>
            <Link to='/notes/create'>Create</Link>
        </>

    )
}

const NoteTableString = ({note, deleteNote}) => {
    return (
        <tr>
            <td>
                {note.name}
            </td>
            <td>
                <Link to={`/project/${note.project.id}/`}>
                    {note.project.name}
                </Link>
            </td>
            <td>
                <Link to={`/user/${note.user.id}/`}>
                    {note.user.firstName} {note.user.lastName}
                </Link>
            </td>
            <td>
                {note.text}
            </td>
            <td>
                <button onClick={() => deleteNote(note.id)}>
                    Delete note
                </button>
            </td>
        </tr>
    )
}

export default NotesTable
