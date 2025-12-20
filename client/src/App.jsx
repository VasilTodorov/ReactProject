import { Route, Router, Routes } from "react-router"
//import Login from "./components/login/Login"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Profile from "./components/profile/Profile"
import IsAuthenticated from "./components/route-guard/IsAuthenticated"
import WindowSpinner from "./components/spineers/WindowSpinner";
import Blog from "./components/blog/Blog"
import FAQ from "./components/faq/FAQ"

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
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route index element={<Home />} />
            </Routes>
        </>
    )
}

export default App
