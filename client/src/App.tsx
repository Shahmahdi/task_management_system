import React from 'react';
import './App.css';
import { TaskPage } from './tasks/TaskPage';

const App: React.FC = () => {
  return (
    <div>
      <h2 className="tc">Task Management</h2>
      <TaskPage />
    </div>
  );
}

export default App;
