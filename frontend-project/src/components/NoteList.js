import React from 'react';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.description}</p>
            <small className="block text-gray-500 mb-4">
              Category: <span className="font-medium">{note.category}</span>
            </small>
            <div className="flex justify-between">
              <button
                onClick={() => onEdit(note)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-100 text-center col-span-full">No notes found</p>
      )}
    </div>
  );
};

export default NoteList;
