import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
//import { login, register } from "../auth/authActions";

export default function Login() {
  const { loginHandler, dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
        e.preventDefault();
        //console.log(typeof loginHandler);
        const data = await loginHandler({ email, password });
        console.log("Login submitted:", data);
    };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
