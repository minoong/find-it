import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';
import { signUpAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';
import validationModeHook from '../../hooks/useValidationMode';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../store/auth';

const SignUpModalBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 35.5rem;
  height: 38.375rem;
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

  .sign-up-birthday-label {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
  }

  .sign-up-modal-birthday-info {
    font-size: 0.675rem;
    margin-bottom: 1rem;
    color: ${palette.gray_71};
  }

  .sign-up-birthday-selectors {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    .item {
      flex-basis: 100%;
    }
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

function getLastDay(year: number) {
  //  1. 4로 나누어 떨어지고, 100으로 나누어 떨어지지 않으면 윤년
  //  2. 4, 100, 400 으로 나누어 떨어지면 평년
  // eslint-disable-next-line yoda
  if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
    return true;
    // eslint-disable-next-line no-else-return
  } else {
    return false;
  }
}

function getDays(range: number): string[] {
  // eslint-disable-next-line prefer-template
  return Array.from(Array(range), (_, i) => '' + (i + 1));
}

function emailValid(email: string): boolean {
  return true;
}

// eslint-disable-next-line prefer-const
let range: number = 31;

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '', passwordConfirm: '' });
  const [birthday, setBirthday] = useState({
    month: '',
    day: '',
    year: '',
  });
  const [passwordObserver, setPasswordObserver] = useState(false);
  const { setValidationMode } = validationModeHook();

  useEffect(() => {
    return () => {
      setValidationMode(false);
    };
  }, []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'email') {
      emailValid(event.target.value);
    }
  };
  const onChageSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newState = {
      ...birthday,
      [event.target.name]: event.target.value,
    };
    setBirthday(newState);

    if (event.target.name !== 'year' && event.target.name !== 'month') {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const { year, month } = newState;

    if (parseInt(month, 10) === 2) {
      if (getLastDay(parseInt(year, 10))) {
        range = 28;
      } else {
        range = 29;
      }
    } else if (parseInt(month, 10) % 2 !== 0) {
      range = 31;
    } else {
      range = 30;
    }
  };

  const dayList = useMemo(() => {
    return getDays(range);
  }, [range]);

  const moveToSignIn = () => {
    dispatch(authActions.setAuthMode('login'));
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationMode(true);

    if (!form.email || !form.lastName || !form.firstName || !form.password) {
      return;
    }

    try {
      const { email, firstName, lastName, password } = form;

      const { data } = await signUpAPI({
        email,
        firstName,
        lastName,
        password,
        birthday: new Date(`${birthday.year}-${birthday.month}-${birthday.day}`).toUTCString(),
      });

      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line max-len
  const isValidLength = useMemo(() => {
    return /^.{8,12}$/.test(form.password);
  }, [form.password]);
  const isHasSymbolAndNumber = useMemo(() => {
    return /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(form.password);
  }, [form.password]);

  const onFocusPassword = () => {
    setPasswordObserver(true);
  };

  return (
    <SignUpModalBlock onSubmit={onSubmitSignUp}>
      <div className="top-butotn-wrapper">
        <CloseXIcon className="modal-close-icon" onClick={closeModal} />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이메일"
          type="email"
          name="email"
          icon={<MailIcon />}
          onChange={onChangeInput}
          useValidation
          isValid={!!form.email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름"
          name="firstName"
          icon={<PersonIcon />}
          onChange={onChangeInput}
          useValidation
          isValid={!!form.firstName}
          errorMessage="이름을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성"
          name="lastName"
          icon={<PersonIcon />}
          onChange={onChangeInput}
          useValidation
          isValid={!!form.lastName}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="패스워드"
          type="password"
          name="password"
          icon={<OpenedEyeIcon />}
          onChange={onChangeInput}
          useValidation
          isValid={!!isValidLength && !!isHasSymbolAndNumber}
          errorMessage="패스워드를 입력하세요."
          onFocus={onFocusPassword}
        />
      </div>
      {passwordObserver && (
        <>
          <PasswordWarning isValid={isValidLength} text="8~12 자리 입력" />
          <PasswordWarning isValid={isHasSymbolAndNumber} text="특수문자, 숫자 조합" />
        </>
      )}
      <div className="input-wrapper">
        <Input
          placeholder="패스워드 확인"
          type="password"
          name="passwordConfirm"
          icon={<OpenedEyeIcon />}
          onChange={onChangeInput}
        />
      </div>
      <div className="sign-up-birthday-label">생일</div>
      <div className="sign-up-modal-birthday-info">만 18세 이상의 성인만 회원으로 가입할 수 있습니다.</div>
      <div className="sign-up-birthday-selectors">
        <div className="item">
          <Selector
            name="month"
            options={monthList}
            disabledOptions={['월']}
            defaultValue="월"
            isValid={!!birthday.month}
            onChange={onChageSelect}
          />
        </div>
        <div className="item">
          <Selector
            name="day"
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            isValid={!!birthday.day}
            onChange={onChageSelect}
          />
        </div>
        <div className="item">
          <Selector
            name="year"
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            isValid={!!birthday.year}
            onChange={onChageSelect}
          />
        </div>
      </div>
      <Button type="submit" color="bittersweet">
        Sign Up
      </Button>
      <p>
        이미 find-it 계정이 있나요?
        <span className="sign-up-modal-set-login" role="presentation" onClick={moveToSignIn}>
          Sign In
        </span>
      </p>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
