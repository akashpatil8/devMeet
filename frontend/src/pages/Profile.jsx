import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserCard from "../components/EditUserCard";
import EditProfileForm from "../components/EditProfileForm";

export default function Profile() {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    <main className="flex-1 justify-center gap-8 p-4 md:flex">
      <EditProfileForm
        isInEditMode={isInEditMode}
        setIsInEditMode={setIsInEditMode}
      />
      <EditUserCard
        isInEditMode={isInEditMode}
        setIsInEditMode={setIsInEditMode}
      />
    </main>
  );
}
