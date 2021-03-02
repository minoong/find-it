import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { bedroomCountList } from '../../lib/staticData';
import { getNumber } from '../../lib/utils';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import Counter from '../common/Counter';
import Selector from '../common/Selector';

const RegisterRoomBedRoomsBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  h2 {
    font-size: 1.1875rem;
    font-weight: bold;
    margin-bottom: 3.5rem;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_48};
    margin-bottom: 0.375rem;
  }
  .register-room-step-info {
    font-size: 0.875rem;
    max-width: 25rem;
    margin-bottom: 1.5rem;
    max-width: 25rem;
    word-break: keep-all;
  }
  .register-room-maximum-guest-count-wrapper {
    width: 20rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  .register-room-bedroom-count-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }
`;

const RegisterRoomBedRooms: React.FC = () => {
  const maximumGuestCount = useSelector((state) => state.registerRoom.maximumGuestCount);
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);

  const dispatch = useDispatch();

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };
  const onChangeBedroomCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0));
  };

  return (
    <RegisterRoomBedRoomsBlock>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="room-register-room-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
      </p>
      <div className="register-room-maximum-guest-count-wrapper">
        <Counter label="최대 숙박 인원" value={maximumGuestCount} onChage={onChangeMaximumGuestCount} />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <Selector
          type="register"
          value={`침실 ${bedroomCount}개`}
          onChange={onChangeBedroomCount}
          label="게스트가 사용할 수 있는 침실은 몇개인가요?"
          options={bedroomCountList}
        />
      </div>
    </RegisterRoomBedRoomsBlock>
  );
};

export default RegisterRoomBedRooms;
