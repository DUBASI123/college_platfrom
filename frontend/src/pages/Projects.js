import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'college',
    technologies: '',
    liveLink: '',
    githubLink: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = selectedCategory 
        ? `/api/projects?category=${selectedCategory}` 
        : '/api/projects';
      const response = await api.get(url);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const projectData = {
        ...newProject,
        userId: userData.id,
        technologies: newProject.technologies.split(',').map(t => t.trim())
      };
      
      await api.post('/api/projects', projectData);
      setNewProject({
        title: '',
        description: '',
        category: 'college',
        technologies: '',
        liveLink: '',
        githubLink: ''
      });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Project'}
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleAddProject}>
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            required
          />
          <select 
            value={newProject.category}
            onChange={(e) => setNewProject({...newProject, category: e.target.value})}
          >
            <option value="college">College</option>
            <option value="healthcare">Healthcare</option>
            <option value="internship">Internship</option>
          </select>
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={newProject.technologies}
            onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
          />
          <input
            type="url"
            placeholder="Live Link"
            value={newProject.liveLink}
            onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
          />
          <button type="submit" className="btn-primary">Create Project</button>
        </form>
      )}

      <div className="filter-section">
        <button 
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => setSelectedCategory('')}
        >
          All Projects
        </button>
        <button 
          className={selectedCategory === 'college' ? 'active' : ''}
          onClick={() => setSelectedCategory('college')}
        >
          College
        </button>
        <button 
          className={selectedCategory === 'healthcare' ? 'active' : ''}
          onClick={() => setSelectedCategory('healthcare')}
        >
          Healthcare
        </button>
        <button 
          className={selectedCategory === 'internship' ? 'active' : ''}
          onClick={() => setSelectedCategory('internship')}
        >
          Internship
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p className="category">{project.category}</p>
              <p className="description">{project.description}</p>
              <div className="technologies">
                {project.technologies?.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live</a>}
                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
