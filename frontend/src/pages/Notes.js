import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    subject: '',
    category: 'lecture',
    tags: ''
  });

  useEffect(() => {
    fetchNotes();
  }, [selectedCategory]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const url = selectedCategory 
        ? `/api/notes?category=${selectedCategory}` 
        : '/api/notes';
      const response = await api.get(url);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const noteData = {
        ...newNote,
        userId: userData.id,
        tags: newNote.tags.split(',').map(t => t.trim())
      };
      
      await api.post('/api/notes', noteData);
      setNewNote({
        title: '',
        content: '',
        subject: '',
        category: 'lecture',
        tags: ''
      });
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Study Notes & Resources</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Note'}
        </button>
      </div>

      {showForm && (
        <form className="note-form" onSubmit={handleAddNote}>
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={newNote.subject}
            onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
            required
          />
          <textarea
            placeholder="Note Content"
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            required
            rows="5"
          />
          <select 
            value={newNote.category}
            onChange={(e) => setNewNote({...newNote, category: e.target.value})}
          >
            <option value="lecture">Lecture Notes</option>
            <option value="practical">Practical Notes</option>
            <option value="placement">Placement Prep</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newNote.tags}
            onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
          />
          <button type="submit" className="btn-primary">Create Note</button>
        </form>
      )}

      <div className="filter-section">
        <button 
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => setSelectedCategory('')}
        >
          All Notes
        </button>
        <button 
          className={selectedCategory === 'lecture' ? 'active' : ''}
          onClick={() => setSelectedCategory('lecture')}
        >
          Lecture Notes
        </button>
        <button 
          className={selectedCategory === 'practical' ? 'active' : ''}
          onClick={() => setSelectedCategory('practical')}
        >
          Practical
        </button>
        <button 
          className={selectedCategory === 'placement' ? 'active' : ''}
          onClick={() => setSelectedCategory('placement')}
        >
          Placement Prep
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p className="subject">{note.subject}</p>
              <p className="category">{note.category}</p>
              <p className="content">{note.content.substring(0, 100)}...</p>
              <div className="tags">
                {note.tags?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <button className="btn-link">Read Full Note</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
