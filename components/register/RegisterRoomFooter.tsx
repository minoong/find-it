import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import palette from '../../styles/palette';
import Button from '../common/Button';
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import validationModeHook from '../../hooks/useValidationMode';

const RegisterRoomFooterBlock = styled.footer`
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
  border-top: 1px solid ${palette.gray_eb};

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

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterRoomFooter: React.FC<IProps> = ({ prevHref, nextHref, isValid = true }) => {
  const { setValidationMode } = validationModeHook();
  useEffect(() => {
    return () => {
      setValidationMode(false);
    };
  }, []);
  const onClickNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      event.preventDefault();
      setValidationMode(true);
    }
  };

  return (
    <RegisterRoomFooterBlock>
      <Link href={prevHref || ''}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ''}>
        <a className="register-room-footer-back">
          <Button color="dark_cyan" onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </RegisterRoomFooterBlock>
  );
};

export default RegisterRoomFooter;
