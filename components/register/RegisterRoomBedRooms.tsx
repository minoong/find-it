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
import Step from '../common/Step';
import RegisterRoomBedList from './RegisterRoomBedList';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomBedRoomsBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  .register-room-maximum-guest-count-wrapper {
    width: 20rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  .register-room-bedroom-count-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }
  .register-room-bed-count-wrapper {
    width: 20rem;
    margin-bottom: 3.5625rem;
  }
  .register-room-bed-type-info {
    margin-top: 0.375rem;
    margin-bottom: 1.25rem;
    max-width: 25rem;
    word-break: keep-all;
    line-height: 1.5;
  }
  .register-room-bed-type-list-wrapper {
    width: 34.25rem;
  }
  .register-room-bedroom {
    width: 100%;
    padding: 1.75rem 0;
    border-top: 1px solid ${palette.gray_dd};
    &:last-child {
      border-bottom: 1px solid ${palette.gray_dd};
    }
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 1.1875rem;
    color: ${palette.gray_48};
  }
`;

const RegisterRoomBedRooms: React.FC = () => {
  const maximumGuestCount = useSelector((state) => state.registerRoom.maximumGuestCount);
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);
  const bedCount = useSelector((state) => state.registerRoom.bedCount);

  const dispatch = useDispatch();

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };
  const onChangeBedroomCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBedroomCount(getNumber(event.target.value) || 0));
  };
  const onChnageBedCount = (value: number) => dispatch(registerRoomActions.setBedCount(value));

  return (
    <RegisterRoomBedRoomsBlock>
      <Step title="숙소에 얼마나 많은 인원이 숙박할 수 있나요?" step={2}>
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
      </Step>

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
          isValid={!!bedroomCount}
        />
      </div>
      <div className="register-room-bed-count-wrapper">
        <Counter label="침대" value={bedCount} onChage={onChnageBedCount} />
      </div>
      <h2>침대유형</h2>
      <p className="register-room-bed-type-info">
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지 게스트가 잘 파악할 수 있습니다.
      </p>
      <RegisterRoomBedList />
      <RegisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isValid={!!bedroomCount}
      />
    </RegisterRoomBedRoomsBlock>
  );
};

export default RegisterRoomBedRooms;
