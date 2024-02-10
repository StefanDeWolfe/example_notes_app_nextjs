import styles from '../Notes.module.css';

async function getNote(noteId: string){
    const res = await fetch(
        '${process.env.HOST}/api/collection/notes/records/${noteId}', 
            { 
                next: { revalidate: 10 }, 
            }
        );
    const data = await res.json();
    return data;
}

export default async function NotesPage({params}: any){
    const note = await getNote(params.id);
    return(
        <div>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <h3>{note.title}</h3>
                <h5>{note.content}</h5>
                <p>{note.created}</p>
            </div>
        </div>
    );
}