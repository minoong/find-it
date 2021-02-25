/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const RadioGroupBlock = styled.div<{ isValid: boolean; validationMode: boolean }>`
  .radio-label {
    font-size: 1rem;
    font-weight: 600;
    color: ${palette.gray_80};
    margin-bottom: 2rem;
  }
  .radio-list-wrapper {
    &:after {
      display: block;
      content: '';
      clear: both;
    }
  }
  label {
    float: left;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    cursor: pointer;
    clear: both;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type='radio'] {
    width: 1rem;
    height: 1rem;
    margin: 0;
    position: relative;
    margin-right: 0.75rem;
    flex-shrink: 0;
    font-size: 1rem;
    -webkit-appearance: none;
    border: 1ps solid ${palette.gray_b0};
    border-radius: 50%;
    outline: none;
    cursor: pointer;

    ${({ validationMode, isValid }) => {
      if (validationMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}
  }
`;

const RadioGroup: React.FC = () => {
  return <RadioGroupBlock></RadioGroupBlock>;
};

export default RadioGroup;
