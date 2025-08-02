import { useEffect, useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Błąd pobierania klientów:", err));
  }, []);

  return (
    <div>
      <h2>Lista klientów</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Numer klienta</th>
            <th>Nazwa</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.client_number}</td>
              <td>{client.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
