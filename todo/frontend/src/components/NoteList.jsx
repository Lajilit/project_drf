import React from 'react'
import {Link} from "react-router-dom";
import MyButton from "./UI/button/MyButton";
import NoteItem from "./NoteItem";

const NoteList = ({notes, deleteNote, isAuthenticated}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Все заметки
            </h1>
            {isAuthenticated &&
                <MyButton><Link className={'linkText'} to='/notes/create'>Create new note</Link></MyButton>
            }
            {notes.map((note) => <NoteItem key={note.id}
                                                  note={note}
                                                  deleteNote={deleteNote}/>
            )}


        </div>

    )
}


export default NoteList
