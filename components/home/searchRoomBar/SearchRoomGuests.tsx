import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';

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
`;

const SearchRoomGuests: React.FC = () => {
  return <SearchRoomCheckGuestsBlock>게스트와 버튼</SearchRoomCheckGuestsBlock>;
};

export default SearchRoomGuests;
