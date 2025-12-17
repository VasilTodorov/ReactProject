import { Route, Router, Routes } from "react-router"
import Login from "./components/login/Login"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"

function App() {
    //const [count, setCount] = useLocalStorage(0)

    return (
        <>
            <Header /> 
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route index element={<Home />} />
            </Routes>
        </>
    )
}

export default App
