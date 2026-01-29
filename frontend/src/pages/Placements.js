import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Placements.css';

function Placements() {
  const [placements, setPlaccements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/placements');
      setPlaccements(response.data);
    } catch (error) {
      console.error('Error fetching placements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (placementId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      await api.post(`/api/placements/${placementId}/mark-placed`, { userId: userData.id });
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying:', error);
    }
  };

  return (
    <div className="placements-container">
      <div className="placements-header">
        <h1>Placement Opportunities</h1>
      </div>

      {loading ? (
        <div className="loading">Loading placements...</div>
      ) : (
        <div className="placements-grid">
          {placements.map(placement => (
            <div key={placement._id} className="placement-card">
              <h3>{placement.companyName}</h3>
              <p className="job-title">{placement.jobTitle}</p>
              <p className="ctc">CTC: ₹{placement.ctcOffered?.toLocaleString() || 'N/A'}</p>
              <p className="department">Department: {placement.department}</p>
              <p className="description">{placement.description}</p>
              <div className="requirements">
                <h4>Requirements:</h4>
                <ul>
                  {placement.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              <p className="placed-count">Students Placed: {placement.placedStudents?.length || 0}</p>
              <button className="btn-primary" onClick={() => handleApply(placement._id)}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Placements;
