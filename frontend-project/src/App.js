import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadNotes();
  }, [search, category]);

  const loadNotes = async () => {
    try {
      const query = [];
      if (search) query.push(`search=${search}`);
      if (category) query.push(`category=${category}`);
      const { data } = await fetchNotes(query.join('&'));
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdateNote = async (noteData) => {
    try {
      if (currentNote) {
        await updateNote(currentNote._id, noteData);
        setSuccessMessage('Note updated successfully!');
      } else {
        await createNote(noteData);
        setSuccessMessage('Note added successfully!');
      }
      setCurrentNote(null);
      loadNotes();

      // Clear the success message after 1 seconds
      setTimeout(() => setSuccessMessage(''), 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setSuccessMessage('Note deleted successfully!');
      loadNotes();

      // Clear the success message after 1 seconds
      setTimeout(() => setSuccessMessage(''), 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-gray-800">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Personal Notes Manager
        </h1>

        {/* Display success message */}
        {successMessage && (
          <div className="bg-green-500 text-white text-center py-2 mb-4 rounded-lg">
            {successMessage}
          </div>
        )}

        {!showNotes ? (
          <>
            <NoteForm
              currentNote={currentNote}
              onAddOrUpdateNote={handleAddOrUpdateNote}
              onCancel={() => setCurrentNote(null)}
            />
            <button
              onClick={() => setShowNotes(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4 block mx-auto"
            >
              Show All Notes
            </button>
          </>
        ) : (
          <>
            <SearchBar
              setSearch={setSearch}
              setCategory={setCategory}
              category={category}
            />
            <NoteList
              notes={notes}
              onEdit={(note) => {
                setCurrentNote(note);
                setShowNotes(false);
              }}
              onDelete={handleDeleteNote}
            />
            <button
              onClick={() => setShowNotes(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 block mx-auto"
            >
              Back to Form
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
