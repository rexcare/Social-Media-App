import React, { useReducer, createContext } from 'react';

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// TODO: Learn more about reducers
// A reducer basically receives an action with a type and a payload, then determines what to do based on the functionality
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  function login(userData) {
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
