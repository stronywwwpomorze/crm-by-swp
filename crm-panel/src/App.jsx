import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ClientForm from "./components/ClientForm";
import ClientTable from "./components/ClientTable";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(false);
  const reloadClients = () => setRefresh(!refresh);

  const isLoggedIn = !!token;

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm onLogin={(t) => {
          localStorage.setItem("token", t);
          setToken(t);
        }} />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <>
                <ClientForm token={token} onClientAdded={reloadClients} />
                <ClientTable key={refresh} token={token} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dodaj"
          element={
            isLoggedIn ? (
              <ClientForm token={token} onClientAdded={reloadClients} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/lista"
          element={
            isLoggedIn ? (
              <ClientTable key={refresh} token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
