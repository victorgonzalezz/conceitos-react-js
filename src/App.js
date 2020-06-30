import React, {useState, useEffect }  from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadData() {
    const response = await api.get('/repositories');

      const loadedRepositories = response.data;

      setRepositories(loadedRepositories);
    }
    loadData();
    }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New Repository ${Date.now()}`,
      url: "localhost:3333",
      techs: ["NodeJS", "React"]
    }

    const response = await api.post('/repositories', newRepository);

    const addedRepo = response.data;

    if (response.status === 200) {
      setRepositories([ ...respositories, addedRepo]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      const currentRepositories = respositories.filter(repository => repository.id !== id)
      setRepositories(currentRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {respositories.map(repository => (
        <li key={repository.id}>
           {repository.title}

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
