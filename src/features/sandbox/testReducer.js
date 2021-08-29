import { toast } from 'react-toastify';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/util';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

//reducers
export function increment(amout) {
  return async function (dispath) {
    dispath(asyncActionStart());

    try {
      await delay(1000);
      dispath({ type: INCREMENT_COUNTER, payload: amout });
      dispath(asyncActionFinish());
    } catch (error) {
      dispath(asyncActionError(error));
    }
  };
}

export function decrement(amout) {
  return async function (dispath) {
    dispath(asyncActionStart());

    try {
      await delay(1000);
      dispath({ type: DECREMENT_COUNTER, payload: amout });
      dispath(asyncActionFinish());
    } catch (error) {
      dispath(asyncActionError(error));
      toast.error(error);
    }
  };
}

const initialState = {
  data: 10,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };

    default:
      return state;
  }
}
