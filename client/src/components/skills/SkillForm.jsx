import { useEffect, useState } from "react";

const emptySkill = {
  title: "",
  description: "",
  category: "",
};

export default function SkillForm({
  initialData,
  onSubmit,
  isEditing = false,
}) {
    const [form, setForm] = useState(emptySkill);

    useEffect(() => {
        if (initialData) {
        setForm({
            title: initialData.title || "",
            description: initialData.description || "",
            category: initialData.category || "",
        });
        }
    }, [initialData]);

    const onChange = (e) => {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={submitHandler} className="space-y-4 max-w-xl">
        <h2 className="text-2xl font-semibold">
            {isEditing ? "Edit Skill" : "Add Skill"}
        </h2>

        <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Skill title"
            className="w-full border rounded px-3 py-2"
            required
        />

        <input
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="Category (e.g. Web Development)"
            className="w-full border rounded px-3 py-2"
            required
        />

        <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            placeholder="Describe the skill..."
            className="w-full border rounded px-3 py-2 resize-none"
            required
        />

        <button
            type="submit"
            className="
            inline-flex items-center gap-2
            px-5 py-2.5
            border border-gray-300
            text-gray-800 text-sm font-medium
            rounded-lg
            bg-white
            transition-all duration-200
            cursor-pointer
            hover:bg-gray-100 hover:border-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
            "
            >
            {isEditing ? "Save Changes" : "Create Skill"}
        </button>
        </form>
    );
}
