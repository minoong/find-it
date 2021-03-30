import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { searchRoomActions } from '../store/searchRoom';

const useSearchDate = () => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const dispatch = useDispatch();

  const setCheckInDate = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setFromDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setFromDate(null));
    }
  };
  const setCheckOutDate = (date: Date | null) => {
    if (date) {
      dispatch(searchRoomActions.setToDate(date.toISOString()));
    } else {
      dispatch(searchRoomActions.setToDate(null));
    }
  };

  return {
    checkInDate: checkInDate ? new Date(checkInDate) : null,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
    setCheckInDate,
    setCheckOutDate,
  };
};

export default useSearchDate;
