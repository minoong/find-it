import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const InputBlock = styled.div<{ iconExist: boolean }>`
  input {
    width: 100%;
    height: 2.875rem;
    padding: ${({ iconExist }) => (iconExist ? '0 2.5rem 0 1rem ' : '0 1rem')};
    border: 1px solid ${palette.gray_dd};
    border-radius: 0.25rem;
    font-size: 0.75rem;
    outline: none;
    ::placeholder {
      color: ${palette.gray_aa};
    }
    &:focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }
  .input-icon-wrapper {
    position: absolute;
    right: 0.75rem;
    top: 1rem;
    path {
      fill: ${palette.gray_aa};
    }
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <InputBlock iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </InputBlock>
  );
};

export default Input;
