/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import Step from '../common/Step';
import RegisterRoomCheckStep from './RegisterRoomCheckStep';
import RegisterRoomFooter from './RegisterRoomFooter';
import RegisterRoomSubmitFooter from './RegisterRoomSubmitFooter';

const RegisterRoomChecklistBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  min-height: 100vh;
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector((state) => state.registerRoom);
  const isBuildingTypeActived = useMemo(() => {
    const { largeBuildingType, buildingType, roomType, isSetUpForGuest } = registerRoom;

    console.log(largeBuildingType, buildingType, roomType, isSetUpForGuest);

    if (!largeBuildingType || !buildingType || !roomType || !isSetUpForGuest) {
      return false;
    }

    return true;
  }, []);
  const isRoomTypeActived = useMemo(() => {
    const { maximumGuestCount, bedroomCount, bedCount, bedList, publicBedList } = registerRoom;

    console.log(maximumGuestCount, bedroomCount, bedCount, bedList, publicBedList);

    if (!isBuildingTypeActived || !maximumGuestCount || !bedroomCount || !bedCount) {
      return false;
    }
    return true;
  }, []);

  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  const isLocationActived = useMemo(() => {
    const { latitude, longitude, country, city, district, streetAddress, detailAddress, postcode } = registerRoom;

    if (!latitude || !longitude || !country || !city || !district || !streetAddress || !detailAddress || !postcode) {
      return false;
    }
    return true;
  }, []);

  const isAmentitiesActived = useMemo(() => {
    const { amentities } = registerRoom;
    if (!isLocationActived) {
      return false;
    }
    return true;
  }, []);

  const isConviniencesActived = useMemo(() => {
    if (!isAmentitiesActived) {
      return false;
    }
    return true;
  }, []);

  console.log('###########', isConviniencesActived, isAmentitiesActived);

  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConviniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;

    if (!isPhotoActived || !description) {
      return false;
    }
    return true;
  }, []);

  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;

    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) {
      return false;
    }
    return true;
  }, []);

  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) return 'building';
    if (!isRoomTypeActived) return 'bedrooms';
    if (!isBathroomActived) return 'bathroom';
    if (!isLocationActived) return 'location';
    if (!isAmentitiesActived) return 'amentities';
    if (!isConviniencesActived) return 'conveniences';
    if (!isPhotoActived) return 'photo';
    if (!isDescriptionActived) return 'description';
    if (!isTitleActived) return 'title';
    if (!isPriceActived) return 'price';
    if (!isDateActived) return 'date';
    return '';
  }, []);

  return (
    <RegisterRoomChecklistBlock>
      <Step title="" step={13}>
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </Step>
      <ul>
        <RegisterRoomCheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === 'building'}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === 'bedrooms'}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === 'bathroom'}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === 'location'}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amentities"
          disabled={!isAmentitiesActived}
          inProgress={stepInProgress === 'amentities'}
        />
        <RegisterRoomCheckStep
          step="공용 공간"
          href="/room/register/conveniences"
          disabled={!isConviniencesActived}
          inProgress={stepInProgress === 'conveniences'}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === 'photo'}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === 'description'}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === 'title'}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActived}
          inProgress={stepInProgress === 'price'}
        />
        <RegisterRoomCheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === 'date'}
        />
      </ul>
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter prevHref="/room/register/date" nextHref={`/room/register/${stepInProgress}`} />
      )}
    </RegisterRoomChecklistBlock>
  );
};

export default RegisterRoomChecklist;
