import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Button from '../common/Button';
import CheckMarkIcon from '../../public/static/svg/register/dark_cyan_check_mark.svg';

const RegisterRoomCheckStepBlock = styled.li`
  display: inline-block;
  padding: 1rem 0;
  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.75rem;
    }

    span {
      font-size: 1rem;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  .register-room-check-step-in-progress {
    margin-left: 1.75rem;
  }
  .register-room-check-step-continue-button {
    margin: 0.5rem 0 0 1.75rem;
  }
  .disabled-step {
    margin-left: 1.75rem;
    font-size: 1rem;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

const RegisterRoomCheckStep: React.FC<IProps> = ({ disabled, inProgress, step, href }) => {
  if (inProgress) {
    return (
      <RegisterRoomCheckStepBlock>
        <Link href={href}>
          <a className="register-room-check-step-in-progress">
            <span>{step}</span>
          </a>
        </Link>
        <Link href={href}>
          <a className="register-room-check-step-continue-button">
            <Button color="dark_cyan" size="small" width="3.4375rem">
              계속
            </Button>
          </a>
        </Link>
      </RegisterRoomCheckStepBlock>
    );
  }

  if (disabled) {
    return (
      <RegisterRoomCheckStepBlock>
        <p className="disabled-step">{step}</p>
      </RegisterRoomCheckStepBlock>
    );
  }
  return (
    <RegisterRoomCheckStepBlock>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </RegisterRoomCheckStepBlock>
  );
};

export default RegisterRoomCheckStep;
