import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { apartmentBuildingTypeList, largeBuildingTypeList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import RadioGroup from '../common/RadioGroup';
import Selector from '../common/Selector';
import Step from '../common/Step';
import RegisterRoomFooter from './RegisterRoomFooter';

const RegisterRoomBuildingBlock = styled.div`
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
  .register-room-building-selector-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }
  .register-room-room-type-radio {
    max-width: 30.3125rem;
    margin-bottom: 3.125rem;
  }
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 3.125rem;
  }
`;

const disabledLargeBuildingTypeOptions = ['숙소를 선택하세요.'];
const roomTypeRadioOptions = [
  {
    label: '집 전체',
    value: 'entire',
    description:
      '게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.',
  },
  {
    label: '개인실',
    value: 'private',
    description: '게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.',
  },
  {
    label: '다인실',
    value: 'public',
    description: '게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용공간에서 숙박합니다.',
  },
];
const isSetUpForGuestOptions = [
  { label: '예, 게스트용으로 따로 마련된 숙소입니다.', value: 'true' },
  { label: '아니요, 제 개인 물건이 숙소에 있습니다.', value: 'false' },
];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.roomType);
  const isSetUpForGuest = useSelector((state) => state.registerRoom.isSetUpForGuest);

  const dispatch = useDispatch();
  const onChageLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBulidingType(event.target.value));
  };
  const onChageBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBulidingType(event.target.value));
  };
  const onChangeRoomType = (selected: string) => {
    dispatch(registerRoomActions.setRoomType(selected as 'entire' | 'private' | 'public'));
  };
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case '아파트': {
        const { apartmentBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(apartmentBuildingTypeList[0]));
        return apartmentBuildingTypeList;
      }
      case '주택': {
        const { houstBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(houstBuildingTypeList[0]));
        return houstBuildingTypeList;
      }
      case '별채': {
        const { secondaryUnitBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(secondaryUnitBuildingTypeList[0]));
        return secondaryUnitBuildingTypeList;
      }
      case '독특한 숙소': {
        const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(uniqueSpaceBuildingTypeList[0]));
        return uniqueSpaceBuildingTypeList;
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }
      case '부티크호텔': {
        const { boutiquesHotelBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBulidingType(boutiquesHotelBuildingTypeList[0]));
        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  // form 검증
  const isValid = useMemo(() => {
    if (!largeBuildingType || !buildingType || !roomType || isSetUpForGuest === null) {
      return false;
    }
    return true;
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

  const onChageIsSetUpForGuest = (value: any) => {
    dispatch(registerRoomActions.setIsSetUpForGuest(value));
  };
  return (
    <RegisterRoomBuildingBlock>
      <Step title="숙소 유형은 무엇인가요?" step={1} />

      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          disabledOptions={disabledLargeBuildingTypeOptions}
          defaultValue={disabledLargeBuildingTypeOptions[0]}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          isValid={!!largeBuildingType}
          onChange={onChageLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          onChange={onChageBuildingType}
          disabled={!largeBuildingType}
          label="건물 유형을 선택하세요."
          isValid={!!buildingType}
          options={detailBuildingOptions}
        />
      </div>
      {buildingType && (
        <div className="register-room-room-type-radio">
          <RadioGroup
            label="게스트가 묵게 될 숙소 유형을 골라주세요."
            value={roomType}
            options={roomTypeRadioOptions}
            isValid={!!roomType}
            onChange={onChangeRoomType}
          />
        </div>
      )}
      <div className="register-room-is-setup-for-guest-radio">
        <RadioGroup
          label="게스트만 사용되도록 만들어진 숙소인가요?"
          value={isSetUpForGuest}
          onChange={onChageIsSetUpForGuest}
          isValid={!!isSetUpForGuest}
          options={isSetUpForGuestOptions}
        />
      </div>
      <RegisterRoomFooter isValid={isValid} prevHref="/" nextHref="/room/register/bedrooms" />
    </RegisterRoomBuildingBlock>
  );
};

export default RegisterRoomBuilding;
