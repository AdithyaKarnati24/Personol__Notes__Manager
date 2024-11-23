import React, { useState, useEffect } from 'react';

const NoteForm = ({ currentNote, onAddOrUpdateNote, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Others',
  });

  useEffect(() => {
    if (currentNote) {
      setFormData({
        title: currentNote.title,
        description: currentNote.description,
        category: currentNote.category,
      });
    } else {
      resetForm();
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrUpdateNote(formData);
    resetForm(); // Reset the form after submission
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'Others' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Title"
        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {currentNote ? 'Update Note' : 'Add Note'}
        </button>
        {currentNote && (
          <button
            onClick={() => {
              onCancel();
              resetForm(); // Reset form when canceling
            }}
            type="button"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
