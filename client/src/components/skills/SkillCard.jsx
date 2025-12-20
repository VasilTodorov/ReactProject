import { Link } from "react-router";

export default function SkillCard({ skill, onDelete }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{skill?.category}</span>
          <time dateTime={skill?.datetime}>{skill?.date}</time>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          {skill?.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {skill?.description}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm">
        <Link
          to={"/profile"}
          className="font-medium text-blue-600 hover:underline"
        >
          {skill?.author?.name}
        </Link>

        <div className="flex gap-2">
          <Link
            to={`/skills/edit/${skill?._id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
