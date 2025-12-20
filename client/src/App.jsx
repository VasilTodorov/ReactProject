import { Route, Router, Routes } from "react-router"
//import Login from "./components/login/Login"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import IsAuthenticated from "./components/route-guard/IsAuthenticated"
import Blog from "./components/blog/Blog"
import FAQ from "./components/faq/FAQ"
import MySkills from "./components/skills/MySkills"
import CreateSkill from "./components/skills/CreateSkill"
import EditSkill from "./components/skills/EditSkill"
import OwnProfile from "./components/profile/OwnProfile"
import ProfileView from "./components/profile/ProfileView"

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
                    <Route path="/profile" element={<OwnProfile  />} />
                    <Route path="/skills/mine" element={<MySkills />} />
                    <Route path="/skills/create" element={<CreateSkill />} />
                    <Route path="/skills/edit/:id" element={<EditSkill />} />
                    <Route path="/profile/:email/:profileId" element={<ProfileView  />} />
                </Route>
                
                <Route path="/profile/:email/:profileId" element={<ProfileView  />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />

                <Route index element={<Home />} />
            </Routes>
        </>
    )
}

export default App
