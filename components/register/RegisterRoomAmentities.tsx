import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { amentityList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import CheckboxGroup from '../common/CheckboxGroup';

const RegisterRoomAmentitiesBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  h2 {
    font-size: 1.1875rem;
    font-weight: bold;
    margin-bottom: 3.125rem;
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

const RegisterRoomAmentities: React.FC = () => {
  const dispatch = useDispatch();
  const amentities = useSelector((state) => state.registerRoom.amentities);
  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };
  return (
    <RegisterRoomAmentitiesBlock>
      <h2>어떤 편의 시설을 제공하시나요?</h2>
      <h3>Step 5</h3>
      <p className="register-room-step-info">
        일반적으로 게스트가 기대하는 편의 시설 목록입니다. 숙소를 등록한 후 언제든 편의 시설을 추가할 수 있어요.
      </p>
      <div className="register-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup value={amentities} onChange={onChangeAmentities} options={amentityList} />
      </div>
    </RegisterRoomAmentitiesBlock>
  );
};

export default RegisterRoomAmentities;
