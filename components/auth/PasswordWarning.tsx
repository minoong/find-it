import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';

const PasswordWarningBlock = styled.div<{ isValid: boolean }>`
  color: ${({ isValid }) => (!isValid ? palette.davidson_orange : palette.green)};
  display: flex;
  line-height: 1.5;
  font-size: 0.5rem;
  align-items: center;
  svg {
    margin-right: 0.375rem;
    width: 0.5rem;
    height: 0.5rem;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <PasswordWarningBlock isValid={isValid}>
      {!isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </PasswordWarningBlock>
  );
};

export default PasswordWarning;
