import './App.css';
import FormPage from './Pages/UserForm';
import { Route, Routes } from 'react-router-dom';
import EditForm from './Pages/EditForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage/>} />
      <Route path="/edit/:userId" element={<EditForm/>} />
    </Routes>
  );
}

export default App;
