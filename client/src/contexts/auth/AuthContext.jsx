import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialAuthState } from "./authReducer";
import { useContext } from "react";
import    request   from "../../utils/request.js"

export const AuthContext = createContext({
    user: {},
    accessToken: '',
    isAuthenticated: false,
    loading: false,
    loginHandler () {},
    registerHandler () {},
    logoutHandler () {},
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
            const data = await request( "users/login"
                                        ,"Post"
                                        ,{
                                            email: credentials.email,                                               
                                            password: credentials.password
                                        });

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                user: {
                    ...data
                },
                accessToken: data.accessToken 
                }
            });
            
            return data;

        }   catch (err) {
            console.log("couldn't log in")
            dispatch({ type: "AUTH_ERROR" });
            throw err;
        }
    };
    
    const registerHandler = async (myData) => {
        console.log("start of registration");
        try {                        
            const {email, password , ...editableData} = myData;
            const dataToRegister = await request( "users/register"
                                        ,"Post"
                                        ,{
                                            email: email,
                                            password: password,
                                            
                                        });            

            try{
                const dataProfile = await request("data/profiles"
                                ,"Post"
                                ,{
                                    ...editableData
                                }
                                ,dataToRegister.accessToken
                )

                dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                user: {                   
                    id: dataToRegister._id,
                    email: dataToRegister.email,
                    profileId: dataProfile._id
                },
                accessToken: dataToRegister.accessToken 
                }
                });
                
                return {                   
                    id: dataToRegister._id,
                    email: dataToRegister.email,
                    profileId: dataProfile._id
                };
            }
            catch (err)
            {
                console.log("couldn't create profile for user")
                await request("users/logout", "GET", null, dataToRegister.accessToken, false);               
                throw err;
            }
           
        }   catch (err) {
            console.log("couldn't sign up")
            dispatch({ type: "AUTH_ERROR" });
            throw err;
        }
    };
    
    const logoutHandler = async () => {
        try
        {   
            //console.log("accessToken: ", state.accessToken);         
            await request("users/logout", "GET", null, state.accessToken, false);
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("auth");
        }
        catch (err) {
            console.log("couldn't log out")
            throw err;
        }
            // console.log("Old log out")
            // dispatch({ type: "LOGOUT" });
            // localStorage.removeItem("auth");
    };

    const valueData = {
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
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