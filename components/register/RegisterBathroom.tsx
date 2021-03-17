import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import Counter from '../common/Counter';
import RadioGroup from '../common/RadioGroup';
import Step from '../common/Step';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterBathroomBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  line-height: 1.5;
  .register-room-bathroom-counter-wrapper {
    width: 18.125rem;
    margin: 2rem 0;
  }
`;

const RegisterBathroom: React.FC = () => {
  const bathroomCount = useSelector((state) => state.registerRoom.bathroomCount);
  const bathroomType = useSelector((state) => state.registerRoom.bathroomType);
  const dispatch = useDispatch();

  return (
    <RegisterBathroomBlock>
      <Step title="욕실 수" step={3}>
        샤워실 또는 욕조가 없는 경우 0.5개로 간주합니다.
      </Step>
      <div className="register-room-bathroom-counter-wrapper">
        <Counter
          label="욕실"
          increaseNum={0.5}
          value={bathroomCount}
          onChage={(value) => dispatch(registerRoomActions.setBathroomCount(value))}
        />
      </div>
      <RadioGroup
        label="게스트가 단독으로 사용하는 욕실인가요?"
        value={bathroomType}
        isValid={!!bathroomType}
        onChange={(value) => dispatch(registerRoomActions.setBathroomType(value))}
        options={[
          { value: 'private', label: '예' },
          { value: 'public', label: '아니오' },
        ]}
      />
      <RegisterRoomFooter
        prevHref="/room/register/bedrooms"
        nextHref="/room/register/location"
        isValid={bathroomCount > 0 && !!bathroomType}
      />
    </RegisterBathroomBlock>
  );
};

export default RegisterBathroom;
