import React from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import Step from '../common/Step';
import DatePicker from '../common/DatePicker';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';

const RegisterRoomDateBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
`;

const RegisterRoomDate: React.FC = () => {
  const startDate = useSelector((state) => state.registerRoom.startDate);
  const dispatch = useDispatch();
  const onChangeStartDate = (date: Date | null) => {
    console.log(date);
    dispatch(registerRoomActions.setStartDate(date ? date.toISOString() : null));
  };
  return (
    <RegisterRoomDateBlock>
      <Step title="예약 가능 여부 설정하기" step={11} />
      <DatePicker selected={startDate ? new Date(startDate) : null} onChange={onChangeStartDate} />
    </RegisterRoomDateBlock>
  );
};

export default RegisterRoomDate;
