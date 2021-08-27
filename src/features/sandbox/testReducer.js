export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';


//reducers
export function increment(amout) {
  return {
    type: INCREMENT_COUNTER,
    payload: amout,
  };
}

export function decrement(amout) {
  return {
    type: DECREMENT_COUNTER,
    payload: amout,
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
