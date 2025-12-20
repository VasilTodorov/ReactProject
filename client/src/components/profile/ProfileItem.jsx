export default function ProfileItem({
    name,
    draftValue,
    onChange,
    profileValue,
    isEditing,
    title,
    type
}) {
    let innerContent;
    switch(type) {
        case "textarea":
        innerContent = isEditing ? (
            <textarea
            name={name}
            value={draftValue ?? ""}
            onChange={onChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm resize-none"
            />
        ) : (
            <p className="text-sm text-gray-900 whitespace-pre-line">
            {profileValue ?? ""}
            </p>
        );
        break; 
        case "input":
        default:
        innerContent = isEditing ? (
            <input
            name={name}
            value={draftValue ?? ""}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            />
        ) : (
            <p className="text-sm text-gray-900">
            {profileValue ?? ""}
            </p>
        );
    }
        

    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{title}</dt>
            <dd className="mt-1 sm:mt-0 sm:col-span-2">
              {innerContent}
            </dd>
          </div>
    );
}