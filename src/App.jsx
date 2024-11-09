// Importing React
import React from 'react';
// Importing the Dashboard component from the path you provided
import Dashboard from './components/Dashboard';

// Main App component
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cloud Cost Optimizer</h1>
      {/* Rendering the Dashboard component */}
      <Dashboard />
    </div>
  );
};

export default App;
