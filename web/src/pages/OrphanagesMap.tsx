import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <Link to="/">
                        <img src={mapMarkerImg} alt="Happy"/>
                    </Link>

                    <h2>Choose an orphanage on the map</h2>
                    <p>Thousands of children are awaiting your visit :)</p>
                </header>

                <footer>
                    <strong>Denver</strong>
                    <span>Colorado</span>
                </footer>
            </aside>

            <Map
                center={[39.7350021,-104.9652965]}
                zoom={12} //11.4
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return(
                        <Marker
                            position={[orphanage.latitude,orphanage.longitude]}
                            icon={mapIcon}
                            key={orphanage.id}
                        >
                            <Popup
                                closeButton={false}
                                minHeight={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>

                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;