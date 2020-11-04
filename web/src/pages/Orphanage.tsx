import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Image[];
}

interface Image {
  id: number;
  url: string;
}

interface OrphanageRouteParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageRouteParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    })
  }, [params.id]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        {
          orphanage ?
          <div className="orphanage-details">
            <img src={orphanage.images[activeImage].url} alt={orphanage.name} />

            <div className="images">
              {
                orphanage.images.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      className={activeImage == index ? "active" : ""}
                      type="button"
                      onClick={() => {
                        setActiveImage(index)
                      }}
                    >
                      <img src={image.url} alt={orphanage.name} />
                    </button>
                  )
                })
              }
            </div>

            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <div className="map-container">
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </Map>

                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>See route on Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Visit Instructions</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  {orphanage.opening_hours}
                </div>
                { orphanage.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Opened <br />
                    on Weekends
                  </div>
                ) : (
                  <div className="closed-on-weekends ">
                    <FiInfo size={32} color="#FF669D" />
                    Closed <br />
                    on Weekends
                  </div>
                ) }
              </div>

              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Contact via Whatsapp
              </button>
            </div>
          </div>

        :

          <div className="orphanage-details">
            <div className="orphanage-details-content">
              <h1>Orphanage not Found :(</h1>
            </div>
          </div>

      }

      </main>
    </div>
  );
}