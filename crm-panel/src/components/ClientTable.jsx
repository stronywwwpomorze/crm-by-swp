import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <- dodaj to

export default function ClientTable({ token }) {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch {
      alert("Błąd pobierania klientów");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista klientów</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Numer</th>
              <th>Nazwa</th>
              <th>Akcje</th> {/* nowa kolumna */}
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.client_number}</td>
                <td>{client.name}</td>
                <td className="text-center">
                  <Link
                    to={`/klient/${client.id}`}
                    className="btn btn-sm btn-info"
                  >
                    Zobacz
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
