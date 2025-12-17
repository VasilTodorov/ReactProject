import { Route, Router, Routes } from "react-router"
import Login from "./components/login/Login"


function App() {
    //const [count, setCount] = useLocalStorage(0)

    return (
        <>
            <h1>Welcome to SkillSwap-Community</h1>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App
