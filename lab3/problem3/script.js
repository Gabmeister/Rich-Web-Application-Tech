const { Observable, fromEvent } = rxjs;

class Note {
    constructor(){
        this.childNotes = [];
        this.parentNote = null;
        this.domElement = null;
    }

    addNote(){
        //initialize from index.html ID's
        const noteText = document.getElementById('note-text').value;
        const input_colour = document.getElementById('colour-picker').value;

        const note = document.createElement('div');//div for each note
        note.className = 'note';
        note.style.backgroundColor = input_colour;
        this.domElement = note;

        const body = document.createElement('p');
        body.textContent = noteText;
        this.domElement.appendChild(body);

        //observable streams for click events
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        const clickDelete = fromEvent(deleteButton, 'click');
        clickDelete.subscribe(() => this.deleteAll());

        const childNote = document.createElement('button');
        childNote.textContent = 'Add a Child Note';
        const clickRelated = fromEvent(childNote, 'click');
        clickRelated.subscribe(() => this.addChildNote(this));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const clickEdit = fromEvent(editButton, 'click');
        clickEdit.subscribe(() => this.editNote(body));

        //create container for note buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.appendChild(deleteButton);
        buttonsContainer.appendChild(childNote);
        buttonsContainer.appendChild(editButton);
        this.domElement.appendChild(buttonsContainer);
                
        const notesContainer = document.getElementById('notes-container');
        notesContainer.appendChild(note);

        document.getElementById('note-text').value = '';
    }

    deleteAll(){//delete parent note + child notes
        const notesContainer = document.getElementById('notes-container');
        notesContainer.removeChild(this.domElement);
        for (const childNote of this.childNotes){//delete child nodes recursively
            childNote.deleteAll();
        }

        if (this.domElement && this.domElement.parentNode){//delete parent note 
            this.domElement.parentNode.removeChild(this.domElement);
        }
    }

    editNote(bodyElement){
        const editNew = prompt('Edit note:', bodyElement.textContent);
        if (editNew !== null){//replace element with edit input
            bodyElement.textContent = editNew;
        }
    }

    addChildNote(parentNote){
        const newChildNote = new Note();
        newChildNote.parentNote = parentNote;//set to parentNote
        parentNote.childNotes.push(newChildNote);//push new child into childNotes[] 
        newChildNote.addNote();
    }
}

//DOM load + click event observable + subscribe to observable
document.addEventListener('DOMContentLoaded', ()=>{
    const addButton = document.getElementById('add-button');
    const notesInstance = new Note();
    const clickCreate = fromEvent(addButton, 'click');
    clickCreate.subscribe(() => notesInstance.addNote());
});