import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialAuthState } from "./authReducer";
import { useContext } from "react";

export const AuthContext = createContext({
    user: {},
    accessToken: '',
    isAuthenticated: false,
    loginHandler () {},
    registerHandler () {},
    logoutHandler () {}
});

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    // Load auth from localStorage on refresh
    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");

        if (!storedAuth) {
        dispatch({ type: "AUTH_ERROR" });
        return;
        } 

        const parsedAuth = JSON.parse(storedAuth);

        if (parsedAuth.user && parsedAuth.accessToken) {
            dispatch({
                type: "LOAD_USER",
                payload: {
                    user: parsedAuth.user,
                    accessToken: parsedAuth.accessToken
                }
            });
        } else {
        dispatch({ type: "AUTH_ERROR" });
        }
    }, []);

    // Persist auth state
    useEffect(() => {
        if (state.isAuthenticated) {
        localStorage.setItem(
            "auth",
            JSON.stringify({
            user: state.user,
            accessToken: state.accessToken
            })
        );
        } 
    }, [state.isAuthenticated, state.user, state.accessToken]);

    const loginHandler = async (credentials) => {
        try {
            const response = await fetch(
                "http://localhost:3030/users/login",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
                }
            );
            //console.log('LOGIN RESPONSE STATUS:', response.status);
            if (!response.ok) {
                    throw response.statusText;
            }

            const data = await response.json();

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                user: {
                    id: data._id,
                    email: data.email
                },
                accessToken: data.accessToken 
                }
            });

            return data;
        }   catch (err) {
            dispatch({ type: "AUTH_ERROR" });
            throw err;
        }
    };
    const registerHandler = async (myData) => {
        console.log("start of registration");
        try {
            const response = await fetch(
                "http://localhost:3030/users/register",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: myData.fullName,
                    email: myData.email,
                    skills: myData.skills,
                    password: myData.password
                })
                }
            );
            console.log("finished registration fetch");
            //console.log('LOGIN RESPONSE STATUS:', response.status);
            if (!response.ok) {
                    throw response.statusText;
            }

            const data = await response.json();

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                user: {
                    fullName: data.fullName,
                    skills: data.skills,
                    id: data._id,
                    email: data.email
                },
                accessToken: data.accessToken 
                }
            });

            return data;
        }   catch (err) {
            dispatch({ type: "AUTH_ERROR" });
            throw err;
        }
    };

    const logoutHandler = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("auth");
    };

    const valueData = {
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    loginHandler,
    registerHandler,
    logoutHandler
    };
    return (
        <AuthContext.Provider value={valueData}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}