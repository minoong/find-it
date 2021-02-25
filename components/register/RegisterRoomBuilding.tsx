import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { apartmentBuildingTypeList, largeBuildingTypeList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import Selector from '../common/Selector';

const RegisterRoomBuildingBlock = styled.div`
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
  .register-room-building-selector-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }
`;

const disabledLargeBuildingTypeOptions = ['숙소를 선택하세요.'];

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const dispatch = useDispatch();
  const onChageLargeBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBulidingType(event.target.value));
  };
  const onChageBuildingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBulidingType(event.target.value));
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
  return (
    <RegisterRoomBuildingBlock>
      <h2>숙소 유형은 무엇인가요?</h2>
      <h3>Step 1</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          disabledOptions={disabledLargeBuildingTypeOptions}
          defaultValue={disabledLargeBuildingTypeOptions[0]}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
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
          options={detailBuildingOptions}
        />
      </div>
    </RegisterRoomBuildingBlock>
  );
};

export default RegisterRoomBuilding;
