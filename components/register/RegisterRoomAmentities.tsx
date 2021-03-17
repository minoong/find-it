import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { amentityList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import CheckboxGroup from '../common/CheckboxGroup';
import Step from '../common/Step';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomAmentitiesBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
`;

const RegisterRoomAmentities: React.FC = () => {
  const dispatch = useDispatch();
  const amentities = useSelector((state) => state.registerRoom.amentities);
  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };
  return (
    <RegisterRoomAmentitiesBlock>
      <Step title="어떤 편의 시설을 제공하시나요?" step={6}>
        일반적으로 게스트가 기대하는 편의 시설 목록입니다. 숙소를 등록한 후 언제든 편의 시설을 추가할 수 있어요.
      </Step>
      <div className="register-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup value={amentities} onChange={onChangeAmentities} options={amentityList} />
      </div>
      <RegisterRoomFooter prevHref="/room/register/geometry" nextHref="/room/register/conveniences" />
    </RegisterRoomAmentitiesBlock>
  );
};

export default RegisterRoomAmentities;
