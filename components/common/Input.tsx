import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store';
import palette from '../../styles/palette';

type InputContainerProps = {
  hasIcon: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const InputBlock = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }
  input {
    width: 100%;
    height: 2.875rem;
    padding: ${({ hasIcon }) => (hasIcon ? '0 2.5rem 0 1rem ' : '0 1rem')};
    border: 1px solid ${palette.gray_dd};
    border-radius: 0.25rem;
    font-size: 0.75rem;
    outline: none;
    &::placeholder {
      color: ${palette.gray_aa};
    }
    & :focus {
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

  .input-error-message {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 0.675rem;
    color: ${palette.tawny};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.green};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  isValid?: boolean;
  validationMode?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

// eslint-disable-next-line max-len
const Input: React.FC<IProps> = ({ label, icon, isValid = false, useValidation = true, errorMessage, ...props }) => {
  const validationMode = useSelector((state: RootState) => state.common.validationMode);
  return (
    // eslint-disable-next-line max-len
    <InputBlock
      hasIcon={!!icon}
      isValid={!!isValid}
      useValidation={(validationMode as boolean) && (useValidation as boolean)}
    >
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validationMode && !isValid && errorMessage && (
        <div className="input-error-message">{errorMessage}</div>
      )}
    </InputBlock>
  );
};

export default React.memo(Input);
