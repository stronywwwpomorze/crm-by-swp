import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Błąd logowania");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin(data.token);             // <-- to ustawia token w App
      navigate("/clients");            // <-- to przekierowuje
    } catch (err) {
      console.error(err);
      setError("Błąd połączenia z serwerem");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm text-center"
        style={{ minWidth: "300px" }}
      >
        {/* LOGO + TYTUŁ */}
        <img
          src="https://stronywwwpomorze.pl/wp-content/uploads/2022/02/logo-strony-www-pomorze-pl-MIX-CZARNE-BIALE-280.png"
          alt="Logo SWP"
          className="mb-3"
          style={{ width: "100px" }}
        />
        <h1 className="mb-4">CRM by SWP</h1>
        <h2>Zaloguj</h2>

        {/* INPUTY */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary w-100">
          Zaloguj
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
