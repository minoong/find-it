/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';
import WarningIcon from '../../public/static/svg/common/warning.svg';

const DefaultSelectorStyle = css`
  width: 100%;
  height: 2.875rem;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    font-size: 0.75rem;
    padding: 0 0.7rem;
    border-radius: 0.25rem;
    outline: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 1rem;
    color: ${palette.gray_76};
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  select {
    width: 100%;
    height: 3.5rem;
    border-radius: 0.25rem;
    border: 1px solid ${palette.gray_eb};
    padding: 0 0.7rem;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    background-image: url('/static/svg/common/selector/register_selector_down_arrow.svg');
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
  }
`;

interface SelectorContainerProp {
  isValid: boolean;
  validationMode: boolean;
  type: 'register' | 'default';
}

const SelectorBlock = styled.div<SelectorContainerProp>`
  ${({ type }) => type === 'default' && DefaultSelectorStyle};
  ${({ type }) => type === 'register' && RegisterSelectorStyle};

  select {
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

    &:disabled {
      background-image: url('/static/svg/common/selector/disabled_register_selector_down_arrow.svg');
      background-color: ${palette.gray_bb};
      border-color: ${palette.gray_eb};
      color: ${palette.gray_f7};
      cursor: not-allowed;
    }
  }
  .selector-warning {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.25rem;
    }
    p {
      font-size: 0.75rem;
      color: ${palette.davidson_orange};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'default';
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  label,
  options = [],
  isValid,
  useValidation = true,
  errorMessage = '옵션을 선택하세요.',
  type = 'default',
  disabledOptions = [],
  ...props
}) => {
  const validationMode = useSelector((state) => state.common.validationMode);
  return (
    <SelectorBlock isValid={!!isValid} validationMode={useValidation && validationMode} type={type}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {useValidation && validationMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </SelectorBlock>
  );
};

export default React.memo(Selector);
