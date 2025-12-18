

export const initialAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: true
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {  
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false        
      };

    case "LOGOUT":
      return {
        ...initialAuthState,
        loading: false
      };

    case "LOAD_USER":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "AUTH_ERROR":
      return {
        ...initialAuthState,
        loading : false
      };

    default:
      return state;
  }
}
