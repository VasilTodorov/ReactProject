import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Link } from "react-router";
import SkillCard from "./SkillCard";

export default function MySkills() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadSkills = async () => {
      try {
        const query = encodeURIComponent(`_ownerId="${user._id}"`);
        //console.log("encoded: ", query);

        const res = await fetch(
          `http://localhost:3030/data/skills?where=${query}`,
          {
            headers: { "content-type": "application/json" },
            signal, 
          }
        );

        if (!res.ok) throw new Error("Failed to fetch skills");

        const data = await res.json();
        //console.log("skills data: ", data);
        setSkills(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error loading skills:", err);
        }
      }
    };

    loadSkills();

    
    return () => {
      controller.abort();
    };
  }, [user._id]);

  const handleDelete = async (skillId) => {
    if (!confirm("Delete this skill?")) return;

    await fetch(`http://localhost:3030/data/skills/${skillId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-Authorization": user.accessToken,
      },
    });

    setSkills((prev) => prev.filter((s) => s._id !== skillId));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Skills</h2>
        <Link
            to="/skills/create"
            className="
    inline-flex items-center gap-2
    px-5 py-2.5
    border border-gray-300
    text-gray-800 text-sm font-medium
    rounded-lg
    bg-white
    transition-all duration-200
    hover:bg-gray-100 hover:border-gray-400
    focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
  "
>
          Add Skill
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill._id}
            skill={skill}
            onDelete={() => handleDelete(skill._id)}
          />
        ))}
      </div>
    </div>
  );
}
