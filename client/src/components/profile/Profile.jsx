import { useState, useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { useAuth } from "../../contexts/auth/AuthContext";
import request from "../../utils/request";


export default function Profile() {
    const {user, accessToken} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [draft, setDraft] = useState(profile);

    useEffect(() => {
        if (!user?.profileId) return;
        const controller = new AbortController();
        const signal = controller.signal;

        const loadProfile = async () => {
            

            try {
                
            const profileData = await request(`data/profiles/${user.profileId}`, "Get", null, null, true, signal);

            setProfile(profileData);
            setDraft(profileData); // keep draft in sync
            } catch (error) {
                if (error.name === "AbortError") return;
                console.error("Failed to load profile:", error);
            }
           
        };

        loadProfile();

        return () => {
                controller.abort();
            }
    }, [user?.profileId]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setDraft((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        console.log("token: ", accessToken)
        try{
            const profileData = await request(`data/profiles/${user.profileId}`, "PATCH", draft, accessToken);
        }
        catch (error)
        {
            console.error("Failed to update profile:", error);
        }
        setProfile(draft);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraft(profile);
        setIsEditing(false);
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {user.email}
            </p>
            </div>

            {!isEditing && (
            <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
                Edit Profile
            </button>
            )}
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
            {/* Full Name */}
            <ProfileItem 
                name={"fullName"}
                draftValue={draft.fullName}
                onChange={onChangeHandler}
                profileValue={profile.fullName}
                isEditing={isEditing}
                title = {"Full name"}/>

            {/* Email */}
            <ProfileItem 
                name={"email"}
                draftValue={user.email}
                onChange={onChangeHandler}
                profileValue={user.email}
                isEditing={false}
                title={"Email address"}/>

            <ProfileItem 
                name={"age"}
                draftValue={draft.age}
                onChange={onChangeHandler}
                profileValue={profile.age}
                isEditing={isEditing}
                title={"Age"}/>    
                

            {/* Phone */}
            <ProfileItem 
                name={"phone"}
                draftValue={draft.phone}
                onChange={onChangeHandler}
                profileValue={profile.phone}
                isEditing={isEditing}
                title={"Phone number"}/>

            {/* Address */}
            
            <ProfileItem 
                name={"address"}
                draftValue={draft.address}
                onChange={onChangeHandler}
                profileValue={profile.address}
                isEditing={isEditing}
                title={"Address"}/>
            <ProfileItem 
                name={"description"}
                draftValue={draft.description}
                onChange={onChangeHandler}
                profileValue={profile.description}
                isEditing={isEditing}
                title={"Skill Description"}
                type= {"textarea"}/>
            </dl>
        </div>

        {isEditing && (
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
    );
}
