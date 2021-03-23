import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import Step from '../common/Step';
import Textarea from '../common/Textarea';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomDescriptionBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;

  .register-room-description-wrapper {
    width: 26.875rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const RegisterRoomDescription: React.FC = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.registerRoom.description);
  const onChangeDescrption = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(registerRoomActions.setDescription(e.target.value));
  return (
    <RegisterRoomDescriptionBlock>
      <Step title="게스트에게 숙소에 대해 설명해주세요." step={9}>
        숙소의 장점, 특별한 편의 시설(예: 빠른 와이파이 또는 주차 시설)과 주변 지역의 매력을 소개해주세요.
      </Step>
      <div className="register-room-description-wrapper">
        <Textarea value={description} onChange={onChangeDescrption} />
      </div>
      <RegisterRoomFooter prevHref="/room/register/photo" nextHref="/room/register/title" />
    </RegisterRoomDescriptionBlock>
  );
};

export default RegisterRoomDescription;
