import { useState, useEffect } from "react";

function App() {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    fetch("/api/mensagens")
      .then((res) => res.json())
      .then((data) => setMensagens(data))
      .catch((err) => console.error("Erro ao buscar mensagens:", err));
  }, []);

  return (
    <div>
      <h1>Mensagens do Servidor</h1>

      {mensagens.length === 0 ? (
        <p>Carregando mensagens...</p>
      ) : (
        mensagens.map((msg) => (
          <div key={msg.id}>
            <h2>{msg.titulo}</h2>
            <p>{msg.texto}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
