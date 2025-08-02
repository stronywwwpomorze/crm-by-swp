import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Lista klientów</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer</th>
            <th>Nazwa</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.client_number}</td>
              <td>{client.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
