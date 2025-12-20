import { useState } from "react";
import { useContext } from "react";
import CloseContext from "../../contexts/close/CloseContext";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function SignUpModal() {
    const { registerHandler } = useAuth();
    const onCloseHandler = useContext(CloseContext);
    const [state, setState] = useState({
        fullName: "",
        email: "",
        description: "",
        password: "",
        confirmPassword: ""
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        //console.log(typeof registerHandler);
        if (state.password !== state.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!state.password || !state.email) {
            alert("Passwords and email are required!");
            return;
        }
        else {
            try{
                const data = await registerHandler({                                        
                    fullName: state.fullName,
                    email: state.email,
                    description: state.description,
                    password: state.password
                });
                console.log("Register submitted:", data);
                onCloseHandler();
            }
            catch (err) {
                console.error("Registration failed:", err);
                alert("Registration failed: " + err);
                throw err;
            }
            
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
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={state.fullName}
                        onChange={onChangeHandler}
                        autoComplete="name"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={onChangeHandler}
                        autoComplete="email"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <textarea
                        name="description"
                        placeholder="Describe your skills (e.g. React, Node, UI/UX...)"
                        value={state.description}
                        onChange={onChangeHandler}
                        rows={4}
                        autoComplete="off"
                        className="border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={onChangeHandler}
                        placeholder="Password"
                        autoComplete="new-password"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    
                    <input
                        type="password"
                        name="confirmPassword"
                        value={state.confirmPassword}
                        onChange={onChangeHandler}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                    Sign Up
                  </button>
                </form>
              </>
    );
}