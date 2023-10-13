//store notes within this array
let notes = [];

//create a new note function
function createNote(color, text){
    //new container for displaying notes
    const noteContainer = document.getElementById("notes-list");

    //div for note
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.style.backgroundColor = color; //assign color

    //div for note text
    const noteText = document.createElement("div");
    noteText.className = "note-text";
    noteText.textContent = text; //assign text

    //div for controls - edit and delete
    const noteControls = document.createElement("div");
    noteControls.className = "note-controls";

    //edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editNote(noteElement);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteNote(noteElement);

    //append edit and delete buttons to 'noteControls' container
    noteControls.appendChild(editButton);
    noteControls.appendChild(deleteButton);

    //append text and controls to note
    noteElement.appendChild(noteText);
    noteElement.appendChild(noteControls);

    //append note to notes container 
    noteContainer.appendChild(noteElement);
}

//add new note to notes[] array
function addNote(){
    //retrieve user input
    const colorPicker = document.getElementById("color-picker");
    const noteText = document.getElementById("note-text");
    const color = colorPicker.value;
    const text = noteText.value.trim();

    if (text !== ""){
        createNote(color, text);
        notes.push({ color, text });//append vals to notes[]
        noteText.value = "";//clear input
    }
}

//edit existing note
function editNote(noteElement){
    const noteText = noteElement.querySelector(".note-text");
    const newText = prompt("Edit the note:", noteText.textContent);
    if (newText !== null){
        noteText.textContent = newText;
        const index = notes.findIndex(note => noteElement === note.element);
        if (index !== -1) {
            notes[index].text = newText;
        }
    }
}

//delete existing note
function deleteNote(noteElement){
    const noteText = noteElement.querySelector(".note-text");
    const textToDelete = noteText.textContent;
    const index = notes.findIndex(note => note.text === textToDelete);
    if (index !== -1){
        notes.splice(index, 1);
        noteElement.remove();
    }
}

//add note click event
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addNote);