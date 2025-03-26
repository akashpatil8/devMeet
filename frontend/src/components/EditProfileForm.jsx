import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { addUser, errorUser, loadingUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";

export default function EditProfileForm({ setIsInEditMode, isInEditMode }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
      age: user?.age,
      about: user?.about,
      imageUrl: user?.imageUrl,
    },
  });

  const handleUpdateProfile = async (data) => {
    dispatch(loadingUser());
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          about: data.about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully");
      setIsInEditMode(false);
    } catch (error) {
      dispatch(errorUser(error?.message));
      toast.error(error?.message);
    }
  };

  return (
    <form
      className={`card card-compact w-96 bg-base-300 p-4 shadow-xl md:block ${isInEditMode ? "" : "hidden"}`}
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("firstName")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Last Name</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("lastName")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("age")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("gender")}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Image path</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("imageUrl")}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Your bio</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          {...register("about")}
        ></textarea>
      </label>
      <div className="card-actions mt-4 justify-end">
        <button className="btn btn-outline" onClick={() => {}}>
          Clear
        </button>
        <button className="btn btn-primary" onClick={handleUpdateProfile}>
          Save
        </button>
      </div>
    </form>
  );
}
