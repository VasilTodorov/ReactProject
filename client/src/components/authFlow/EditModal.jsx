import { useState, useContext, useEffect } from "react";
import CloseContext from "../../contexts/close/CloseContext";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function EditModal() {
  const { user,isAuthenticated, registerHandler } = useAuth();
  const onCloseHandler = useContext(CloseContext);

  const [state, setState] = useState({
    fullName: "",
    email: "",
    skills: "",
  });

  useEffect(() => {
    if (user) {
      setState((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        skills: user.skills || "",
      }));
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: state.fullName,
      email: state.email,
      skills: state.skills,
    };
    if(isAuthenticated)
    {
        try {
        await registerHandler(payload);
        onCloseHandler();
        } catch (err) {
        console.error("Profile update failed:", err);
        alert("Profile update failed");
        }
    }
    else
    {
        console.error("There is no user to edit");
        alert("There is no user to edit");
    }

    
  };

  const onChangeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={state.fullName}
          onChange={onChangeHandler}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={onChangeHandler}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <textarea
          name="skills"
          placeholder="Describe your skills"
          value={state.skills}
          onChange={onChangeHandler}
          rows={4}
          className="border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {/* <hr className="my-2" /> */}

        {/* <p className="text-sm text-gray-500">
          Change password (optional)
        </p> */}

        {/* <input
          type="password"
          name="password"
          placeholder="New Password"
          value={state.password}
          onChange={onChangeHandler}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={state.confirmPassword}
          onChange={onChangeHandler}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        /> */}

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
