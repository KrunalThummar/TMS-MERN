import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RoleMasterState from './context/RoleMaster/RoleMasterState';
import UserState from './context/UserMaster/UserState';
import ProjectState from './context/ProjectMaster/ProjectState';
import TaskState from './context/TaskMaster/TaskState';
import TaskLogState from './context/TaskLog/TaskLogState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoleMasterState>
      <UserState>
        <ProjectState>
          <TaskState>
            <TaskLogState>

              <App />

            </TaskLogState>
          </TaskState>
        </ProjectState>
      </UserState>
    </RoleMasterState>
  </React.StrictMode>
);

