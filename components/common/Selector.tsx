import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const SelectorBlock = styled.div`
  width: 100%;
  height: 2.875rem;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    font-size: 1rem;
    padding: 0 1rem;
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

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({ options = [], disabledOptions = [], ...props }) => {
  return (
    <SelectorBlock>
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
    </SelectorBlock>
  );
};

export default Selector;
