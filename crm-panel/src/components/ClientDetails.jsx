import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";

export default function ClientDetails({ token }) {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
        setNewName(res.data.name);
      } catch (err) {
        console.error("Błąd pobierania klienta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, token]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/clients/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Zapisano zmiany");
    } catch (err) {
      console.error("Błąd zapisu:", err);
      alert("Błąd podczas zapisu");
    }
  };

  if (loading) return <div className="text-center mt-5">Ładowanie...</div>;
  if (!client) return <div className="text-center mt-5">Nie znaleziono klienta</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Szczegóły klienta</h2>

      {/* ID */}
      <div className="mb-3">
        <label className="form-label">ID</label>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <FaLock />
          </span>
          <input className="form-control bg-light" value={client.id} readOnly />
        </div>
      </div>

      {/* Numer klienta */}
      <div className="mb-3">
        <label className="form-label">Numer klienta</label>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <FaLock />
          </span>
          <input
            className="form-control bg-light"
            value={client.client_number}
            readOnly
          />
        </div>
      </div>

      {/* Nazwa klienta */}
      <div className="mb-3">
        <label className="form-label">Nazwa klienta</label>
        <input
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <button className="btn btn-success mt-3" onClick={handleSave}>
        Zapisz
      </button>
    </div>
  );
}
