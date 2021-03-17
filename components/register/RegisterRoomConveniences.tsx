/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { convenienceList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import CheckboxGroup from '../common/CheckboxGroup';
import Step from '../common/Step';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomConveniencesBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
`;

const RegisterRoomConveniences: React.FC = () => {
  const dispatch = useDispatch();
  const conveniences = useSelector((state) => state.registerRoom.conveniences);
  const onChangeConveniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };
  return (
    <RegisterRoomConveniencesBlock>
      <Step title="게스트가 어떤 공간을 사용할 수 있나요?" step={7}>
        등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.
      </Step>
      <div className="register-room-conveniences-checkbox-group-wrapper">
        <CheckboxGroup value={conveniences} onChange={onChangeConveniences} options={convenienceList} />
        <RegisterRoomFooter prevHref="/room/register/amentities" nextHref="/room/register/photo" />
      </div>
    </RegisterRoomConveniencesBlock>
  );
};

export default RegisterRoomConveniences;
