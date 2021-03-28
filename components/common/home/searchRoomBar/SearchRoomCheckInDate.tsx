import React from 'react';
import styled from 'styled-components';
import palette from '../../../../styles/palette';

const SearchRoomCheckInDateBlock = styled.div`
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

const SearchRoomCheckInDate: React.FC = () => {
  return <SearchRoomCheckInDateBlock>체크인</SearchRoomCheckInDateBlock>;
};

export default SearchRoomCheckInDate;
