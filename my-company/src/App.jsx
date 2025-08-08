import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // <-- import Navbar
import Contact from './components/Contact';

import Home from './Home';
import About from './About';
import Services from './Services';

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
