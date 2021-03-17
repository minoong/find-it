import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import UploadIcon from '../../public/static/svg/register/upload.svg';
import { useSelector } from '../../store';
import Button from '../common/Button';
import { uploadFileAPI } from '../../lib/api/file';
import { registerRoomActions } from '../../store/registerRoom';
import RegisterRoomPhotoCardList from './RegisterRoomPhotoCardList';
import RegisterRoomFooter from './RegisterRoomFooter';
import Step from '../common/Step';

const RegisterRoomPhotoBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
  .register-room-step-info {
    font-size: 0.875rem;
    max-width: 27rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
  .register-room-upload-photo-wrapper {
    width: 53.625rem;
    height: 27.0625rem;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 0.375rem;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterRoomPhoto: React.FC = () => {
  const photos = useSelector((state) => state.registerRoom.photos);
  const dispatch = useDispatch();
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append('file', file);

      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) {
          dispatch(registerRoomActions.setPhoto([...photos, data]));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <RegisterRoomPhotoBlock>
      <Step title="sfds" step={8}>
        게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려볼 수 있도록 해주세요.
        <br />
        우선 사진 1장을 업로드하고 숙소를 등록한 후에 추가할 수 있습니다.
      </Step>
      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <Button icon={<UploadIcon />} color="bittersweet" width="10.4375rem">
              사진 업로드
            </Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
      <RegisterRoomFooter prevHref="/room/register/conveniences" nextHref="/room/register/description" />
    </RegisterRoomPhotoBlock>
  );
};

export default RegisterRoomPhoto;
