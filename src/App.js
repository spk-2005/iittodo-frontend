import './App.css';
import First from './first';
import Signing from './signing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signing />} />
        <Route path="/first" element={<First />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
