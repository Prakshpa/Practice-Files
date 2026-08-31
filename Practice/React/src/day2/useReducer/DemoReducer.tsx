import { useReducer } from "react";

// State Shape
type State = {
  count: number;
};

// Action Shape
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; payload: number };

// Initial State
const initialState: State = {
  count: 0,
};

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "set":
      return { count: action.payload };

    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>{state.count}</p>

      <button onClick={() => dispatch({ type: "increment" })}> + </button>
      <button onClick={() => dispatch({ type: "decrement" })}> - </button>
      <button onClick={() => dispatch({ type: "set", payload: 10 })}> Set 10 </button>
    </>
  );
}