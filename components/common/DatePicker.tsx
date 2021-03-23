import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';
import ko from 'date-fns/locale/ko';
import addHours from 'date-fns/addHours';
import palette from '../../styles/palette';

const DatePickerBlock = styled.div`
  width: 100%;
  height: 100%;

  .react-datepicker {
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
    border-radius: 2rem;
    cursor: default;
  }
  .react-datepicker__triangle {
    border-bottom-color: white !important;
  }
  .react-datepicker__month-container {
    padding: 0 1.6875rem;
  }
  .react-datepicker__header {
    padding-top: 1.375rem;
    font-size: 1rem;
    font-weight: bold;
    border: 0;
    background-color: white;
  }
  .react-datepicker__navigation--previous {
    top: 2.5rem;
    left: 3.5rem;
    border: 0;
    background-image: url('/static/svg/common/datePicker/datepicker_left_arrow.svg');
    background-repeat: no-repeat;
  }
  .react-datepicker__navigation--next {
    top: 2.5rem;
    right: 3.5rem;
    border: 0;
    background-image: url('/static/svg/common/datePicker/datepciker_right_arrow.svg');
    background-repeat: no-repeat;
  }
  .react-datepicker__current-month {
    font-size: 1rem;
    font-weight: 600;
  }
  .react-datepicker__day-names {
    padding-top: 1rem;
  }
  .react-datepicker__day-name {
    width: 3rem;
    margin: 0;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
    color: ${palette.gray_71};
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day {
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${palette.black};
    outline: none;
    &:hover {
      border: 1px solid ${palette.black};
      color: ${palette.black};
      background-color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--selected {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
    &:hover {
      background-color: ${palette.black};

      color: white;
    }
  }
  .react-datepicker__day--range-start {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    color: ${palette.gray_dd};
    cursor: no-drop;
    &:hover {
      border: 0;
    }
  }
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
