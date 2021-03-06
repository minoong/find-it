/* eslint-disable prefer-template */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import NavigationIcon from '../../public/static/svg/register/navigation.svg';
import Button from '../common/Button';
import { countryList } from '../../lib/staticData';
import Selector from '../common/Selector';
import Input from '../common/Input';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import { getLocationInfoAPI } from '../../lib/api/map';
import RegisterRoomFooter from './RegisterRoomFooter';
import Step from '../common/Step';

const RegisterRoomLocationBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  .register-room-location-button-wrapper {
    width: 11rem;
    margin-bottom: 1.5rem;
  }
  .register-room-location-country-selector-wrapper {
    width: 24.0625rem;
    margin-bottom: 1.5rem;
  }
  .register-room-location-city-district {
    max-width: 24.0625rem;
    display: flex;
    margin-bottom: 1.5rem;
    > div:first-child {
      margin-right: 1.5rem;
    }
  }
  .register-room-location-street-address {
    max-width: 24.0625rem;
    margin-bottom: 1.5rem;
  }
  .register-room-location-detail-address {
    max-width: 24.0625rem;
    margin-bottom: 1.5rem;
  }
  .register-room-location-postcode {
    max-width: 24.0625rem;
  }
`;

const disabledCountryOptions = ['국가/지역 선택'];

const RegisterRoomLocation: React.FC = () => {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector((state) => state.registerRoom.streetAddress);
  const detailAddress = useSelector((state) => state.registerRoom.detailAddress);
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(event.target.value));
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };

  const onChangeStreetAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };
  const onChangeDetailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(event.target.value));
  };
  const onChangePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(e.target.value));
  };

  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(registerRoomActions.setStreetAddress(currentLocation.streetAddress));
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
    } catch (error) {
      console.error('Exception ' + error);
    } finally {
      setLoading(false);
    }
  };

  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
    });
  };

  return (
    <RegisterRoomLocationBlock>
      <Step title="숙소의 위치를 알려주세요." step={4}>
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개합니다.
      </Step>
      <div className="register-room-location-button-wrapper">
        <Button color="dark_cyan" colorReverse icon={<NavigationIcon />} onClick={onClickGetCurrentLocation}>
          {loading ? '불러오는 중...' : '현재 위치 사용'}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="국가/지역 선택"
          disabledOptions={disabledCountryOptions}
          value={country || undefined}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" value={city} onChange={onChangeCity} />
        <Input label="시/군/구" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명주소" value={streetAddress} onChange={onChangeStreetAdress} />
      </div>
      <div className="register-room-location-detail-address">
        <Input label="동호수(선택 사항)" value={detailAddress} onChange={onChangeDetailAddress} useValidation={false} />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" value={postcode} onChange={onChangePostcode} />
      </div>
      <RegisterRoomFooter prevHref="/room/register/bathroom" nextHref="/room/register/geometry" />
    </RegisterRoomLocationBlock>
  );
};

export default RegisterRoomLocation;
