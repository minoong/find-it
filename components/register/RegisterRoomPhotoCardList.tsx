import React from 'react';
import styled from 'styled-components';
import TrashIcon from '../../public/static/svg/register/photo/trash_can.svg';
import PencilIcon from '../../public/static/svg/register/photo/pencil.svg';
import GrayPlusIcon from '../../public/static/svg/register/photo/gray_plus.svg';
import palette from '../../styles/palette';
import { useDispatch } from 'react-redux';
import { uploadFileAPI } from '../../lib/api/file';
import { registerRoomActions } from '../../store/registerRoom';

const RegisterRoomPhotoCardListBlock = styled.ul`
  width: 53.625rem;
  margin: auto;
  .register-room-first-photo-wrapper {
    width: 53.625rem;
    height: 27.0625rem;
    margin: 0 auto 1.6rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.375rem;
    overflow: hidden;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: auto;
      height: 100%;
    }
  }

  .register-room-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    button {
      width: 3rem;
      height: 3rem;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 0.5rem;
      }
    }
  }

  li:nth-child(3n + 1) {
    margin-right: 0;
  }

  .register-room-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 3rem) / 3);
    height: 11.25rem;
    border-radius: 0.375rem;

    text-align: center;

    overflow: hidden;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }

    img {
      height: 100%;
    }
  }

  .register-room-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 0.375rem;
    cursor: pointer;
    overflow: hidden;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;

    svg {
      margin-bottom: 0.75rem;
    }
  }
`;

interface IProps {
  photos: string[];
}

const RegisterRoomPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const dispatch = useDispatch();

  const addPhto = () => {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = 'image/*';
    el.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            dispatch(registerRoomActions.setPhoto([...photos, data]));
          })
          .catch((e) => console.error(e));
      }
    };

    el.click();
  };
  return (
    <RegisterRoomPhotoCardListBlock>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-room-first-photo-wrapper">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button type="button" onClick={() => {}}>
                  <TrashIcon />
                </button>
                <button type="button" onClick={() => {}}>
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className="register-room-photo-card">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button type="button" onClick={() => {}}>
                  <TrashIcon />
                </button>
                <button type="button" onClick={() => {}}>
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li className="register-room-photo-card" role="presentation" onClick={addPhto}>
        <div className="register-room-add-more-photo-card">
          <GrayPlusIcon />
          추가하기
        </div>
      </li>
    </RegisterRoomPhotoCardListBlock>
  );
};

export default RegisterRoomPhotoCardList;
