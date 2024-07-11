import App from "./App";
import Dashboard from "./dashboard/Dashborad";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateVideo from "./dashboard/Create-video";

export default function Serv() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-video" element={<CreateVideo />} />
        </Routes>
      </BrowserRouter>
    );
}