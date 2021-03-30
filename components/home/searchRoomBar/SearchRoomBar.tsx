import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import SearchRoomBarLocation from './SearchRoomBarLocation';
import SearchRoomCheckInDate from './SearchRoomCheckInDate';
import SearchRoomCheckOutDate from './SearchRoomCheckOutDate';
import SearchRoomGuests from './SearchRoomGuests';

const SearchRoomBarBlock = styled.div`
  width: 100%;
  height: 4.375rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;

  .search-room-bar-inputs {
    display: flex;
    align-items: center;
    width: 100%;
    .search-room-bar-input-divider {
      width: 1px;
      height: 2.75rem;
      background-color: ${palette.gray_dd};
    }
  }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <SearchRoomBarBlock>
      <div className="search-room-bar-inputs">
        <SearchRoomBarLocation />
        <SearchRoomCheckInDate />
        <SearchRoomCheckOutDate />
        <SearchRoomGuests />
      </div>
    </SearchRoomBarBlock>
  );
};

export default SearchRoomBar;
