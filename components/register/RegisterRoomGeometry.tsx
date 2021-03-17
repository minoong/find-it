import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import throttle from 'lodash/throttle';
import { useSelector } from '../../store';
import palette from '../../styles/palette';
import { registerRoomActions } from '../../store/registerRoom';
import RegisterRoomFooter from './RegisterRoomFooter';
import Step from '../common/Step';

const RegisterRoomGeometryBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  .register-room-geometry-map-wrapper {
    width: 30.4375rem;
    height: 17.5rem;
    margin-top: 1.5rem;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .gmnoprint .gm-style-mtc {
    display: none;
  }
  .gm-svpc {
    display: none;
  }
  .gm-fullscreen-control {
    display: none;
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      resolve();
    };
  });
};

const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });
      map.addListener(
        'center_changed',
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();

          marker.setPosition({ lat: centerLat, lng: centerLng });

          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(centerLng));
        }, 150),
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <RegisterRoomGeometryBlock>
      <Step title="핀이 놓인 위치가 정확한가요?" step={5}>
        필요한 경우 핀을 이용하여 정확한 위치로 옮길 수 있어요.
      </Step>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>
      <RegisterRoomFooter prevHref="/room/register/location" nextHref="/room/register/amentities" />
    </RegisterRoomGeometryBlock>
  );
};

export default RegisterRoomGeometry;
