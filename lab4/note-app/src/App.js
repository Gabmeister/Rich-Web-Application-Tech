import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [notes,setNotes] = useState([]); //hook for managing notes
  const [joke,setJoke] = useState(''); //hook for storing a joke
  const [darkMode,setDarkMode] = useState(false); //hook for toggling dark mode

  //useEffect - fetch joke on component mount
  useEffect(() => {
    fetchProgrammingJoke();
  },[]);

  //fetch programming joke from jokeAPI
  const fetchProgrammingJoke = async()=>{ 
    try{
      const response = await axios.get('https://v2.jokeapi.dev/joke/Programming');
      if (response.data.type ==='twopart') {
        setJoke(`${response.data.setup} ${response.data.delivery}`);
      } else {
        setJoke(response.data.joke);
      }
    }catch (error){
      console.error('Error fetching programming joke:',error);
    }
  };

  //generate random colour
  const getRandomColour = () =>{
    const letters ='0123456789ABCDEF';
    let color='#';
    for (let i=0;i<6;i++){
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  };

  //toggle dark mode
  const toggleDarkMode = () =>{
    setDarkMode(!darkMode);
  };

  //create a new note
  const createNote = (text,color) =>{
    const finalColor = color !== '#ff5733' ? color:getRandomColour(); 
    setNotes((prevNotes) =>[
      ...prevNotes,
      {
        color:finalColor,
        text,
      },
    ]);
  };
  
  //add a new note to page
  const addNote = () =>{
    const colorPicker = document.getElementById('color-picker');
    const noteText = document.getElementById('note-text');

    if (noteText) {
      const text = noteText.value.trim();
      const color = colorPicker.value;

      if (text!==''){
        createNote(text,color);
        noteText.value ='';
        colorPicker.value ='#ff5733'; //reset colour to default after call
      }
    }
  };

  //edit a note
  const editNote = (index,newText)=>{
    setNotes((prevNotes) =>{
      const updatedNotes =[...prevNotes];
      updatedNotes[index].text = newText;
      return updatedNotes;
    });
  };

  //delete a note
  const deleteNote = (index) =>{
    setNotes((prevNotes) =>{
      const updatedNotes =[...prevNotes];
      updatedNotes.splice(index,1);
      return updatedNotes;
    });
  };

  return (
    <div className={`note-container ${darkMode ? 'dark-mode':''}`}>
      <div className={`add-note ${darkMode ? 'dark-mode':''}`}>
        <h1>React Note Taker</h1>
        <input
          type="color"
          id="color-picker"
          defaultValue="#ff5733"
        />

        <textarea
          id="note-text"
          placeholder="Type note here..."
          style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'black' }}
        ></textarea>

        <button
          id="add-button"
          onClick={() => {
            const noteText = document.getElementById('note-text');
            const text = noteText.value.trim();
            addNote(text);
            noteText.value = '';
          }}
          style={{ backgroundColor: darkMode ? '#555' : 'grey', color: 'white' }}
        >
          Add Note
        </button>
        <div>
          {joke && (
            <div>
              <h2>💯🤣 Programming Joke 😂💯</h2>
              <p>{joke}</p>
            </div>
          )}
          <button id="laugh-button" onClick={fetchProgrammingJoke} style={{ backgroundColor:darkMode ? '#555' :'grey',color:'white'}}>
            Make me laugh again...
          </button>
        </div>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ?'Light Mode':'Dark Mode'}
        </button>
      </div>
      <div id="notes-list">
        {notes.map((note,index)=>(
          <div
            className="note"
            key={index}
            style={{backgroundColor:note.color}}
          >
            <div className="note-text">{note.text}</div>
            <div className="note-controls">
              <button
                onClick={() =>{
                  const newText = prompt('Edit the note:',note.text);
                  if (newText !== null){
                    editNote(index,newText);
                  }
                }}
              >
                Edit
              </button>
              <button onClick={()=>deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;