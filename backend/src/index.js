const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error (but server will still run):', err));

// Routes - Safe loading
try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('✓ Auth routes loaded');
} catch(e) { console.log('Auth routes error:', e.message); }

try {
  app.use('/api/users', require('./routes/users'));
  console.log('✓ Users routes loaded');
} catch(e) { console.log('Users routes error:', e.message); }

try {
  app.use('/api/projects', require('./routes/projects'));
  console.log('✓ Projects routes loaded');
} catch(e) { console.log('Projects routes error:', e.message); }

try {
  app.use('/api/interviews', require('./routes/interviews'));
  console.log('✓ Interviews routes loaded');
} catch(e) { console.log('Interviews routes error:', e.message); }

try {
  app.use('/api/notes', require('./routes/notes'));
  console.log('✓ Notes routes loaded');
} catch(e) { console.log('Notes routes error:', e.message); }

try {
  app.use('/api/placements', require('./routes/placements'));
  console.log('✓ Placements routes loaded');
} catch(e) { console.log('Placements routes error:', e.message); }

try {
  app.use('/api/payments', require('./routes/payments'));
  console.log('✓ Payments routes loaded');
} catch(e) { console.log('Payments routes error:', e.message); }

try {
  app.use('/api/dashboard', require('./routes/dashboard'));
  console.log('✓ Dashboard routes loaded');
} catch(e) { console.log('Dashboard routes error:', e.message); }

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Try visiting: http://localhost:5000/api/health');
});
