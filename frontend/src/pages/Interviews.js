import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Interviews.css';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, [selectedType]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const url = selectedType 
        ? `/api/interviews?type=${selectedType}` 
        : '/api/interviews';
      const response = await api.get(url);
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (interviewId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      await api.post(`/api/interviews/${interviewId}/enroll`, { userId: userData.id });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  return (
    <div className="interviews-container">
      <div className="interviews-header">
        <h1>Interviews & Preparation</h1>
      </div>

      <div className="filter-section">
        <button 
          className={selectedType === '' ? 'active' : ''}
          onClick={() => setSelectedType('')}
        >
          All Interviews
        </button>
        <button 
          className={selectedType === 'mock' ? 'active' : ''}
          onClick={() => setSelectedType('mock')}
        >
          Mock Interviews
        </button>
        <button 
          className={selectedType === 'recorded' ? 'active' : ''}
          onClick={() => setSelectedType('recorded')}
        >
          Recorded
        </button>
        <button 
          className={selectedType === 'live' ? 'active' : ''}
          onClick={() => setSelectedType('live')}
        >
          Live Sessions
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading interviews...</div>
      ) : (
        <div className="interviews-grid">
          {interviews.map(interview => (
            <div key={interview._id} className="interview-card">
              <h3>{interview.title}</h3>
              <p className="type">{interview.type.toUpperCase()}</p>
              <p className="difficulty">Difficulty: {interview.difficulty}</p>
              <p className="description">{interview.description}</p>
              <p className="duration">Duration: {interview.duration} mins</p>
              {interview.videoUrl && (
                <a href={interview.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-link">Watch Video</a>
              )}
              <button className="btn-primary" onClick={() => handleEnroll(interview._id)}>
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Interviews;
