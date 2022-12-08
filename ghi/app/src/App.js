import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import ServiceHistoryList from "./Service/ServiceHistoryList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="service/">
              <Route path="" element={<ServiceAppointmentList />} />
              <Route path="new" element={<ServiceAppointmentForm />} />
              <Route path="history" element={<ServiceHistoryList />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
