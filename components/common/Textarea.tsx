import React from 'react';
import styled from 'styled-components';
import ReactAutosizeTextarea from 'react-autosize-textarea';
import palette from '../../styles/palette';

const TextareaBlock = styled(ReactAutosizeTextarea)`
  position: relative;
  width: 100%;
  min-height: 13.5rem;
  padding: 11px;
  border: 1px solid ${palette.gray_eb};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  resize: none;
  font: inherit;
  & ::placeholder {
    color: ${palette.gray_76};
  }
  & :focus {
    border-color: ${palette.dark_cyan};
  }
`;

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...props }) => {
  return <TextareaBlock {...props} />;
};

export default React.memo(Textarea);
