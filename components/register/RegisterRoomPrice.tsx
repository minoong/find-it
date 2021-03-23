import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import RegisterRoomFooter from './RegisterRoomFooter';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import Input from '../common/Input';
import Step from '../common/Step';
import { makeMoneyString } from '../../lib/utils';

const RegisterRoomPriceBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  width: 27.8125rem;
`;

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.registerRoom.price);

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const numberPrice = Number(input.replace(/,/g, ''));
    //? 인풋 값이 비워지면 price를 0으로 변경
    if (!numberPrice || numberPrice === 0) {
      dispatch(registerRoomActions.setPrice(0));
    }

    if (numberPrice !== 0) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };
  return (
    <RegisterRoomPriceBlock>
      <Step title="숙소 요금 설정하기" step={11} />
      <Input label="기본요금" value={makeMoneyString(String(price))} onChange={onChangePrice} />
      <RegisterRoomFooter prevHref="/room/register/title" nextHref="/room/register/date" />
    </RegisterRoomPriceBlock>
  );
};

export default RegisterRoomPrice;
