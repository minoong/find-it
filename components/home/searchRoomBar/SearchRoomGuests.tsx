import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom';
import palette from '../../../styles/palette';
import Counter from '../../common/Counter';
import SearchRoomButton from './SearchRoomButton';

const SearchRoomCheckGuestsBlock = styled.div`
  position: relative;
  width: 100%;
  height: 4.375rem;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  > div {
    width: 100%;
    height: 100%;
  }
  .search-room-bar-guest-text {
    position: absolute;
    width: calc(100% - 7.125rem);
    top: 1rem;
    left: 1.25rem;
  }
  .search-room-bar-guest-label {
    font-size: 0.625rem;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .search-room-bar-guest-popup {
    position: absolute;
    width: 24.625rem;
    top: 4.875rem;
    right: 0;
    padding: 1rem 2rem;
    background-color: white;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }
  .search-room-bar-guest-counter-wrapper {
    padding: 1rem 0;
    border-bottom: 1px solid ${palette.gray_eb};
    &:last-child {
      border: 0;
    }
  }

  .search-room-bar-guest-text {
    font-size: 0.875rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-room-bar-button-wrapper {
    position: absolute;
    right: 0;
    top: 0.75rem;
    right: 0.75rem;
  }
`;

const SearchRoomGuests: React.FC = () => {
  const dispatch = useDispatch();
  const [popupOpened, setPopupOpened] = useState(false);
  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);

  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultCount(value));
  };
  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value));
  };
  const setInfantsCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantsCount(value));
  };

  return (
    <SearchRoomCheckGuestsBlock onClick={() => setPopupOpened(true)}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-guest-text">
          <p className="search-room-bar-guest-label">인원</p>
          <p className="search-room-bar-guest-text">성인 0명</p>
        </div>

        <div className="search-room-bar-button-wrapper">
          <SearchRoomButton />
        </div>
        {popupOpened && (
          <div className="search-room-bar-guest-popup">
            <div className="search-room-bar-guest-counter-wrapper">
              <Counter
                label="성인"
                description="만 13세 이상"
                minValue={1}
                value={adultCount}
                onChage={(count) => setAdultCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guest-counter-wrapper">
              <Counter
                label="어린이"
                description="2~12세"
                minValue={1}
                value={childrenCount}
                onChage={(count) => setChildrenCountDispatch(count)}
              />
            </div>
            <div className="search-room-bar-guest-counter-wrapper">
              <Counter
                label="유아"
                description="2세 미만"
                minValue={1}
                value={infantsCount}
                onChage={(count) => setInfantsCountDispatch(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </SearchRoomCheckGuestsBlock>
  );
};

export default SearchRoomGuests;
