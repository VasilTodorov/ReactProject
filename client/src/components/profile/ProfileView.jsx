import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileCard from "./ProfileCard";
import { getProfileById } from "../../utils/getProfileById";

export default function ProfileView() {
  const { email,profileId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    const fetchUser = async () => {
      try {
        //console.log("email :", email);
        //console.log("profileId :", profileId);
        const data = await getProfileById(profileId, { signal }); 
        //console.log("profile data: ", data);
        setUser({"email" : email,
                "profile" : data
        });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Failed to fetch user:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    
    return () => {
      controller.abort();
    };
  }, [profileId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

  return <ProfileCard user={user} isEditingAllowed={false} />;
}
