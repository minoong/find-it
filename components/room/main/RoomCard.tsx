/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { differenceInDays } from 'date-fns';
import Link from 'next/link';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { makeMoneyString } from '../../../lib/utils';
import { useSelector } from '../../../store';
import palette from '../../../styles/palette';
import { RoomType } from '../../../types/room';

const RoomCardBlock = styled.li<{ showMap: boolean }>`
  width: calc((100% - 3rem) / 4);
  &::nth-child(4n) {
    margin-right: 0;
  }
  margin-right: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 90rem) {
    width: calc((100% - 4rem) / 5);
    &::nth-child(4n) {
      margin-right: 1rem;
    }
    &::nth-child(5n) {
      margin-right: 0;
    }
  }

  .room-card-photo-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66.66%;
    margin-bottom: 0.875rem;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .room-card-room-info {
    font-size: 0.75rem;
    color: ${palette.gray_71};
    margin-bottom: 0.5625rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-card-title {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-card-price {
    margin-bottom: 0.25rem;
    b {
      font-weight: 800;
    }
  }

  .room-card-totla-price {
    font-size: 0.875rem;
    color: ${palette.gray_71};
  }

  .room-bed-bath-room-info {
    display: none;
  }

  ${({ showMap }) =>
    showMap &&
    css`
      width: 100% !important;
      margin: 0;
      padding: 1.5rem 0;
      border-bottom: 1px solid ${palette.gray_eb};
      &:first-child {
        padding-top: 0;
      }
      a {
        width: 100%;
        display: flex;
        .room-card-info-text {
          position: relative;
          flex-grow: 1;
          height: 12.5rem;
        }
        .room-card-photo-wrapper {
          width: 18.75rem;
          min-width: 18.75rem;
          height: 12.5rem;
          margin-right: 1rem;
          margin-bottom: 0;
          padding-bottom: 0;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .room-card-room-info {
          font-size: 0.875rem;
          margin-bottom: 0.8125rem;
        }
        .room-card-title {
          font-size: 1.125rem;
          white-space: break-spaces;
          margin-bottom: 0.6875rem;
        }
        .room-card-text-divider {
          width: 2rem;
          height: 1px;
          margin-bottom: 0.625rem;
          background-color: ${palette.gray_dd};
        }
        .room-bed-bath-room-info {
          display: block;
          font-size: 0.875rem;
          color: ${palette.gray_71};
        }
        .room-card-price {
          position: absolute;
          margin: 0;
          right: 0;
          bottom: 1rem;
        }
        .room-card-total-price {
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: underline;
        }
      }
    `}
`;

interface IProps {
  room: RoomType;
  showMap: boolean;
}

const RoomCard: React.FC<IProps> = ({ room, showMap }) => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const remainDays = checkOutDate && checkInDate && differenceInDays(new Date(checkOutDate), new Date(checkInDate));

  const translatedRoomType = useMemo(() => {
    switch (room.roomType) {
      case 'entire':
        return '집 전체';
      case 'private':
        return '개인실';
      case 'public':
        return '공용';
      default:
        return '';
    }
  }, []);
  return (
    <RoomCardBlock showMap={true}>
      <Link href={`/room/${room.id}`}>
        <a>
          <div className="room-card-photo-wrapper">
            <img src={room.photos[0]} alt="" />
          </div>
          <div className="room-card-info-text">
            <p className="room-card-room-info">
              {room.buildingType} {translatedRoomType} {room.district} {room.city}
            </p>
            <p className="room-card-title">{room.title}</p>
            <div className="room-card-text-divider" />
            <p className="room-card-price">
              <b>KRW {room.price}</b>/1박
            </p>
            {!!remainDays && (
              <p className="room-card-total-price">
                총 요금: KRW {makeMoneyString(`${Number(room.price) * remainDays}`)}
              </p>
            )}
          </div>
        </a>
      </Link>
    </RoomCardBlock>
  );
};

export default RoomCard;
