import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import ServiceHistoryList from "./Service/ServiceHistoryList";

import TechForm from "./Service/TechForm";

function App(props) {
  if (props === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="service">
              <Route path="" element={<ServiceAppointmentList />} />
              <Route path="new" element={<ServiceAppointmentForm />} />
              <Route path="history" element={<ServiceHistoryList />} />
        </Route>
        <Route path="technicians">
            <Route path=""/>
            <Route path="new" element={<TechForm />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
