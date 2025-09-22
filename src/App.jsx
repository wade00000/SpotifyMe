import { BrowserRouter, Routes, Route } from "react-router-dom";
import Callback from "./Callback";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback clientId={import.meta.env.VITE_SPOTIFY_CLIENT_ID} />} />
      </Routes>
    </BrowserRouter>
  );
}
