import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import SkillForm from "./SkillForm";
import WindowSpinner from "../spineers/WindowSpinner";

export default function EditSkill() {
  const { id } = useParams();
  const { user } = useAuth();
  const [skill, setSkill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    const fetchSkill = async () => {
      try {
        const res = await fetch(`http://localhost:3030/data/skills/${id}`, { signal });
        if (!res.ok) throw new Error("Failed to fetch skill");
        const data = await res.json();
        setSkill(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching skill:", err);
        }
      }
    };

    fetchSkill();

    return () => {
      controller.abort();
    };
  }, [id]);

  const editHandler = async (data) => {
    await fetch(`http://localhost:3030/data/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": user.accessToken,
      },
      body: JSON.stringify({
        ...skill,
        ...data,
      }),
    });
    navigate("/skills/mine");
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <div className="flex justify-center mt-10">
      <SkillForm
        initialData={skill}
        onSubmit={editHandler}
        isEditing
      />
    </div>
  );
}
