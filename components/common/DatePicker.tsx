import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';
import ko from 'date-fns/locale/ko';
import addHours from 'date-fns/addHours';
import palette from '../../styles/palette';

const DatePickerBlock = styled.div`
  width: 100%;
  height: 100%;
`;

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, ...props }) => {
  return (
    <DatePickerBlock>
      <ReactDatePicker
        {...props}
        dateFormat="yyyy년 MM월 dd일"
        disabledKeyboardNavigation
        locale={ko}
        onChange={(date, event) => {
          if (date) {
            onChange(addHours(date as Date, 9), event);
          } else {
            onChange(null, event);
          }
        }}
      />
    </DatePickerBlock>
  );
};

export default DatePicker;
