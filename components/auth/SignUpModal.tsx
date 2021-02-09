import React from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';

const SignUpModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 35.5rem;
  height: 38.375rem;
  background-color: white;
  padding: 2rem;
  z-index: 11;
  transform: scale(0);
  animation: zoomIn 0.2s 0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  border: 1px solid ${palette.gray_aa};

  .modal-close-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
    path {
      fill: ${palette.gray_aa};
    }
    :hover path {
      fill: ${palette.black};
    }
  }

  div {
    margin: 5px;
  }

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const SignUpModal: React.FC = () => {
  return (
    <SignUpModalBlock>
      <CloseXIcon className="modal-close-icon" />
      <div>sdafasd</div>
      <div>sdafasd</div>
      <div>sdafasd</div>
      <div>sdafasd</div>
      <div>sdafasd</div>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
