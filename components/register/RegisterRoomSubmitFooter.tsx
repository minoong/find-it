import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import palette from '../../styles/palette';
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import Button from '../common/Button';

const RegisterRoomSubmitFooterBlock = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 34.25rem;
  height: 5.125rem;
  padding: 0.875rem 1.875rem 1.25rem;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
  const onClickRegisterRoom = async () => {};
  return (
    <RegisterRoomSubmitFooterBlock>
      <Link href="/room/register/date">
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button onClick={onClickRegisterRoom} color="bittersweet" width="6.375rem">
        등록하기
      </Button>
    </RegisterRoomSubmitFooterBlock>
  );
};

export default RegisterRoomSubmitFooter;
