import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import TaskAddEdit from './components/TaskAddEdit';
import Tasks from './pages/Tasks';
import RouteErrorPage from './utils/RouteErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/task/:id" element={<TaskAddEdit />}/>
        <Route path="*" element={<RouteErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
