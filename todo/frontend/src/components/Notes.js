import React from 'react'


const NoteItem = ({note}) => {
    return (
        <tr>
            <td>{note.name}</td>
            <td>{note.project}</td>
            <td>{note.user}</td>
            <td>{note.text}</td>
        </tr>
    )
}


const Noteslist = ({notes}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>Заголовок заметки</td>
                <td>Проект</td>
                <td>Автор заметки</td>
                <td>Текст заметки</td>
            </tr>

            </thead>
            <tbody>{notes.map((note) => <NoteItem key={note.id} note={note}/>)}</tbody>
        </table>
    )
}


export default Noteslist
