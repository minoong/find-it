import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import Input from '../common/Input';
import Button from '../common/Button';
import { authActions } from '../../store/auth';
import { signInAPI } from '../../lib/api/auth';
import validationModeHook from '../../hooks/useValidationMode';
import { userActions } from '../../store/user';

const LoginModalBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 35.5rem;
  height: auto;
  background-color: white;
  padding: 2rem;
  z-index: 11;
  overflow: auto;
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

  .login-modal-submit-button-wrapper {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 0.5rem;
    cursor: pointer;
  }

  p {
    margin-top: 0.5rem;
    .sign-up-modal-set-login {
      color: ${palette.dark_cyan};
      margin-left: 0.5rem;
      cursor: pointer;
    }
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

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setValidationMode(false);
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  const { setValidationMode } = validationModeHook();

  const moveToSignUp = () => {
    dispatch(authActions.setAuthMode('signup'));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationMode(true);

    if (!form.email || !form.password) {
      alert('이메일과 패스워드를 확인해 주세요.');
      return;
    }

    const body = { email: form.email, password: form.password };

    try {
      const { data } = await signInAPI(body);
      console.log(data);

      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginModalBlock onSubmit={onSubmit}>
      <div className="top-butotn-wrapper">
        <CloseXIcon className="modal-close-icon" onClick={closeModal} />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이메일"
          type="email"
          name="email"
          icon={<MailIcon />}
          onChange={onChange}
          isValid={form.email !== ''}
          errorMessage="이메일을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="패스워드"
          name="password"
          type="password"
          icon={<ClosedEyeIcon />}
          onChange={onChange}
          isValid={form.password !== ''}
          errorMessage="패스워드를 입력하세요."
        />
      </div>
      <Button type="submit" color="bittersweet">
        Sign In
      </Button>
      <p>
        find-it 계정이 없으신가요?
        <span className="sign-up-modal-set-login" role="presentation" onClick={moveToSignUp}>
          Sign Up
        </span>
      </p>
    </LoginModalBlock>
  );
};

export default LoginModal;
