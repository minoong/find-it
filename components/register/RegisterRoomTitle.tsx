import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import Input from '../common/Input';
import Step from '../common/Step';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomTitleBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  width: 27.8125rem;
`;

const RegisterRoomTitle: React.FC = () => {
  const title = useSelector((state) => state.registerRoom.title);
  const dispatch = useDispatch();
  const onChnageTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(registerRoomActions.setTitle(event.target.value));
  return (
    <RegisterRoomTitleBlock>
      <Step title="숙소의 제목을 만드세요." step={10} />
      <Input
        label="속소의 특성과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요."
        value={title}
        onChange={onChnageTitle}
      />
      <RegisterRoomFooter prevHref="/room/register/description" nextHref="/room/register/price" />
    </RegisterRoomTitleBlock>
  );
};

export default RegisterRoomTitle;
