import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Dashboard/Header';
import Home from './Components/Dashboard/Home';
import Sidebar from './Components/Dashboard/Sidebar';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import AgedItems from './Components/Dashboard/Categories/AgedItems'; // Import the AgedItems component
import OngoingOntrack from './Components/Dashboard/Categories/OngoingOntrack'; // Import the OngoingOntrack component
import CompletedItems from './Components/Dashboard/Categories/CompletedItems'; // Import the CompletedItems component
import Reports from './Components/Dashboard/Reports'; // Import the Reports component

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home/>
      </div>
  );
}

// LoginSignup
function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aged-items" element={<AgedItems />} /> {/* Add the route for Aged Items */}
            <Route path="/ongoing-ontrack" element={<OngoingOntrack />} /> {/* Add the route for Ongoing-Ontrack */}
            <Route path="/completed" element={<CompletedItems />} /> {/* Ensure this route is correct */}
            <Route path="/reports" element={<Reports />} /> {/* Add the route for Reports */}
          </Routes>
        </Router>
  );
}

export default App;