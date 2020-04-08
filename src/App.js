import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      "title" : `New repository ${Date.now()}`,
      "url" : "www.hiago.com",
      "techs" : ["Nodejs", "React"]
    });
    
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    try{
      const response = await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch(error){
        alert('Erro ao deletar repositorio!');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <ul>
              <li>{repository.title}</li>
              <li>{repository.url}</li>
              <li>{repository.techs}</li>
            </ul>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
