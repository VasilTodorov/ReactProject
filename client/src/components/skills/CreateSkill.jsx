import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import SkillForm from "./SkillForm";

export default function CreateSkill() {
  const { user } = useAuth();
  const navigate = useNavigate(); 

  const createHandler = async (data) => {
    const now = new Date();

    const res = await fetch("http://localhost:3030/data/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": user.accessToken,
      },
      body: JSON.stringify({
        ...data,
        date: now.toDateString(),
        datetime: now.toISOString().split("T")[0],
        author: {
          name: user.profile.fullName,
          email: user.email,
          urlProfile: `/profile/${user.email}/${user.profile._id}`,
        },
      }),
    });

    if (!res.ok) {
      alert("Failed to create skill");
      return;
    }

    const createdSkill = await res.json();

    navigate("/skills/mine");
  };

  return (
      <div className="flex justify-center mt-10">
          <SkillForm onSubmit={createHandler} />
      </div>
  )
  
  ;
}
