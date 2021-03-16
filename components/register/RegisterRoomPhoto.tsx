import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import palette from '../../styles/palette';
import UploadIcon from '../../public/static/svg/register/upload.svg';
import { useSelector } from '../../store';
import Button from '../common/Button';
import { uploadFileAPI } from '../../lib/api/file';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../store/registerRoom';

const RegisterRoomPhotoBlock = styled.div`
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
  .register-room-step-info {
    font-size: 0.875rem;
    max-width: 25rem;
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
      <h2>숙소 사진 올리기</h2>
      <h3>Step 7</h3>
      <p className="register-room-step-info">
        게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려볼 수 있도록 해주세요. 우선 사진 1장을 업로드하고 숙소를 등록한
        후에 추가할 수 있습니다.
      </p>
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
    </RegisterRoomPhotoBlock>
  );
};

export default RegisterRoomPhoto;
