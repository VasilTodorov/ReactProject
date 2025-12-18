import { Route, Router, Routes } from "react-router"
//import Login from "./components/login/Login"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Profile from "./components/profile/Profile"
import IsAuthenticated from "./components/route-guard/IsAuthenticated"
import WindowSpinner from "./components/spineer/WindowSpinner";

function App() {
    //const [count, setCount] = useLocalStorage(0)
    //const { isAuthenticated, user } = useAuth();

    return (
        <>
            <Header /> 
            {/* <WindowSpinner/> */}
            <Routes>
                {/* <Route path="/login" element={<Login />} /> */}
                <Route element = {<IsAuthenticated/>}>
                    <Route path="/profile" element={<Profile  />} />
                </Route>
                
                <Route path="/about" element={<About />} />
                <Route index element={<Home />} />
            </Routes>
        </>
    )
}

export default App
