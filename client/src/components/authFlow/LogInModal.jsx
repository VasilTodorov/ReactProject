import { useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { useContext } from "react";
import CloseContext from "../contexts/close/CloseContext";

export default function LogInModal() {
    const { loginHandler } = useAuth();
    const onCloseHandler = useContext(CloseContext);
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        //console.log(typeof loginHandler);
        try {
            const data = await loginHandler(state);
            console.log("Login submitted:", data);
            onCloseHandler();
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed: " + err);
            throw err;
        }
    };

    const onChangeHandler = (event) => {
        //console.log(event.target.name, event.target.value);
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <>
                <h2 className="text-xl font-bold mb-4">Log In</h2>
                <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={onChangeHandler}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={onChangeHandler}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Log In
                  </button>
                </form>
              </>
    );
}