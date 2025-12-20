import { useAuth } from "../../contexts/auth/AuthContext";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  const { user, updateProfileHandler } = useAuth();

  return (
    <ProfileCard
      user={user}
      isEditingAllowed={true}
      onSave={updateProfileHandler}
    />
  );
}
