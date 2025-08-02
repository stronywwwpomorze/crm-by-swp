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
    <form onSubmit={handleAddClient}>
      <h2>Dodaj klienta</h2>
      <input placeholder="Numer klienta" value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} />
      <input placeholder="Nazwa klienta" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Dodaj</button>
    </form>
  );
}
