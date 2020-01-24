import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  useEffect(() => {
    async function loadDevs() {
      const reponse = await api.get('/devs');
      setDevs(reponse.data);
    }
    loadDevs();
  }, [])


  const [devs, setDevs] = useState([])
  const [github_username, setGithub_username] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithub_username('')
    setTechs('')

    setDevs([...devs], response.data)
  }
  // useEffect(() => {a
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //    console.log(position)
  //     },
  //     (err) => {

  //     },
  //     {
  //       timeout : 300000
  //     }
  //   )
  // }, [])

  return (
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input
              name="github_username"
              id="github_username"
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
              required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              value={techs}
              onChange={e => setTechs(e.target.value)}
              required />
          </div>

          <div className="input-group">

            <div className="input-block">
              <label htmlFor="latitude">Latidude</label>
              <input
                name="latitude"
                id="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                required />
            </div>


            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                name="longitude"
                id="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                required />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`} >Acessar perfil no GitHub</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
