import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage"; // Using correct relative path
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticket/:name" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;