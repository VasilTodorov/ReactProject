import { useState, useEffect } from "react";
import ProfileItem from "./ProfileItem";

export default function ProfileCard({ user, isEditingAllowed = false, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    description: "",
  });

  useEffect(() => {
    if (user?.profile) {
      setDraft(user.profile);
    }
  }, [user]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (onSave) await onSave(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(user.profile);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-md">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {(user.profile?.fullName == "" || user.profile?.fullName == null) ? "User" : user.profile?.fullName}'s Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.email}</p>
          </div>

          {isEditingAllowed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
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
              Edit Profile
            </button>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <ProfileItem
              name="fullName"
              draftValue={draft.fullName}
              onChange={onChangeHandler}
              profileValue={user.profile.fullName}
              isEditing={isEditing}
              title="Full Name"
            />
            <ProfileItem
              name="email"
              draftValue={user.email}
              onChange={onChangeHandler}
              profileValue={user.email}
              isEditing={false} // email is never editable
              title="Email"
            />
            <ProfileItem
              name="age"
              draftValue={draft.age}
              onChange={onChangeHandler}
              profileValue={user.profile.age}
              isEditing={isEditing}
              title="Age"
            />
            <ProfileItem
              name="phone"
              draftValue={draft.phone}
              onChange={onChangeHandler}
              profileValue={user.profile.phone}
              isEditing={isEditing}
              title="Phone"
            />
            <ProfileItem
              name="address"
              draftValue={draft.address}
              onChange={onChangeHandler}
              profileValue={user.profile.address}
              isEditing={isEditing}
              title="Address"
            />
            <ProfileItem
              name="description"
              draftValue={draft.description}
              onChange={onChangeHandler}
              profileValue={user.profile.description}
              isEditing={isEditing}
              title="Skill Description"
              type="textarea"
            />
          </dl>
        </div>

        {isEditing && isEditingAllowed && (
          <div className="flex justify-end gap-2 px-6 py-4 border-t">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
