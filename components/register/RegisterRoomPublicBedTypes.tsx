/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { bedTypes } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import { BedType } from '../../types/room';
import Button from '../common/Button';
import Counter from '../common/Counter';
import Selector from '../common/Selector';

const RegisterRoomPublicBedTypesBlock = styled.li`
  width: 100%;
  padding: 1.75rem 0.5rem;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  transition: all 0.2s;
  :hover {
    background-color: #f0f0f0;
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
  .register-room-bed-type-bedroom-text {
    line-height: 1.5;
    .register-room-bed-type-bedroom {
      font-size: 1.1875rem;
      font-weight: bold;
      color: ${palette.gray_48};
    }
    .register-room-bed-type-bedroom-count {
      font-size: 0.765rem;
      color: ${palette.gray_76};
    }
  }
  .register-room-bed-type-counter {
    width: 18.125rem;
    margin-bottom: 1.125rem;
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const publicBedList = useSelector((state) => state.registerRoom.publicBedList);

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    const total = publicBedList.reduce((acc, bed) => {
      acc += bed.count;
      return acc;
    }, 0);
    return total;
  }, [publicBedList]);

  const bedsTxt = useMemo(() => {
    const txts = publicBedList.map((bed) => `${bed.type} ${bed.count}개`);
    return txts.join(', ');
  }, [publicBedList]);

  const initailBedOptions = () => publicBedList.map((bed) => bed.type);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initailBedOptions);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, publicBedList]);

  return (
    <RegisterRoomPublicBedTypesBlock>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-text">
          <p className="register-room-bed-type-bedroom">공용공간</p>
          <p className="register-bed-type-bedroom-counts">침대 {totalBedsCount}개</p>
          <p className="register-room-bed-type-bedroom-count">{bedsTxt}</p>
        </div>
        <Button onClick={() => setOpened(!opened)} styleType="register" color="white">
          {opened && '완료'}
          {!opened && (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>
      {opened && (
        <div className="register-room-public-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={publicBedList.find((bed) => bed.type === type)?.count || 0}
                key={type}
                onChage={(value) => dispatch(registerRoomActions.setPublicBedTypeCount({ type, count: value }))}
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            disabledOptions={['다른 침대 추가']}
            value="다른 침대 추가"
            useValidation={false}
            onChange={(e) => setActivedBedOptions([...activedBedOptions, e.target.value as BedType])}
          />
        </div>
      )}
    </RegisterRoomPublicBedTypesBlock>
  );
};

export default RegisterRoomPublicBedTypes;
