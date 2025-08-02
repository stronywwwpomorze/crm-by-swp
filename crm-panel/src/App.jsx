import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ClientForm from "./components/ClientForm";
import ClientTable from "./components/ClientTable";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const reloadClients = () => setRefresh(!refresh);

  // Wczytaj token przy starcie
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Obsługa wylogowania
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginForm onLogin={(token) => {
            setToken(token);
            localStorage.setItem("token", token);
          }} />}
        />
        <Route
          path="/clients"
          element={
            token ? (
              <>
                <button onClick={handleLogout}>Wyloguj</button>
                <ClientForm token={token} onClientAdded={reloadClients} />
                <ClientTable key={refresh} token={token} />
              </>
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
