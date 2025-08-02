import { useState } from "react";
import axios from "axios";

export default function ClientForm({ token, onClientAdded }) {
  const [clientNumber, setClientNumber] = useState("");
  const [name, setName] = useState("");

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/clients",
        { client_number: clientNumber, name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientNumber("");
      setName("");
      onClientAdded();
    } catch {
      alert("Błąd dodawania klienta");
    }
  };

  return (
  <form onSubmit={handleAddClient} className="container mt-5 p-4 border rounded shadow-sm" style={{ maxWidth: "400px" }}>
    <h2 className="text-center mb-4">Dodaj klienta</h2>

    <div className="mb-3">
      <input
        type="text"
        placeholder="Numer klienta"
        value={clientNumber}
        onChange={(e) => setClientNumber(e.target.value)}
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        placeholder="Nazwa klienta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
    </div>

    <button type="submit" className="btn btn-success w-100">
      Dodaj
    </button>
  </form>
);

}
