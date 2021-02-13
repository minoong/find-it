import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import CloseXIcon from '../../public/static/svg/modal/modal_colose_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import palette from '../../styles/palette';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';

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

    .item {
      flex-basis: 100%;
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

function getLastDay(year: number, month: number) {
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

const SignUpModal: React.FC = () => {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '', passwordConfirm: '' });
  const [birthday, setBirthday] = useState({
    month: '',
    day: '',
    year: '',
  });
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
      if (getLastDay(parseInt(year, 10), parseInt(month, 10))) {
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

  return (
    <SignUpModalBlock>
      <div className="top-butotn-wrapper">
        <CloseXIcon className="modal-close-icon" />
      </div>
      <div className="input-wrapper">
        <span className="awsome_input_border" />
        <Input placeholder="이메일" type="email" name="email" icon={<MailIcon />} onChange={onChangeInput} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="이름" name="firstName" icon={<PersonIcon />} onChange={onChangeInput} />
      </div>
      <div className="input-wrapper">
        <Input placeholder="성" name="lastName" icon={<PersonIcon />} onChange={onChangeInput} />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="패스워드"
          type="password"
          name="password"
          icon={<OpenedEyeIcon />}
          onChange={onChangeInput}
        />
      </div>
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
            onChange={onChageSelect}
          />
        </div>
        <div className="item">
          <Selector name="day" options={dayList} disabledOptions={['일']} defaultValue="일" onChange={onChageSelect} />
        </div>
        <div className="item">
          <Selector
            name="year"
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            onChange={onChageSelect}
          />
        </div>
      </div>
      <Button type="submit">가입하기</Button>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
