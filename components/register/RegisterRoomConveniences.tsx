/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { convenienceList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import CheckboxGroup from '../common/CheckboxGroup';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomConveniencesBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  h2 {
    font-size: 1.1875rem;
    font-weight: bold;
    margin-bottom: 3.5rem;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 0.375rem;
  }
  .register-room-step-info {
    font-size: 0.875rem;
    max-width: 25rem;
    margin-bottom: 1.5rem;
  }
`;

const RegisterRoomConveniences: React.FC = () => {
  const dispatch = useDispatch();
  const conveniences = useSelector((state) => state.registerRoom.conveniences);
  const onChangeConveniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };
  return (
    <RegisterRoomConveniencesBlock>
      <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
      <h3>Step 6</h3>
      <p className="register-room-step-info">등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.</p>
      <div className="register-room-conveniences-checkbox-group-wrapper">
        <CheckboxGroup value={conveniences} onChange={onChangeConveniences} options={convenienceList} />
        <RegisterRoomFooter prevHref="/room/register/amentities" nextHref="/room/register/photo" />
      </div>
    </RegisterRoomConveniencesBlock>
  );
};

export default RegisterRoomConveniences;
