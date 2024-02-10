// If using PocketBase 
// export const dynamic = 'auto', dynamicParams = true, revalidate = 0, 
// fetchCache = 'auto', runtime = 'node.js', preferredRegion = 'auto'

import CreateNote from "./CreateNote";
import Link from "next/link";

async function getNotes(){
    // If using PocketBase 
    // const db = new PocketBase('http://xxx.xxx.xxx.xxx:8090');
    // const data = await db.records.getList('notes');
    const res = await fetch(
        '${process.env.HOST}/api/collection/notes/records?page=1&perPage=30', 
        { 
            cache: 'no-store' 
        }
        );
    const data = await res.json();
    return data?.items as any[];
}


export default async function NotesPage(){
    const notes = await getNotes();
    return(
        <div>
            <h1>Notes</h1>
            <div>
                {notes?.map((note) => {
                    return <Note key={ note.id } note={ note } />;
                    })}
            </div>
            <CreateNote/>
        </div>
    );
}

function Note({ note }: any) {
    const {id, title, content, created } = note || {};
    return(
        <Link href={`/notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}