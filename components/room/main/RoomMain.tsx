import React, { useState } from 'react';
import styled from 'styled-components';
import * as dateFns from 'date-fns';
import { useSelector } from '../../../store';
import palette from '../../../styles/palette';
import MapIcon from '../../../public/static/svg/room/main/map.svg';

const RoomMainBlock = styled.div`
  padding: 3.125rem;
  margin: auto;

  .room-list-info {
    margin-bottom: 0.5rem;
  }
  .room-list-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  .room-list-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .room-list-buttons-left-side {
      display: flex;
      button {
        height: 2rem;
        padding: 0 1rem;
        margin-right: 0.5rem;
        border-radius: 1.875rem;
        border: 1px solid ${palette.gray_b0};
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
          border-color: ${palette.black};
        }
      }
    }
    .room-list-show-map-button {
      display: flex;
      align-items: center;
      height: 2.625rem;
      padding: 0.75rem;
      background-color: white;
      border-radius: 0.5rem;
      border: 0;
      background-color: white;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${palette.gray_f7};
      }
      svg {
        margin-right: 0.5rem;
      }
    }
  }

  .room-list-wrapper {
    display: flex;
  }
`;

const RoomMain: React.FC = () => {
  const rooms = useSelector((state) => state.room.rooms);
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const [showMap, setShowMap] = useState(false);

  const getRoomListInfo = `${rooms.length}개의 숙소 ${
    checkInDate ? `${checkInDate ? dateFns.format(new Date(checkInDate), 'MM월 dd일') : ''}` : ''
  } ${checkInDate ? `${checkOutDate ? dateFns.format(new Date(checkOutDate), '- MM월 dd일') : ''}` : ''}`;
  return (
    <RoomMainBlock>
      <p className="room-list-info">{getRoomListInfo}</p>
      <h1 className="room-list-title">숙소</h1>
      <div className="room-list-buttons">
        <div className="room-list-buttons-left-side">
          <button type="button">숙소 유형</button>
          <button type="button">요금</button>
        </div>
        <button type="button" className="room-list-show-map-button" onClick={() => setShowMap(true)}>
          <MapIcon />
          지도표시하기
        </button>
      </div>
      <div className="room-list-wrapper">
        <RoomList />
      </div>
    </RoomMainBlock>
  );
};

export default RoomMain;
