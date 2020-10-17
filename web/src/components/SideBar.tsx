import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/Map-marker.svg';

import '../styles/components/sidebar.css';

export default function sideBar() {


    return(
        <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
            <Link to={'/map'}>
              <FiArrowLeft size={24} color="#FFF" />
            </Link>
        </footer>
      </aside>
    );
}