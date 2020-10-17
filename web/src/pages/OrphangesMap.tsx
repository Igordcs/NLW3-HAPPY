import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {FiPlus, FiArrowRight, FiX} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import MapIcon from '../components/MapIcon';
import mapMarkerImg from '../images/Map-marker.svg';
import api from '../services/api';

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanges-map.css';
import { LeafletMouseEvent } from 'leaflet';

interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string,
}

const mapIcon = MapIcon;


function OrphanagesMap() {

  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekend, setOpenOnWeekend] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function toggleModal(){
    const modal = document.getElementById('modal');
    modal?.classList.toggle('visible');
  }

  function handleSelectedImage(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) {
      return;
    }
    
    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const previewImages = selectedImages.map(image =>{
      return URL.createObjectURL(image);
    })

    setPreviewImages(previewImages);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekend', String(open_on_weekend));

    images.forEach(image=>{
      data.append('images', image);
    })

    await api.post('Orphanages', data)

    alert('Cadastro realizado com sucesso')

    toggleModal();
  }

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    useEffect(()=>{
      api.get('orphanages').then(response => {
        setOrphanages(response.data)
      })
    }, [])

    return (
      <div id="page-map">
        <aside>

          <header>
            <img src={mapMarkerImg} alt="Happy" />

            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>

          </header>

          <footer>
            <strong>Buíque</strong>
            <span>Pernambuco</span>
          </footer>

        </aside>

        <Map 
          center={[-8.6172145,-37.1580072]}
          zoom={15}
          style={{width: '100%', height: '100%'}}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {orphanages.map(orphanage =>{
            return(
              <Marker
                icon={mapIcon}
                position={[orphanage.latitude,orphanage.longitude]}
                key={orphanage.id}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={32} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}

        </Map>

          

        <button onClick={toggleModal} className="create-orphanage">
          <FiPlus size={32} color="#fff" />
        </button>

        <div id="modal">

          <form onSubmit={handleSubmit} className="create-orphanage-form">
              <button onClick={toggleModal} className="xis">
                <FiX size={48} color="#bd9faa"/>
              </button>
            <fieldset>
              <legend>Dados</legend>

              <Map 
                center={[-8.6172145,-37.1580072]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                  {position.latitude !== 0 && (
                    <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[position.latitude,position.longitude]} 
                  />
                )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
              id="name" 
              value={name} 
              onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id="name" 
              maxLength={300} 
              value={about} 
              onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key= {image} src={image} alt={name}/>
                  )
                })}
                <label className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input multiple type="file" onChange={handleSelectedImage} id="images[]"/>
              </div>

              
            </div>
          </fieldset>
          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions" 
              value={instructions} 
              onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input 
              id="opening_hours"
              value={opening_hours} 
              onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekend ? 'active' : ''}
                onClick={() => setOpenOnWeekend(true)}
                >
                  Sim
                </button>
                <button 
                type="button"
                className={!open_on_weekend ? 'active' : ''}
                onClick={() => setOpenOnWeekend(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
          </form>
        </div>

      </div>

      

    );
  }

export default OrphanagesMap;
