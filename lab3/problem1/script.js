
document.addEventListener('DOMContentLoaded', () => { //DOM load before script run
    const {fromEvent } = rxjs; 
    const addButton = document.getElementById("add-button");
    const create_click = fromEvent(addButton, 'click');
    create_click.subscribe(() => addNote()); //subscribe() to observable for click handling

    const notes = [];//notes array

    function addNote() {//add note to notes[] on function call
        const note_input = document.getElementById("note-text");
        const color_input = document.getElementById("color-picker");
        const note_txt = note_input.value;
        const notecolor = color_input.value;

        const note = { text: note_txt, color: notecolor };
        notes.push(note);
        note_input.value = "";//clear note_input after adding to notes[]
        renderNotes();
        
    }

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();//re-render notes after deletion
}

function editNote(index) {
    const editedText = prompt("Please enter new text:", notes[index].text);
    if (editedText !== null) {
        notes[index].text = editedText;
        renderNotes();
    }
}

function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";
    
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.style.backgroundColor = note.color;

        const note_txt_p = document.createElement("p");
        note_txt_p.textContent = note.text;

        const noteActions = document.createElement("div");
        noteActions.className = "note-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        noteActions.appendChild(editButton);
        noteActions.appendChild(deleteButton);
        noteDiv.appendChild(note_txt_p);
        noteDiv.appendChild(noteActions);

        notesContainer.appendChild(noteDiv);

        
        fromEvent(deleteButton, 'click').subscribe(() => deleteNote(index));//observable for deleteButton clicks + subscribe()
        fromEvent(editButton, 'click').subscribe(() => editNote(index));//observable for editButton clicks + subscribe()
    });
}

});