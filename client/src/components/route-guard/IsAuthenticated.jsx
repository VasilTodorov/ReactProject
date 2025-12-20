import { useAuth } from "../../contexts/auth/AuthContext";
import { Navigate, Outlet } from "react-router";
import WindowSpinner from "../spineers/WindowSpinner";

export default function IsAuthenticated() {
    const { isAuthenticated, user, loading } = useAuth();

    if(loading)
    {
        //return <WindowSpinner/>;//or spinner
        return (<div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>)
         
    }

    if(!isAuthenticated || !user)
    {
        return <Navigate to="/"/>
    }
    return (
         <Outlet />
    );
}