import React, {useState} from 'react'
import MyButton from "./UI/button/MyButton";
import NoteItem from "./NoteItem";
import MyModal from "./UI/modal/MyModal";
import NoteForm from "./NoteForm";

const NoteList = ({notes, createNote, deleteNote, isAuthenticated, projects, users}) => {
    const [modal, setModal] = useState(false);
    if (!isAuthenticated) {
        return (
            <h3 style={{textAlign: 'center'}}>Для просмотра списка заметок необходима авторизация</h3>
        )
    }
    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <NoteForm createNote={(name, project, user, text) => createNote(name, project, user, text)}
                          users={users}
                          projects={projects}
                          closeModal={setModal}/>
            </MyModal>
            <h1 style={{textAlign: 'center'}}>
                Все заметки
            </h1>

            <MyButton onClick={() => setModal(true)}>Create new note</MyButton>

            {!notes.length
                ? <h2 style={{textAlign: 'center'}}>Заметки не найдены</h2>

                : notes.map((note) => <NoteItem key={note.id}
                                                note={note}
                                                deleteNote={deleteNote}/>)
            }
        </div>
    )
}


export default NoteList
