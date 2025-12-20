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
    updateProfileHandler () {},
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

            try{
                const query = encodeURIComponent(
                `_ownerId="${data._id}"`
                );
                const dataProfile = await request(`data/profiles?where=${query}`)

                dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                user: {                   
                    ...data,
                    profile: dataProfile[0]
                },
                accessToken: data.accessToken 
                }
                });
                
                return {                   
                    ...data,
                    profile: dataProfile[0]
                };
            }
            catch (err)
            {
                console.log("couldn't create profile for user")
                await request("users/logout", "GET", null, dataToRegister.accessToken, false);               
                throw err;
            }

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
                    ...dataToRegister,
                    profile: dataProfile
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
            console.log("Old log out")
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("auth");
            throw err;
        }
           
    };

    const updateProfileHandler = async (draft) => {
        //console.log("user: ", state.user);
        if(state.isAuthenticated && state.user?.profile)
        {
            try{
                //console.log("start of update")
                const profileData = await request(`data/profiles/${state.user.profile._id}`, "PATCH", draft, state.accessToken);
                //console.log("My updated profileData: ",profileData )
                let updatedUser = {...state.user, profile: profileData};
                //console.log("My updated user: ",updatedUser )
                dispatch({
                type: "LOAD_USER",
                payload: {
                    user: updatedUser,
                    accessToken: state.accessToken
                }
                });
                return profileData;
            }
            catch (error)
            {
                console.error("Failed to update profile:", error);
                throw error
            }
        }
        else 
        {
            return null;
        }
        
    }

    const valueData = {
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    loginHandler,
    registerHandler,
    logoutHandler,
    updateProfileHandler,
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