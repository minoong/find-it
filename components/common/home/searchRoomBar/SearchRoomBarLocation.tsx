/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { stringify } from 'uuid';
import { searchPlacesAPI } from '../../../../lib/api/map';
import { useSelector } from '../../../../store';
import { searchRoomActions } from '../../../../store/searchRoom';
import palette from '../../../../styles/palette';

const SearchRoomBarLocationBlock = styled.div`
  position: relative;
  width: 100%;
  height: 4.375rem;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }

  .search-room-bar-location-txt {
    position: absolute;
    width: calc(100% - 2.5rem);
    top: 1rem;
    left: 1.25rem;
    .search-room-bar-location-label {
      font-size: 0.625rem;
      font-weight: bold;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 0.875rem;
      font-weight: bold;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 0.875rem;
        opacity: 0.7;
      }
    }
  }

  .search-room-bar-location-result {
    position: absolute;
    background-color: white;
    top: 4.875rem;
    width: 31.25rem;
    padding: 1rem 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
    cursor: default;
    overflow: hidden;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      height: 4rem;
      padding: 0.5rem 2rem;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

const SearchRoomBarLocation: React.FC = () => {
  const [results, setResults] = useState<{ description: string; placeId: string }[]>([]);
  const location = useSelector((state) => state.searchRoom.location);
  const dispatch = useDispatch();
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };
  const [popupOpened, setPopupOpened] = useState(false);
  const onClickInput = () => {
    setPopupOpened(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (location) {
      searchPlaces();
    }
  }, [location]);
  return (
    <SearchRoomBarLocationBlock onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-location-txt">
          <p className="search-room-bar-location-label">인원</p>
          <input
            value={location}
            ref={inputRef}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder="어디로 여행 가세요?"
          />
        </div>
        {popupOpened && location !== '근처 추천 장소' && (
          <ul className="search-room-bar-location-result">
            {!location && <li>근처 추천 장소</li>}
            {!isEmpty(results) && results.map((result, index) => <li key={index}>{result.description}</li>)}
            {location && isEmpty(results) && <li>검색 결과가 없습니다.</li>}
          </ul>
        )}
      </OutsideClickHandler>
    </SearchRoomBarLocationBlock>
  );
};

export default SearchRoomBarLocation;
