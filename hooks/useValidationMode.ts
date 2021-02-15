import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { commonActions } from '../store/common';

const validationModeHook = () => {
  const dispatch = useDispatch();
  const validationMode = useSelector((state: RootState) => state.common.validationMode);
  const setValidationMode = (value: boolean) => dispatch(commonActions.setValidationMode(value));

  return { validationMode, setValidationMode };
};

export default validationModeHook;
