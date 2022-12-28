import GoogleMapReact from 'google-map-react';
import { useEffect, useState} from 'react';
import {GOOGLE_MAPS_API_KEY, ADDRESSES} from "../../constants"
import {Marker} from "./Marker"

export const Map = () => {
    const [address, setAddress] = useState(ADDRESSES[0]);

    useEffect(()=>{
      const randomIndex = Math.floor(Math.random()*ADDRESSES.length);

      setAddress(ADDRESSES[randomIndex]);
    }, []);

    return (
        <div>
          <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
              defaultCenter={address}
              defaultZoom={address.zoom}
            >
              <Marker
                lat={address.lat}
                lng={address.lng}
                text={address.name}
              />
            </GoogleMapReact>
          </div>
        </div>
        
      );
}