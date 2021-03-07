/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { bedTypes } from '../../lib/staticData';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import { BedType } from '../../types/room';
import Button from '../common/Button';
import Counter from '../common/Counter';
import Selector from '../common/Selector';

const RegisterRoomBedTypesBlock = styled.li`
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
  .register-room-bed-type-bedroom-text {
    line-height: 1.5;
    .register-room-bed-type-bedroom {
      font-size: 1.1875rem;
      color: ${palette.gray_48};
    }
    .register-room-bed-type-bedroom-count {
      font-size: 0.765rem;
      color: ${palette.gray_76};
    }
  }
  .register-room-bed-type-selector-wrapper {
    width: 20rem;
    .register-room-bed-type-counter {
      width: 20rem;
      margin-top: 1.75rem;
    }
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);
  const initailBedOptions = bedroom.beds.map((bed) => bed.type);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initailBedOptions);

  const dispatch = useDispatch();

  const bedTotInfo = useMemo(() => {
    const tot = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return tot.join(', ');
  }, [bedroom]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });

    return total;
  }, [bedroom]);

  const onChageBedTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      }),
    );
  };

  const toggleOpend = () => setOpened(!opened);
  return (
    <RegisterRoomBedTypesBlock>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-text">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-bed-type-bedroom-counts">침대 {totalBedsCount}개</p>
          <p className="register-room-bed-type-bedroom-count">{bedTotInfo}</p>
        </div>
        <Button onClick={toggleOpend} styleType="register" color="white">
          {opened && '완료'}
          {!opened && (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            type="register"
            value="다른 침대 추가"
            options={lastBedOptions}
            useValidation={false}
            onChange={(e) => setActivedBedOptions([...activedBedOptions, e.target.value as BedType])}
            disabledOptions={['다른 침대 추가']}
          />
        </div>
      )}
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                key={type}
                onChage={(value) => {
                  onChageBedTypeCount(value, type);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </RegisterRoomBedTypesBlock>
  );
};

export default RegisterRoomBedTypes;
