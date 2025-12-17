

export const initialAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {  
        ...state,
        ...action.payload,
        isAuthenticated: true,        
      };

    case "LOGOUT":
      return {
        ...initialAuthState,
      };

    case "LOAD_USER":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case "AUTH_ERROR":
      return {
        ...initialAuthState,

      };

    default:
      return state;
  }
}
