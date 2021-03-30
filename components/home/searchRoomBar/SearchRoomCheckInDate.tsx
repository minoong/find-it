import React from 'react';
import styled from 'styled-components';
import useSearchDate from '../../../hooks/useSearchRoomDate';
import palette from '../../../styles/palette';
import DatePicker from '../../common/DatePicker';

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
  .search-room-bar-date-label {
    font-size: 0.625rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
    position: absolute;
    z-index: 1;
    left: 1.25rem;
    top: 1rem;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 1.75rem 0 0 1.25rem;
    border: 0;
    border-radius: 0.75rem;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
`;

const SearchRoomCheckInDate: React.FC = () => {
  const { checkInDate, checkOutDate, setCheckInDate } = useSearchDate();

  const onChnageCheckInDate = (date: Date | null) => setCheckInDate(date);
  return (
    <SearchRoomCheckInDateBlock>
      <div>
        <p className="search-room-bar-date-label">체크인</p>
        <DatePicker
          selected={checkInDate}
          monthsShown={2}
          onChange={onChnageCheckInDate}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          placeholderText="날짜 추가"
          minDate={new Date()}
        />
      </div>
    </SearchRoomCheckInDateBlock>
  );
};

export default SearchRoomCheckInDate;
