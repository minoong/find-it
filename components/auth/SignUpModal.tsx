import React from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';

const SignUpModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
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

  .input-wrapper {
    position: relative;
    margin-bottom: 1rem;
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
      <div className="input-wrapper">
        <span className="awsome_input_border" />
        <Input placeholder="이메일" type="email" name="email" icon={<MailIcon />} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="이름" name="firstName" icon={<PersonIcon />} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="성" name="lastName" icon={<PersonIcon />} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="패스워드" type="password" name="password" icon={<OpenedEyeIcon />} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="패스워드 확인" type="password" name="passwordConfirm" icon={<OpenedEyeIcon />} />
      </div>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
